import { ref, computed, watch } from 'vue'
export interface Task {
  id: string
  title: string
  category: 'personal' | 'work' | 'shopping' | 'health'
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: string
}

export type FilterStatus = 'all' | 'active' | 'completed'
export type FilterCategory = 'all' | Task['category']
export type FilterPriority = 'all' | Task['priority']


function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem('vue-tasks')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useTaskManager() {
  // ================================================
  // ref() — Creates a reactive variable.
  // ================================================
  // Think of ref() like useState() in React, but:
  // - You access the value with .value in JS/TS
  // - In the <template>, Vue auto-unwraps it (no .value needed)
  // - It stays reactive forever — no re-renders needed
  //
  // Example:
  //   const count = ref(0)
  //   count.value++  // ← need .value in script
  //   {{ count }}    // ← no .value in template
  // ================================================
  const tasks = ref<Task[]>(loadTasks())
  const filterStatus = ref<FilterStatus>('all')
  const filterCategory = ref<FilterCategory>('all')
  const filterPriority = ref<FilterPriority>('all')

  // ================================================
  // computed() — Derived/calculated values.
  // ================================================
  // Like useMemo() in React, but MUCH simpler:
  // - Vue automatically tracks which refs you read
  // - It re-computes only when those refs change
  // - No dependency array needed!
  //
  // Example:
  //   const doubled = computed(() => count.value * 2)
  //   // doubled.value auto-updates when count changes
  // ================================================
  const filteredTasks = computed(() => {
    let result = tasks.value

    // Filter by status
    if (filterStatus.value === 'active') {
      result = result.filter((t) => !t.completed)
    } else if (filterStatus.value === 'completed') {
      result = result.filter((t) => t.completed)
    }

    // Filter by category
    if (filterCategory.value !== 'all') {
      result = result.filter((t) => t.category === filterCategory.value)
    }

    // Filter by priority
    if (filterPriority.value !== 'all') {
      result = result.filter((t) => t.priority === filterPriority.value)
    }

    // Sort: incomplete first, then by priority, then by date
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return [...result].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      if (a.priority !== b.priority) return priorityOrder[a.priority] - priorityOrder[b.priority]
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  })

  // Stats — also computed, so they auto-update
  const stats = computed(() => ({
    total: tasks.value.length,
    completed: tasks.value.filter((t) => t.completed).length,
    active: tasks.value.filter((t) => !t.completed).length,
  }))

  // ================================================
  // watch() — Side effects when data changes.
  // ================================================
  // Like useEffect() in React, but:
  // - You explicitly say WHAT to watch
  // - No cleanup function confusion
  // - It only runs when the watched value changes
  //
  // Here we save to localStorage whenever tasks change.
  // The { deep: true } option watches nested changes
  // (like toggling a task's completed property).
  // ================================================
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('vue-tasks', JSON.stringify(newTasks))
    },
    { deep: true },
  )

  // ---- Actions (plain functions that mutate state) ----

  function addTask(title: string, category: Task['category'], priority: Task['priority']) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    // Unlike React, you can mutate directly!
    // Vue's reactivity system detects the change.
    tasks.value.unshift(newTask)
  }

  function toggleTask(id: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed // Direct mutation — Vue detects this!
    }
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function clearCompleted() {
    tasks.value = tasks.value.filter((t) => !t.completed)
  }

  // ================================================
  // Return — What the composable exposes.
  // ================================================
  // Everything returned here can be used by any
  // component that calls useTaskManager().
  //
  // Refs are returned as-is (still reactive).
  // Functions are just regular functions.
  // Computed values are read-only refs.
  // ================================================
  return {
    // State (refs)
    tasks,
    filterStatus,
    filterCategory,
    filterPriority,

    // Derived state (computed)
    filteredTasks,
    stats,

    // Actions (functions)
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  }
}
