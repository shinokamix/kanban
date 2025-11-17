'use client'

import { type Task, type TaskStatus } from '@/entities/task'
import { TaskCard } from '@/features/task-details'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

type ColumnProps = {
    tasks: Task[]
    id: TaskStatus
}

export default function Column({ tasks, id }: ColumnProps) {
    const { setNodeRef } = useDroppable({
        id,
    })

    return (
        <SortableContext id={id} items={tasks} strategy={rectSortingStrategy}>
            <ul className="flex flex-col gap-[0.5dvh]" ref={setNodeRef}>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <TaskCard task={task} />
                        </li>
                    )
                })}
            </ul>
        </SortableContext>
    )
}
