'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase/config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

interface FirebaseContextType {
  user: User | null
  loading: boolean
  error: string | null
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  error: null
})

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('FirebaseProvider mounted')
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email)
      
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          
          if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              createdAt: new Date().toISOString(),
              username: user.displayName || '',
              updatedAt: new Date().toISOString()
            })
            console.log('Created new user document')
          }
          
          setUser(user)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Firebase context error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <FirebaseContext.Provider value={{ user, loading, error }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext)

