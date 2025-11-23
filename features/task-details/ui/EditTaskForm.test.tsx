import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditTaskForm } from './EditTaskForm'
import type { Task } from '@/entities/task'

const createTask = (overrides: Partial<Task> = {}): Task => ({
    id: '1',
    title: 'Initial title',
    description: 'Initial description',
    status: 'in-progress',
    createdAt: '',
    updatedAt: '',
    ...overrides,
})

describe('EditTaskForm', () => {
    it('рендерит дефолтные значения из task', () => {
        const task = createTask()

        render(<EditTaskForm task={task} onSubmit={jest.fn()} onCancel={jest.fn()} />)

        const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement
        expect(titleInput.value).toBe(task.title)

        const descriptionTextarea = screen.getByLabelText(/description/i) as HTMLTextAreaElement
        expect(descriptionTextarea.value).toBe(task.description)

        // Для Select: проверяем текст внутри триггера (combobox)
        const statusTrigger = screen.getByRole('combobox')
        expect(statusTrigger).toHaveTextContent(/in progress/i)
    })

    it('вызывает onCancel при клике по кнопке Cancel', async () => {
        const user = userEvent.setup()
        const handleCancel = jest.fn()

        render(<EditTaskForm task={createTask()} onSubmit={jest.fn()} onCancel={handleCancel} />)

        const cancelButton = screen.getByRole('button', { name: /cancel/i })
        await user.click(cancelButton)

        expect(handleCancel).toHaveBeenCalledTimes(1)
    })

    it('показывает ошибку валидации, если title пустой (опционально)', async () => {
        const user = userEvent.setup()
        const handleSubmit = jest.fn()

        render(<EditTaskForm task={createTask()} onSubmit={handleSubmit} onCancel={jest.fn()} />)

        const titleInput = screen.getByLabelText(/title/i)
        await user.clear(titleInput)

        const submitButton = screen.getByRole('button', { name: /save changes/i })
        await user.click(submitButton)

        expect(screen.getByText(/title is required/i)).toBeInTheDocument()
        expect(handleSubmit).not.toHaveBeenCalled()
    })
})
