import type { Task } from '@/entities/task'
import { GripVertical } from 'lucide-react'

import { Item, ItemActions, ItemContent } from '@/shared/ui/item'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type TaskCardProps = {
    task: Task
    onOpenDetails: (taskId: string) => void
}

export function TaskCard({ task, onOpenDetails }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
    })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    }

    return (
        <Item
            ref={setNodeRef}
            style={style}
            variant="outline"
            size="sm"
            onClick={() => onOpenDetails(task.id)}
            className="bg-background"
        >
            <ItemContent>
                <p className="pointer-events-none">{task.title}</p>
            </ItemContent>
            <ItemActions
                ref={setActivatorNodeRef}
                {...listeners}
                {...attributes}
                onClick={(e) => e.stopPropagation()}
                className="cursor-grab w-4 h-4 touch-none"
            >
                <GripVertical />
            </ItemActions>
        </Item>
    )
}
