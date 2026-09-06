'use client'
import { useInboxStore } from '@/lib/store'
import { useEffect } from 'react'

export function InboxInitializer() {
  const { inbox, createInbox } = useInboxStore()
  useEffect(() => {
    if (!inbox) createInbox('1h')
  }, [inbox, createInbox])
  return null
}
