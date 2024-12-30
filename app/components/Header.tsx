'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogOut, Sun, Moon } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { user, loading, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()
  const moreDropdownRef = useRef(null)
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setIsMoreDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Find Doctor', href: '/find-doctor' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'AuraBox', href: '/aurabox' },
    { name: 'Shop', href: '/shop' },
  ]

  const moreItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'General Health Tips', href: '/general-tips' },
    { name: 'Internship', href: '/internship' },
    { name: 'Treatment Videos', href: '/treatment-videos' },
 
    { name: 'Insurance', href: '/insurance' },

    { name: 'Blogs', href: '/blogs' },
    { name: 'News', href: '/news' },
    { name: 'Events', href: '/events' },
   
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'FAQs', href: '/faqs' },

  ]

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-navy-800 shadow-lg' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="https://i.ibb.co/hcJC67G/Gemini-Generated-Image-awtwnzawtwnzawtw-removebg-preview.png" 
            alt="Mediokart Logo" 
            width={200} 
            height={50} 
            className="h-12 w-auto transition-transform hover:scale-105"
          />
        </Link>
        <nav className="hidden lg:flex space-x-1">
          {navItems.map((item) => (
            <NavButton key={item.name} href={item.href}>{item.name}</NavButton>
          ))}
          <div className="relative group" ref={moreDropdownRef}>
            <button
              className="px-4 py-2 rounded-md text-blue-600 dark:text-teal-400 hover:bg-blue-50 dark:hover:bg-navy-700 
                transition-all duration-300 flex items-center after:content-[''] after:w-0 after:h-0.5 
                after:absolute after:bottom-1 after:left-0 after:bg-blue-600 dark:after:bg-teal-400 
                after:transition-all group-hover:after:w-full"
              onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
            >
              More <ChevronDown className="ml-1 transition-transform group-hover:rotate-180" />
            </button>
            <AnimatePresence>
              {isMoreDropdownOpen && <MoreDropdown items={moreItems} />}
            </AnimatePresence>
          </div>
        </nav>
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
          >
            {isDarkMode ? <Sun className="text-teal-400" /> : <Moon className="text-blue-600" />}
          </button>
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="relative" ref={userMenuRef}>
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-blue-600 dark:text-teal-400 hover:bg-blue-100 dark:hover:bg-navy-700 transition-colors duration-300"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} />
                <span>{user.displayName || user.email}</span>
              </motion.button>
              <AnimatePresence>
                {isUserMenuOpen && <UserMenu onLogout={handleLogout} />}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <NavButton href="/login">Sign In</NavButton>
              <NavButton href="/signup">Sign Up</NavButton>
            </>
          )}
        </div>
        <button
          className="lg:hidden text-blue-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            navItems={navItems} 
            moreItems={moreItems} 
            user={user} 
            onLogout={handleLogout} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />
        )}
      </AnimatePresence>
    </header>
  )
}

const NavButton = ({ href, children, onClick = () => {} }) => (
  <Link href={href} passHref>
    <motion.button
      className="relative px-4 py-2 rounded-md text-blue-600 dark:text-teal-400 hover:bg-blue-50 
        dark:hover:bg-navy-700 transition-all duration-300 after:content-[''] after:w-0 after:h-0.5 
        after:absolute after:bottom-1 after:left-0 after:bg-blue-600 dark:after:bg-teal-400 
        after:transition-all hover:after:w-full font-montserrat"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  </Link>
)

const MoreDropdown = ({ items }) => (
  <motion.div
    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-lg shadow-xl 
      border border-gray-100 dark:border-navy-700 py-1"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {items.map((item) => (
      <Link key={item.name} href={item.href}>
        <motion.a
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-navy-700 hover:text-blue-600 dark:hover:text-teal-400"
          whileHover={{ x: 5 }}
        >
          {item.name}
        </motion.a>
      </Link>
    ))}
  </motion.div>
)

const UserMenu = ({ onLogout }) => (
  <motion.div
    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-md shadow-lg py-1"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <Link href="/profile">
      <motion.a
        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-navy-700 hover:text-blue-600 dark:hover:text-teal-400"
        whileHover={{ x: 5 }}
      >
        Profile
      </motion.a>
    </Link>
    <motion.button
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-navy-700 hover:text-blue-600 dark:hover:text-teal-400"
      onClick={onLogout}
      whileHover={{ x: 5 }}
    >
      Logout
    </motion.button>
  </motion.div>
)

const MobileMenu = ({ navItems, moreItems, user, onLogout, setIsMobileMenuOpen }) => (
  <motion.div
    className="lg:hidden bg-white dark:bg-navy-800 shadow-lg absolute top-full left-0 right-0 max-h-[80vh] overflow-y-auto"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <nav className="flex flex-col p-4 space-y-2">
      {navItems.map((item) => (
        <NavButton key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
          {item.name}
        </NavButton>
      ))}
      {moreItems.map((item) => (
        <NavButton key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
          {item.name}
        </NavButton>
      ))}
      {user ? (
        <>
          <NavButton href="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</NavButton>
          <motion.button
            className="w-full text-left px-4 py-2 rounded-md text-blue-600 dark:text-teal-400 hover:bg-blue-100 dark:hover:bg-navy-700 transition-colors duration-300"
            onClick={() => {
              onLogout();
              setIsMobileMenuOpen(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </>
      ) : (
        <>
          <NavButton href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</NavButton>
          <NavButton href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</NavButton>
        </>
      )}
    </nav>
  </motion.div>
)

export default Header
