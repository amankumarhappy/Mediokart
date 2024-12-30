'use client'

import Link from 'next/link'

export default function QuickActions() {
  return (
    <div>
      <h2>Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/book-appointment" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <span className="text-sm font-medium">Book Appointment</span>
        </Link>
        
        <Link href="/medicines" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <span className="text-sm font-medium">Order Medicines</span>
        </Link>
        
        <Link href="/health-records" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
          <span className="text-sm font-medium">Health Records</span>
        </Link>
        
        <Link href="/profile" className="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
          <span className="text-sm font-medium">Update Profile</span>
        </Link>
      </div>
    </div>
  )
} 