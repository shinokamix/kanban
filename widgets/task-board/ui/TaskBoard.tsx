'use client'

import { useLoadTasks } from '../model/useLoadTasks'
import { useAppSelector } from '@/providers/StoreProvider'
import { taskSelectors } from '@/entities/task'

export function TaskBoard() {
    useLoadTasks()

    const tasks = useAppSelector(taskSelectors.selectAll)

    return <section className="grid grid-cols-3 gap-10"></section>
}
