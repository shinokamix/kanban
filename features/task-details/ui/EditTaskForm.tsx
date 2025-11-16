// features/task-details/ui/EditTaskForm.tsx
'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { editTaskSchema, type EditTaskFormValues } from '../model/schema'

import type { Task } from '@/entities/task'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Field, FieldLabel, FieldDescription, FieldError } from '@/shared/ui/field'
import { DialogFooter } from '@/shared/ui/dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select'

type EditTaskFormProps = {
    task: Task
    onSubmit: (values: EditTaskFormValues) => void
    onCancel: () => void
}

export function EditTaskForm({ task, onSubmit, onCancel }: EditTaskFormProps) {
    const form = useForm<EditTaskFormValues>({
        resolver: zodResolver(editTaskSchema),
        defaultValues: {
            title: task.title,
            description: task.description,
            status: task.status,
        },
    })

    const handleSubmit = (values: EditTaskFormValues) => {
        onSubmit(values)
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Title */}
            <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                        />
                        <FieldDescription>Main title of the task.</FieldDescription>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Description */}
            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                        <Textarea
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="min-h-[100px]"
                            placeholder="Details, steps, links, notes…"
                        />
                        <FieldDescription>Optional. Add more context if needed.</FieldDescription>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Status */}
            <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Status</FieldLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger aria-invalid={fieldState.invalid}>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todo">Todo</SelectItem>
                                <SelectItem value="in-progress">In progress</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                        </Select>
                        <FieldDescription>Current state of the task.</FieldDescription>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    Save changes
                </Button>
            </DialogFooter>
        </form>
    )
}
