'use client'

import { useAppSelector } from '../../providers/StoreProvider'
import { Task, TaskCard, taskSelectors, type TaskStatus } from '@/entities/task'
import { CreateTaskButton } from '@/features/create-task'

const statuses: TaskStatus[] = ['todo', 'in-progress', 'done']

export default function KanbanPage() {
    const tasks = useAppSelector(taskSelectors.selectTasks)

    return (
        <main className="mx-auto flex max-w-5xl gap-4 p-6">
            <CreateTaskButton />

            {statuses.map((status) => {
                const tasksByStatus = tasks.filter((task: Task) => task.status === status)

                return (
                    <section key={status} className="flex-1 space-y-3">
                        <h2 className="text-lg font-semibold capitalize">
                            {status.replace('-', ' ')}
                        </h2>
                        <div className="space-y-2">
                            {tasksByStatus.map((task: Task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    </section>
                )
            })}
        </main>
    )
}
