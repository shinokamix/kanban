'use client'

import { useCallback, useEffect, useState } from 'react'

import { useLoadTasks } from '../model/useLoadTasks'
import { useAppDispatch, useAppSelector } from '@/providers/StoreProvider'
import { taskSelectors, taskUpdated, type Task, type TaskStatus } from '@/entities/task'
import { TaskCard, updateTaskApi } from '@features/task-details'

import Column from './Column'
import { Label } from '@shared/ui/label'

import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type UniqueIdentifier,
    type DragStartEvent,
    type DragOverEvent,
    type DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

const COLUMNS: TaskStatus[] = ['todo', 'in-progress', 'done']

type ColumnsState = Record<TaskStatus, string[]>

export function TaskBoard() {
    useLoadTasks()

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(taskSelectors.selectAll)
    const tasksById = useAppSelector(taskSelectors.selectEntities)

    // локальное состояние: в каких колонках какие id тасок и в каком порядке
    const [columns, setColumns] = useState<ColumnsState>({
        todo: [],
        'in-progress': [],
        done: [],
    })

    // id таски, которую тащим (для DragOverlay)
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

    // с какой колонки начался drag (важно, чтобы понять, изменился ли статус)
    const [activeStartColumn, setActiveStartColumn] = useState<TaskStatus | null>(null)

    // сенсоры ввода как в референсе
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    // при изменении задач в сторе — аккуратно синхронизируем локальный порядок
    useEffect(() => {
        setColumns((prev) => {
            const next: ColumnsState = { ...prev }

            COLUMNS.forEach((status) => {
                const fromStore = tasks
                    .filter((t) => t.status === status)
                    .map((t) => t.id.toString())

                const existing = prev[status] ?? []

                // сохраняем порядок из prev, добавляем новые id в конец
                const merged = [
                    ...existing.filter((id) => fromStore.includes(id)),
                    ...fromStore.filter((id) => !existing.includes(id)),
                ]

                next[status] = merged
            })

            return next
        })
    }, [tasks])

    // найти колонку по id (id может быть либо id колонки, либо id таски)
    const findColumn = (id: UniqueIdentifier | undefined): TaskStatus | undefined => {
        if (!id) return undefined

        const strId = id.toString()

        if (COLUMNS.includes(strId as TaskStatus)) {
            return strId as TaskStatus
        }

        return COLUMNS.find((col) => columns[col].includes(strId))
    }

    // обновление статуса таски в API + Redux
    const updateTaskStatus = useCallback(
        async (taskId: string, newStatus: TaskStatus) => {
            const task = tasksById[taskId]
            if (!task || task.status === newStatus) return

            const updated = await updateTaskApi({
                id: task.id,
                title: task.title,
                description: task.description,
                status: newStatus,
            })

            dispatch(
                taskUpdated({
                    id: updated.id,
                    changes: updated,
                }),
            )
        },
        [dispatch, tasksById],
    )

    // ---- dnd-kit handlers ----

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        const id = active.id.toString()

        setActiveId(id)

        const col = findColumn(id)
        if (col) {
            setActiveStartColumn(col)
        }
    }

    // как в референсе: перенос между колонками происходит во время dragOver
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        const overId = over?.id

        if (!overId) return

        const activeId = active.id.toString()

        const activeColumn = findColumn(activeId)
        const overColumn = findColumn(overId)

        if (!activeColumn || !overColumn || activeColumn === overColumn) {
            return
        }

        setColumns((prev) => {
            const activeItems = prev[activeColumn]
            const overItems = prev[overColumn]

            const activeIndex = activeItems.indexOf(activeId)
            const overIndex = overItems.indexOf(overId.toString())

            let newIndex: number

            if (COLUMNS.includes(overId.toString() as TaskStatus)) {
                // попали в «корень» колонки
                newIndex = overItems.length + 1
            } else {
                const isBelowLastItem = over && overIndex === overItems.length - 1
                const modifier = isBelowLastItem ? 1 : 0

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }

            return {
                ...prev,
                [activeColumn]: activeItems.filter((id) => id !== activeId),
                [overColumn]: [
                    ...overItems.slice(0, newIndex),
                    activeItems[activeIndex],
                    ...overItems.slice(newIndex, overItems.length),
                ],
            }
        })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        const overId = over?.id
        if (!overId) {
            setActiveId(null)
            setActiveStartColumn(null)
            return
        }

        const activeId = active.id.toString()
        const activeColumn = findColumn(activeId)
        const overColumn = findColumn(overId)

        if (!activeColumn || !overColumn) {
            setActiveId(null)
            setActiveStartColumn(null)
            return
        }

        // 1) сортировка внутри одной колонки (как в референсе)
        if (activeColumn === overColumn) {
            const items = columns[activeColumn]
            const activeIndex = items.indexOf(activeId)
            const overIndex = items.indexOf(overId.toString())

            if (activeIndex !== overIndex) {
                setColumns((prev) => ({
                    ...prev,
                    [overColumn]: arrayMove(prev[overColumn], activeIndex, overIndex),
                }))
            }
        }

        // 2) изменение статуса (колонка изменилась)
        if (activeStartColumn && activeStartColumn !== overColumn) {
            void updateTaskStatus(activeId, overColumn)
        }

        setActiveId(null)
        setActiveStartColumn(null)
    }

    const activeTask: Task | undefined =
        activeId != null ? (tasksById[activeId.toString()] as Task | undefined) : undefined

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <section className="grid grid-cols-3 gap-[2%]">
                {COLUMNS.map((col) => {
                    const ids = columns[col]
                    const items: Task[] = ids
                        .map((id) => tasksById[id] as Task | undefined)
                        .filter(Boolean) as Task[]

                    return (
                        <section key={col}>
                            <Label className="py-4 capitalize">{col}</Label>
                            {/* ВАЖНО: сюда передаём id колонки, а не всегда 'todo' */}
                            <Column id={col} tasks={items} />
                        </section>
                    )
                })}
            </section>

            {/* DragOverlay с отдельной карточкой таски */}
            <DragOverlay>{activeTask ? <TaskCard task={activeTask} /> : null}</DragOverlay>
        </DndContext>
    )
}
