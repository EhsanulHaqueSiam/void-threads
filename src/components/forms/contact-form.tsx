import { useState } from 'react'
import { z } from 'zod'
import { Send } from 'lucide-react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useToast } from '~/components/ui/toast'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

export function ContactForm() {
  const { addToast } = useToast()
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = contactSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setForm({ name: '', email: '', subject: '', message: '' })
    addToast('Message sent! We\'ll get back to you soon.')
  }

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />
      </div>
      <Input
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => handleChange('subject', e.target.value)}
        error={errors.subject}
      />
      <div>
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={5}
          className="w-full bg-void-light border border-smoke/10 px-4 py-3 text-sm text-smoke placeholder:text-smoke-faint transition-colors focus:border-gold focus:outline-none resize-none"
        />
        {errors.message && <p className="mt-1 text-xs text-danger">{errors.message}</p>}
      </div>
      <Button type="submit" variant="gold" size="lg" className="gap-2">
        <Send size={16} />
        Send Message
      </Button>
    </form>
  )
}
