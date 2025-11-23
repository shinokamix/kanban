import Link from 'next/link'
import { Github } from 'lucide-react'
import { Button } from '@/shared/ui/button'

export default function Home() {
    return (
        <main className="flex h-screen justify-center items-center">
            <div className="flex flex-col gap-[3dvh] max-w-[30%]">
                <section className="flex flex-col">
                    <h1 className="font-medium text-[8dvw] text-">Kanban</h1>
                    <p className="text-[1dvw]">
                        A web-based Kanban board application for organizing tasks and workflows
                        using visual columns and draggable cards.
                    </p>
                </section>

                <section className="flex items-center gap-1">
                    <Link href={'/kanban'}>
                        <Button>Go to app</Button>
                    </Link>
                    <Link href={'https://github.com/shinokamix/kanban'}>
                        <Button variant={'outline'}>
                            <Github />
                        </Button>
                    </Link>
                </section>
            </div>
        </main>
    )
}
