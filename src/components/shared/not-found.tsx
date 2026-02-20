import { Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="font-heading text-6xl font-bold text-smoke mb-4">404</h1>
      <p className="text-smoke-muted mb-8 max-w-md">
        The page you're looking for has fallen into the void. Let's get you back on track.
      </p>
      <div className="flex gap-4">
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
        <Link to="/collections">
          <Button variant="secondary">Shop Collections</Button>
        </Link>
      </div>
    </div>
  )
}
