import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex h-screen justify-center items-center">
            <Link
                href={'/kanban'}
                className="py-2 px-5 border rounded-2xl hover:opacity-70 transition-opacity duration-200"
            >
                Kanban
            </Link>
        </main>
    )
}
