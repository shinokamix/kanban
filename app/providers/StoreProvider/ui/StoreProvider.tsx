'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../config/store'

interface StoreProviderProps {
    children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
    const store = useMemo(() => makeStore(), [])

    return <Provider store={store}>{children}</Provider>
}
