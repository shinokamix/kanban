'use client'

import { useCallback, useEffect } from 'react'

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
    TouchSensor,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

const COLUMNS: TaskStatus[] = ['todo', 'in-progress', 'done']

import {
    syncColumnsWithTasks,
    moveBetweenColumns,
    moveWithinColumn,
    setActive,
    resetActive,
} from '../model/taskBoard.slice'

import {
    selectColumns,
    selectActiveId,
    selectActiveStartColumn,
} from '../model/taskBoard.selectors'

export function TaskBoard() {
    useLoadTasks()

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(taskSelectors.selectAll)
    const tasksById = useAppSelector(taskSelectors.selectEntities)

    const columns = useAppSelector(selectColumns)
    const activeId = useAppSelector(selectActiveId)
    const activeStartColumn = useAppSelector(selectActiveStartColumn)

    // сенсоры как раньше ...
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    // вместо setColumns в useEffect — диспатчим в стор
    useEffect(() => {
        dispatch(syncColumnsWithTasks(tasks))
    }, [dispatch, tasks])

    const findColumn = (id: UniqueIdentifier | undefined): TaskStatus | undefined => {
        if (!id) return undefined
        const strId = id.toString()

        if (COLUMNS.includes(strId as TaskStatus)) {
            return strId as TaskStatus
        }

        return COLUMNS.find((col) => columns[col].includes(strId))
    }

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

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        const id = active.id.toString()

        const col = findColumn(id) ?? null
        dispatch(setActive({ id, startColumn: col }))
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        const overId = over?.id
        if (!overId) return

        const activeIdStr = active.id.toString()
        const activeColumn = findColumn(activeIdStr)
        const overColumn = findColumn(overId)

        if (!activeColumn || !overColumn || activeColumn === overColumn) {
            return
        }

        dispatch(
            moveBetweenColumns({
                activeId: activeIdStr,
                activeColumn,
                overId: overId.toString(),
                overColumn,
            }),
        )
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        const overId = over?.id

        if (!overId) {
            dispatch(resetActive())
            return
        }

        const activeIdStr = active.id.toString()
        const activeColumn = findColumn(activeIdStr)
        const overColumn = findColumn(overId)

        if (!activeColumn || !overColumn) {
            dispatch(resetActive())
            return
        }

        // 1) сортировка внутри одной колонки
        if (activeColumn === overColumn) {
            const items = columns[activeColumn]
            const activeIndex = items.indexOf(activeIdStr)
            const overIndex = items.indexOf(overId.toString())

            if (activeIndex !== overIndex) {
                dispatch(
                    moveWithinColumn({
                        column: overColumn,
                        fromIndex: activeIndex,
                        toIndex: overIndex,
                    }),
                )
            }
        }

        // 2) изменение статуса
        const startColumn = activeStartColumn
        if (startColumn && startColumn !== overColumn) {
            void updateTaskStatus(activeIdStr, overColumn)
        }

        dispatch(resetActive())
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
            <section className="grid md:grid-cols-3 md:gap-[1dvw]">
                {COLUMNS.map((col) => {
                    const ids = columns[col]
                    const items: Task[] = ids
                        .map((id) => tasksById[id] as Task | undefined)
                        .filter(Boolean) as Task[]

                    return (
                        <section key={col}>
                            <Label className="py-4 px-2 capitalize">{col}</Label>
                            <Column id={col} tasks={items} />
                        </section>
                    )
                })}
            </section>

            <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} onOpenDetails={() => true} /> : null}
            </DragOverlay>
        </DndContext>
    )
}
