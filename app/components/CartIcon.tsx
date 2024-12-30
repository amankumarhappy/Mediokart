import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    setCartCount(cart.length)
  }, [])

  return (
    <Link href="/cart">
      <a className="relative">
        <FaShoppingCart className="text-white text-2xl" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </a>
    </Link>
  )
}
