import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreateTaskForm } from './CreateTaskForm'

describe('CreateTaskForm', () => {
    test('рендерит поля и кнопки', () => {
        render(<CreateTaskForm onSubmit={jest.fn()} onCancel={jest.fn()} />)

        expect(screen.getByLabelText('Title')).toBeInTheDocument()
        expect(screen.getByLabelText('Description')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Create task' })).toBeInTheDocument()
    })

    test('успешный сабмит вызывает onSubmit и сбрасывает форму', async () => {
        const user = userEvent.setup()
        const onSubmit = jest.fn()

        render(<CreateTaskForm onSubmit={onSubmit} onCancel={jest.fn()} />)

        const titleInput = screen.getByLabelText(/title/i)
        const descriptionInput = screen.getByLabelText(/description/i)
        const submitButton = screen.getByRole('button', { name: 'Create task' })

        await user.type(titleInput, 'My task')
        await user.type(descriptionInput, 'Some description')
        await user.click(submitButton)

        expect(onSubmit).toHaveBeenCalledWith({
            title: 'My task',
            description: 'Some description',
        })

        expect(titleInput).toHaveValue('')
        expect(descriptionInput).toHaveValue('')
    })

    test('при пустой форме показывает ошибки и не вызывает onSubmit', async () => {
        const user = userEvent.setup()
        const onSubmit = jest.fn()

        render(<CreateTaskForm onSubmit={onSubmit} onCancel={jest.fn()} />)

        const submitButton = screen.getByRole('button', { name: 'Create task' })
        await user.click(submitButton)

        const errorMessages = screen.getAllByText('Title is required')
        expect(errorMessages.length).toBeGreaterThan(0)

        expect(onSubmit).not.toHaveBeenCalled()
    })

    test('кнопка Cancel вызывает onCancel', async () => {
        const user = userEvent.setup()
        const onCancel = jest.fn()

        render(<CreateTaskForm onSubmit={jest.fn()} onCancel={onCancel} />)

        await user.click(screen.getByRole('button', { name: 'Cancel' }))

        expect(onCancel).toHaveBeenCalled()
    })
})
