'use client'

import type { Task } from '../model/task.types'
import { Item, ItemContent, ItemTitle } from '@/shared/ui/item'

interface TaskCardProps {
    task: Task
}

export default function TaskItem({ task }: TaskCardProps) {
    return (
        <Item variant={'outline'} size={'sm'}>
            <ItemContent>
                <ItemTitle>{task.title}</ItemTitle>
            </ItemContent>
        </Item>
    )
}
