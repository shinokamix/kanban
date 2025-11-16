'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../providers/StoreProvider'
import { Task, TaskCard, taskAdded, taskSelectors, type TaskStatus } from '@/entities/task'

const statuses: TaskStatus[] = ['todo', 'in-progress', 'done']

export default function KanbanPage() {
    const dispatch = useAppDispatch()

    const tasks = useAppSelector(taskSelectors.selectTasks)

    useEffect(() => {
        dispatch(
            taskAdded({
                id: '1',
                title: 'Настроить Redux',
                description: 'Сделать StoreProvider и Task entity',
                status: 'in-progress',
                createdAt: new Date().toISOString(),
            }),
        )
    }, [dispatch])

    return (
        <main className="mx-auto flex max-w-5xl gap-4 p-6">
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
