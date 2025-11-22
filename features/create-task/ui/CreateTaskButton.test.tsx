import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreateTaskButton } from './CreateTaskButton'
import { TaskStatus } from '@/entities/task'

jest.mock('./CreateTaskDialog', () => ({
    CreateTaskDialog: ({ open, initialStatus }: { open: boolean; initialStatus: TaskStatus }) => (
        <div data-testid="dialog" data-open={open} data-status={initialStatus} />
    ),
}))

describe('CreateTaskButton', () => {
    test('при нажатии открывается диалог', async () => {
        const user = userEvent.setup()

        render(<CreateTaskButton />)

        // до клика
        const dialog = screen.getByTestId('dialog')
        expect(dialog.getAttribute('data-open')).toBe('false')

        // клик по кнопке
        const button = screen.getByRole('button', { name: 'New Task' })
        await user.click(button)

        // после клика
        const updatedDialog = screen.getByTestId('dialog')
        expect(updatedDialog.getAttribute('data-open')).toBe('true')
    })

    test('прокидывает initialStatus в диалог', () => {
        render(<CreateTaskButton initialStatus="in-progress" />)

        const dialog = screen.getByTestId('dialog')
        expect(dialog.getAttribute('data-status')).toBe('in-progress')
    })
})
