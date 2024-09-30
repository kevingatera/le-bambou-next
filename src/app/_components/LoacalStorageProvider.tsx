'use client'

import React, { useEffect, useState } from 'react'
import { getStoredBookingData } from '~/app/_utils/localStorage'

export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getStoredBookingData()
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null
  }

  return <>{children}</>
}