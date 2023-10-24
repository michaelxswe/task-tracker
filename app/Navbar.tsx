'use client'

import Link from 'next/link'

interface Link {
  label: string
  href: string
}

const Navbar = () => {
  const links: Link[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Tasks', href: '/tasks' }
  ]

  return (
    <nav className="mb-6 flex h-16 items-center gap-6 border-b px-6">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="rounded px-2 py-2 transition-colors duration-200 hover:bg-gray-800"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export { Navbar }
