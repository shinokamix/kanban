import Link from 'next/link'
import { GithubIcon } from 'lucide-react'
import { Button } from '@/shared/ui/button'

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center px-8 py-8">
            <div className="flex w-full max-w-2xl flex-col gap-8 md:max-w-xl">
                {/* Text */}
                <section className="flex flex-col gap-4">
                    <h1 className="font-medium text-4xl leading-tight text-balance md:text-6xl">
                        Kanban
                    </h1>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                        A minimal Kanban board for keeping work organized. Create tasks, move them
                        between columns and always see what’s in progress and what’s done — clean,
                        simple and nothing beyond the basics.
                    </p>
                </section>

                {/* Buttons */}
                <section className="flex gap-3 flex-row">
                    <Link href="/kanban">
                        <Button className="items-center">Launch app</Button>
                    </Link>

                    <Link href="https://github.com/shinokamix/kanban">
                        <Button variant="outline" className=" gap-2">
                            <GithubIcon className="h-5 w-5" />

                            <span className="hidden sm:inline">GitHub</span>
                        </Button>
                    </Link>
                </section>
            </div>
        </main>
    )
}
