"use client"

import Link from "next/link"

interface Link {
  label: string
  href: string
}

const navLinks: Link[] = [
  { label: "Home", href: "/" },
  { label: "Tasks", href: "/tasks" }
]

const Navbar = () => {
  return (
    <nav className="flex h-20 items-center gap-5 border-b px-10">
      {navLinks.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="rounded px-3 py-3 transition-colors duration-200 hover:bg-gray-800"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export { Navbar }
