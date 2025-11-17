'use client'

import { Task } from '@/entities/task'
import { TaskCard } from '@/features/task-details'

type ColumnProps = {
    tasks: Task[]
}

export default function Column({ tasks }: ColumnProps) {
    return (
        <ul className="flex flex-col gap-[0.5dvh]">
            {tasks.map((task) => {
                return (
                    <li key={task.id}>
                        <TaskCard task={task} />
                    </li>
                )
            })}
        </ul>
    )
}
