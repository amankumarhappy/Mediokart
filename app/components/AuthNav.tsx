'use client'

import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

export default function AuthNav() {
  const { user, signOut } = useAuth()

  if (!user) {
    return (
      <div className="flex gap-4">
        <Link href="/login" className="btn-primary">Login</Link>
        <Link href="/signup" className="btn-secondary">Sign Up</Link>
      </div>
    )
  }

  return (
    <div className="flex gap-4 items-center">
      <Link href="/dashboard" className="btn-primary">Dashboard</Link>
      <Link href="/profile" className="btn-secondary">Profile</Link>
      <Link href="/my-account" className="btn-secondary">My Account</Link>
      <button onClick={signOut} className="btn-secondary">Logout</button>
    </div>
  )
}
