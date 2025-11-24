import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenge')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/challenge"!</div>
}
