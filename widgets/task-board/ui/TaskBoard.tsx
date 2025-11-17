'use client'

import { useLoadTasks } from '../model/useLoadTasks'
import { useAppSelector } from '@/providers/StoreProvider'
import { taskSelectors } from '@/entities/task'
import Column from './Column'
import { Label } from '@shared/ui/label'
import { type TaskStatus } from '@/entities/task'

import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    UniqueIdentifier,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

const Columns: TaskStatus[] = ['todo', 'in-progress', 'done']

export function TaskBoard() {
    useLoadTasks()

    const tasks = useAppSelector(taskSelectors.selectAll)

    return (
        <DndContext>
            <section className="grid grid-cols-3 gap-[2%]">
                {Columns.map((col) => {
                    const items = tasks.filter((task) => task.status === col)
                    return (
                        <section key={col}>
                            <Label className="py-4 capitalize">{col}</Label>
                            <Column tasks={items} id={'todo'} />
                        </section>
                    )
                })}
            </section>
        </DndContext>
    )
}
