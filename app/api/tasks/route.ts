import { NextResponse } from 'next/server'
import { type Task, type TaskStatus } from '@/entities/task'

const tasks: Task[] = []

export async function GET() {
    return NextResponse.json(tasks)
}

export async function POST(request: Request) {
    const body = (await request.json()) as Partial<Task>

    const newTask: Task = {
        id: crypto.randomUUID(),
        title: body.title ?? 'Untitled task',
        description: body.description ?? '',
        status: (body.status as TaskStatus) ?? 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    tasks.push(newTask)

    return NextResponse.json(newTask, { status: 201 })
}

export async function PATCH(request: Request) {
    const body = (await request.json()) as Partial<Task> & { id: string }

    const index = tasks.findIndex((t) => t.id === body.id)
    if (index === -1) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 })
    }

    const updated: Task = {
        ...tasks[index],
        ...body,
        updatedAt: new Date().toISOString(),
    }

    tasks[index] = updated

    return NextResponse.json(updated)
}

export async function DELETE(request: Request) {
    const { id } = (await request.json()) as { id: string }

    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 })
    }

    tasks.splice(index, 1)

    return NextResponse.json({ ok: true })
}
