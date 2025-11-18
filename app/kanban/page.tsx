import { CreateTaskButton } from '@/features/create-task'
import { TaskBoard } from '@/widgets/task-board'

export default function KanbanPage() {
    return (
        <main className="">
            <section className="mt-[15dvh] mx-auto flex max-w-5xl flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Kanban</h1>
                    <CreateTaskButton />
                </div>

                <TaskBoard />
            </section>
        </main>
    )
}
