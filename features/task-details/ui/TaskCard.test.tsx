import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskCard } from './TaskCard'
import type { Task } from '@/entities/task'
import { useSortable } from '@dnd-kit/sortable'

jest.mock('@dnd-kit/sortable', () => ({
    useSortable: jest.fn(),
}))

const mockedUseSortable = useSortable as unknown as jest.Mock

const createTask = (overrides: Partial<Task> = {}): Task => ({
    id: 'task-1',
    title: 'Test task',
    description: 'Some description',
    status: 'todo',
    createdAt: '',
    updatedAt: '',
    ...overrides,
})

beforeEach(() => {
    mockedUseSortable.mockReturnValue({
        attributes: {},
        listeners: {},
        setNodeRef: jest.fn(),
        setActivatorNodeRef: jest.fn(),
        transform: null,
        transition: undefined,
        isDragging: false,
    })
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('TaskCard', () => {
    it('рендерит заголовок задачи', () => {
        const task = createTask()

        render(<TaskCard task={task} onOpenDetails={jest.fn()} />)

        expect(screen.getByText(task.title)).toBeInTheDocument()
    })

    it('вызывает onOpenDetails при клике по карточке', async () => {
        const user = userEvent.setup()
        const task = createTask()
        const handleOpenDetails = jest.fn()

        render(<TaskCard task={task} onOpenDetails={handleOpenDetails} />)

        await user.click(screen.getByText(task.title))

        expect(handleOpenDetails).toHaveBeenCalledTimes(1)
        expect(handleOpenDetails).toHaveBeenCalledWith(task.id)
    })

    it('НЕ вызывает onOpenDetails при клике по хэндлу (drag-ручке)', async () => {
        const user = userEvent.setup()
        const task = createTask()
        const handleOpenDetails = jest.fn()

        render(<TaskCard task={task} onOpenDetails={handleOpenDetails} />)

        const handle = screen.getByTestId('task-card-handle')

        await user.click(handle)

        expect(handleOpenDetails).not.toHaveBeenCalled()
    })

    it('ставит opacity=0.6 при isDragging = true', () => {
        const task = createTask()

        mockedUseSortable.mockReturnValueOnce({
            attributes: {},
            listeners: {},
            setNodeRef: jest.fn(),
            setActivatorNodeRef: jest.fn(),
            transform: null,
            transition: 'transform 150ms ease',
            isDragging: true,
        })

        const { container } = render(<TaskCard task={task} onOpenDetails={jest.fn()} />)

        const root = container.firstElementChild as HTMLElement
        expect(root).toHaveStyle({ opacity: '0.6' })
    })
})
