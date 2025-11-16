import type { Task } from '../model/task.types'
import { Item, ItemContent, ItemTitle } from '@/shared/ui/item'

interface TaskCardProps {
    task: Task
    onClick: () => void
}

export default function TaskItem({ task, onClick }: TaskCardProps) {
    return (
        <Item variant={'outline'} size={'sm'} onClick={onClick}>
            <ItemContent>
                <ItemTitle>{task.title}</ItemTitle>
            </ItemContent>
        </Item>
    )
}
