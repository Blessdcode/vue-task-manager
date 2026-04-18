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
 
  const tasks = ref<Task[]>(loadTasks())
  const filterStatus = ref<FilterStatus>('all')
  const filterCategory = ref<FilterCategory>('all')
  const filterPriority = ref<FilterPriority>('all')

  
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
