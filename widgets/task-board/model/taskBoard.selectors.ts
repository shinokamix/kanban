import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/providers/StoreProvider'

export const selectBoard = (state: RootState) => state.taskBoard

export const selectColumns = createSelector(selectBoard, (b) => b.columns)
export const selectActiveId = createSelector(selectBoard, (b) => b.activeId)
export const selectActiveStartColumn = createSelector(selectBoard, (b) => b.activeStartColumn)
