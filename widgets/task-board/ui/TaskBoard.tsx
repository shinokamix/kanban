'use client'

import { useLoadTasks } from '../model/useLoadTasks'
import { useAppSelector } from '@/providers/StoreProvider'
import { taskSelectors } from '@/entities/task'
import Column from './Column'

export function TaskBoard() {
    useLoadTasks()

    const tasks = useAppSelector(taskSelectors.selectAll)

    const todo = tasks.filter((task) => task.status === 'todo')
    const inProgress = tasks.filter((task) => task.status === 'in-progress')
    const done = tasks.filter((task) => task.status === 'done')

    return (
        <section className="grid grid-cols-3 gap-[2%]">
            <Column tasks={todo} />
            <Column tasks={inProgress} />
            <Column tasks={done} />
        </section>
    )
}
