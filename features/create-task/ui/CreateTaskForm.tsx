'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createTaskSchema, type CreateTaskFormValues } from '../model/schema'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Field, FieldLabel, FieldDescription, FieldError } from '@/shared/ui/field'
import { DialogFooter } from '@/shared/ui/dialog'

type CreateTaskFormProps = {
    onSubmit: (values: CreateTaskFormValues) => void
    onCancel: () => void
}

export function CreateTaskForm({ onSubmit, onCancel }: CreateTaskFormProps) {
    const form = useForm<CreateTaskFormValues>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    })

    const handleSubmit = (values: CreateTaskFormValues) => {
        onSubmit(values)
        form.reset()
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* TITLE */}
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
                            placeholder="For example: Setup Redux"
                            autoComplete="off"
                        />
                        <FieldDescription>Short name of the task.</FieldDescription>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* DESCRIPTION */}
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
                            placeholder="Details, steps, links, notes…"
                            className="min-h-[100px]"
                        />
                        <FieldDescription>Optional. Add more context if needed.</FieldDescription>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    Create task
                </Button>
            </DialogFooter>
        </form>
    )
}
