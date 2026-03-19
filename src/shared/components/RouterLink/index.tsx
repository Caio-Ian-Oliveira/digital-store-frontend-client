import { Link } from 'react-router-dom'

type ReactLinkProps = React.ComponentProps<typeof Link>

export function RouterLink({ ...props }: ReactLinkProps) {
  return <Link {...props}></Link>
}
