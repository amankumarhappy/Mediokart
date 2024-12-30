'use client'

import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

export default function AuthNav() {
  const { user, signOut } = useAuth()

  if (!user) {
    return (
      <div className="flex gap-4">
        <Link href="/login"><a className="btn-primary">Login</a></Link>
        <Link href="/signup"><a className="btn-secondary">Sign Up</a></Link>
      </div>
    )
  }

  return (
    <div className="flex gap-4 items-center">
      <Link href="/dashboard"><a className="btn-primary">Dashboard</a></Link>
      <Link href="/profile"><a className="btn-secondary">Profile</a></Link>
      <Link href="/my-account"><a className="btn-secondary">My Account</a></Link>
      <button onClick={signOut} className="btn-secondary">Logout</button>
    </div>
  )
}
