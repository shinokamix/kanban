import { render, screen } from '@testing-library/react'
import { CreateTaskDialog } from './CreateTaskDialog'
import { useCreateTask } from '../model/useCreateTask'

jest.mock('../model/useCreateTask')
const mockedUseCreateTask = useCreateTask as jest.Mock

describe('CreateTaskDialog', () => {
    beforeEach(() => {
        mockedUseCreateTask.mockReturnValue({
            createTask: jest.fn(),
        })
    })

    test('проверка что содержит заголовок New Task', () => {
        render(<CreateTaskDialog open={true} onOpenChange={jest.fn} />)

        const title = screen.getByRole('heading', { name: 'New Task' })
        expect(title).toBeInTheDocument()
    })
})
