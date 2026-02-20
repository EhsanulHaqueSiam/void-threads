import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useToast } from '~/components/ui/toast'

interface NewsletterFormProps {
  className?: string
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const { addToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addToast('Welcome to the void! Check your email for 10% off.')
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 bg-void-light border border-smoke/10 border-r-0 px-4 py-3 text-sm text-smoke placeholder:text-smoke-faint focus:outline-none focus:border-gold"
        />
        <Button type="submit" variant="gold" className="shrink-0">
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  )
}
