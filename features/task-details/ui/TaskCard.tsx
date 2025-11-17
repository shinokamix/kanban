'use client'

import { useState } from 'react'
import type { Task } from '@/entities/task'
import { TaskDetailsDialog } from './TaskDetailsDialog'
import { Grip } from 'lucide-react'

import { Item, ItemActions, ItemContent } from '@/shared/ui/item'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type TaskCardWithDetailsProps = {
    task: Task
}

export function TaskCard({ task }: TaskCardWithDetailsProps) {
    const [open, setOpen] = useState(false)
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
        <>
            <Item
                ref={setNodeRef}
                style={style}
                variant={'outline'}
                size={'sm'}
                onClick={() => setOpen(true)}
            >
                <ItemContent>
                    <p>{task.title}</p>
                </ItemContent>
                <ItemActions
                    ref={setActivatorNodeRef}
                    {...listeners}
                    {...attributes}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Grip />
                </ItemActions>
            </Item>
            <TaskDetailsDialog taskId={task.id} open={open} onOpenChange={setOpen} />
        </>
    )
}
