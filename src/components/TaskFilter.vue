
<script setup lang="ts">
import type { FilterStatus, FilterCategory, FilterPriority } from '@/composables/useTaskManager'

/*
  defineModel() — Two-way prop binding (Vue 3.4+).
  ──────────────────────────────────────────────────
  This is a newer Vue feature that simplifies the
  common pattern of "prop down, event up."

  Without defineModel, you'd need:
    const props = defineProps(['status'])
    const emit = defineEmits(['update:status'])
    // then: emit('update:status', newValue)

  With defineModel:
    const status = defineModel<FilterStatus>('status')
    // then: status.value = newValue  ← that's it!

  The parent uses it like:
    <TaskFilter v-model:status="filterStatus" />

  It's like having useState that syncs with the parent!
*/
const status = defineModel<FilterStatus>('status', { required: true })
const category = defineModel<FilterCategory>('category', { required: true })
const priority = defineModel<FilterPriority>('priority', { required: true })

// Filter options — we'll loop over these with v-for
const statusOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
]

const categoryOptions: { value: FilterCategory; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '📋' },
  { value: 'personal', label: 'Personal', icon: '👤' },
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'shopping', label: 'Shopping', icon: '🛒' },
  { value: 'health', label: 'Health', icon: '💪' },
]

const priorityOptions: { value: FilterPriority; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Med' },
  { value: 'low', label: 'Low' },
]
</script>

<template>
  <div class="task-filter" id="task-filters">
    <!-- Status filter -->
    <div class="filter-group">
      <span class="filter-label">Status</span>
      <div class="filter-pills">
        <!--
          v-for — Rendering a list.
          ─────────────────────────
          In React:  {options.map(opt => <button key={opt.value}>...)}
          In Vue:    <button v-for="opt in options" :key="opt.value">...

          :key is REQUIRED when using v-for (just like React).
          It helps Vue track which elements changed.

          The @click sets the model's value, which
          automatically syncs back to the parent.
        -->
        <button
          v-for="opt in statusOptions"
          :key="opt.value"
          class="filter-pill"
          :class="{ active: status === opt.value }"
          @click="status = opt.value"
          :id="`filter-status-${opt.value}`"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Category filter -->
    <div class="filter-group">
      <span class="filter-label">Category</span>
      <div class="filter-pills">
        <button
          v-for="opt in categoryOptions"
          :key="opt.value"
          class="filter-pill"
          :class="{ active: category === opt.value }"
          @click="category = opt.value"
          :id="`filter-category-${opt.value}`"
        >
          <span class="pill-icon">{{ opt.icon }}</span>
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Priority filter -->
    <div class="filter-group">
      <span class="filter-label">Priority</span>
      <div class="filter-pills">
        <button
          v-for="opt in priorityOptions"
          :key="opt.value"
          class="filter-pill"
          :class="{
            active: priority === opt.value,
            [`pill-${opt.value}`]: opt.value !== 'all',
          }"
          @click="priority = opt.value"
          :id="`filter-priority-${opt.value}`"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-pills {
  display: flex;
  gap: 4px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 3px;
  border: 1px solid var(--border-color);
}

.filter-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-family);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.filter-pill:hover {
  color: var(--text-primary);
  background: var(--bg-card-hover);
}

/* Active pill state */
.filter-pill.active {
  background: var(--accent-soft);
  color: var(--accent-light);
}

/* Priority-specific active colors */
.filter-pill.active.pill-high {
  background: var(--priority-high-soft);
  color: var(--priority-high);
}

.filter-pill.active.pill-medium {
  background: var(--priority-medium-soft);
  color: var(--priority-medium);
}

.filter-pill.active.pill-low {
  background: var(--priority-low-soft);
  color: var(--priority-low);
}

.pill-icon {
  font-size: 13px;
}

/* On small screens, stack filters vertically */
@media (max-width: 600px) {
  .task-filter {
    flex-direction: column;
  }

  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
