'use client'

import { useLoadTasks } from '../model/useLoadTasks'
import { useAppSelector } from '@/providers/StoreProvider'
import { taskSelectors } from '@/entities/task'
import Column from './Column'
import { Label } from '@shared/ui/label'

export function TaskBoard() {
    useLoadTasks()

    const tasks = useAppSelector(taskSelectors.selectAll)

    const todo = tasks.filter((task) => task.status === 'todo')
    const inProgress = tasks.filter((task) => task.status === 'in-progress')
    const done = tasks.filter((task) => task.status === 'done')

    return (
        <section className="grid grid-cols-3 gap-[2%]">
            <section>
                <Label className="py-4">To-do</Label>
                <Column tasks={todo} />
            </section>
            <section>
                <Label className="py-4">In progress</Label>
                <Column tasks={inProgress} />
            </section>
            <section>
                <Label className="py-4">Done</Label>
                <Column tasks={done} />
            </section>
        </section>
    )
}
