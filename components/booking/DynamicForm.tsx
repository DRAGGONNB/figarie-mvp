'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ServiceQuestion } from '@/types'

interface DynamicFormProps {
  serviceType: string
  serviceName: string
  questions: ServiceQuestion[]
}

export function DynamicForm({ serviceType, serviceName, questions }: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [bookingRef, setBookingRef] = useState<string>('')

  // Build dynamic Zod schema from questions
  const buildSchema = () => {
    const schemaFields: Record<string, z.ZodTypeAny> = {}

    questions.forEach((q) => {
      let field: z.ZodTypeAny

      switch (q.type) {
        case 'email':
          field = q.required
            ? z.string().email('Invalid email address').min(1, `${q.label} is required`)
            : z.string().email('Invalid email address').optional()
          break
        case 'tel':
          field = q.required
            ? z.string().min(10, 'Invalid phone number')
            : z.string().optional()
          break
        case 'number':
          field = q.required
            ? z.coerce.number().min(1, 'Must be at least 1')
            : z.coerce.number().optional()
          break
        default:
          field = q.required
            ? z.string().min(1, `${q.label} is required`)
            : z.string().optional()
      }

      schemaFields[q.field] = field
    })

    return z.object(schemaFields)
  }

  const schema = buildSchema()
  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_type: serviceType,
          service_name: serviceName,
          ...data,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit booking inquiry')
      }

      const result = await response.json()
      setSubmitStatus('success')
      setBookingRef(result.booking_ref || 'FIG-' + Date.now())
      reset()
    } catch (error) {
      console.error('Booking submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (question: ServiceQuestion) => {
    const commonProps = {
      ...register(question.field as keyof FormData),
      id: question.field,
      placeholder: question.placeholder || '',
      disabled: isSubmitting,
    }

    switch (question.type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            rows={4}
            className="resize-none"
          />
        )
      case 'select':
        return (
          <select
            {...commonProps}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select...</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      default:
        return (
          <Input
            {...commonProps}
            type={question.type}
          />
        )
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-green-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-light tracking-figarie uppercase mb-4">
          Booking Inquiry Submitted!
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your interest in {serviceName}.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Reference: <span className="font-mono text-figarie-gold">{bookingRef}</span>
        </p>
        <p className="text-gray-600 mb-8">
          We&apos;ll contact you within 24 hours to discuss your requirements.
        </p>
        <Button
          onClick={() => {
            setSubmitStatus('idle')
            reset()
          }}
          variant="outline"
        >
          Submit Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {questions.map((question) => (
        <div key={question.field} className="space-y-2">
          <Label htmlFor={question.field} className="text-base">
            {question.label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderField(question)}
          {errors[question.field as keyof FormData] && (
            <p className="text-sm text-red-600">
              {errors[question.field as keyof FormData]?.message as string}
            </p>
          )}
        </div>
      ))}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">
            Failed to submit your inquiry. Please try again or contact us directly.
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full figarie-button text-base py-6"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        By submitting this form, you agree to be contacted by FIGARIE regarding your inquiry.
      </p>
    </form>
  )
}
