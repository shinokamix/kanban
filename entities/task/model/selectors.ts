import type { RootState } from '@/providers/StoreProvider'
import { tasksAdapter } from './task.slice'

const selectTasksState = (state: RootState) => state.tasks

export const taskSelectors = tasksAdapter.getSelectors<RootState>((state) =>
    selectTasksState(state),
)

// taskSelectors.selectAll(state)      -> Task[]
// taskSelectors.selectById(state, id) -> Task | undefined
// taskSelectors.selectIds(state)      -> EntityId[]
// taskSelectors.selectEntities(state) -> Record<string, Task>
