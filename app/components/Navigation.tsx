'use client'

import { useAuth } from '../hooks/useAuth'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home, 
  Search, 
  ShoppingCart, 
  Menu,
  User,
  LogOut,
  LayoutDashboard
} from 'lucide-react'

export default function Navigation() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: 'Search',
      href: '/search',
      icon: <Search className="h-5 w-5" />,
    },
    {
      label: 'Cart',
      href: '/cart',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      label: 'More',
      icon: <Menu className="h-5 w-5" />,
      subMenu: user ? [
        {
          label: 'Profile',
          href: '/profile',
          icon: <User className="h-5 w-5" />,
        },
        {
          label: 'Dashboard',
          href: '/dashboard',
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
          label: 'Logout',
          onClick: logout,
          icon: <LogOut className="h-5 w-5" />,
        },
      ] : [
        {
          label: 'Login',
          href: '/login',
          icon: <User className="h-5 w-5" />,
        },
      ],
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {menuItems.map((item, index) => (
            <div key={item.label} className="relative">
              {item.subMenu ? (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex flex-col items-center p-2"
                >
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              ) : (
                <Link href={item.href} className="flex flex-col items-center p-2">
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              )}

              {/* Submenu */}
              {item.subMenu && isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {item.subMenu.map((subItem) => (
                    <div key={subItem.label}>
                      {subItem.href ? (
                        <Link
                          href={subItem.href}
                          className="flex items-center px-4 py-3 hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.icon}
                          <span className="ml-3">{subItem.label}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            subItem.onClick?.()
                            setIsMenuOpen(false)
                          }}
                          className="flex items-center w-full px-4 py-3 hover:bg-gray-50"
                        >
                          {subItem.icon}
                          <span className="ml-3">{subItem.label}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
} 