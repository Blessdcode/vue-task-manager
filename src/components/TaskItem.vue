

<script setup lang="ts">
import type { Task } from '@/composables/useTaskManager'

/*
  defineProps — Receiving data from parent.
  ──────────────────────────────────────────────
  In React:
    function TaskItem({ task }: { task: Task }) { ... }

  In Vue:
    defineProps<{ task: Task }>()

  Props are reactive — when the parent's data changes,
  this component automatically re-renders.

  ⚠️ KEY RULE: Props are READ-ONLY. You cannot modify
  them directly. To change data, emit an event and let
  the parent handle it. (Same principle as React.)
*/
defineProps<{
  task: Task
}>()

/*
  defineEmits — Events this component can send.
  ──────────────────────────────────────────────────
  We emit 'toggle' and 'delete' with the task ID,
  and the parent decides what to do with it.
*/
const emit = defineEmits<{
  toggle: [id: string]
  delete: [id: string]
}>()

// Map categories to emoji icons
const categoryIcons: Record<Task['category'], string> = {
  personal: '👤',
  work: '💼',
  shopping: '🛒',
  health: '💪',
}

// Format dates nicely
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}
</script>

<template>
  <!--
    :class — Dynamic class binding.
    ─────────────────────────────────
    The : prefix (shorthand for v-bind:) makes the
    attribute dynamic. Here we're using an object syntax:

    :class="{ 'class-name': condition }"

    If condition is true, the class is added.
    If false, it's removed.

    In React: className={`task-item ${task.completed ? 'completed' : ''}`}
    In Vue:   :class="{ completed: task.completed }"
    Much cleaner!
  -->
  <div class="task-item" :class="{ completed: task.completed }" :id="`task-${task.id}`">
    <div class="task-content">
      <!--
        @click — Event handling.
        ─────────────────────────
        @ is shorthand for v-on:
        We emit the 'toggle' event with the task's ID.

        In React: onClick={() => onToggle(task.id)}
        In Vue:   @click="emit('toggle', task.id)"
      -->
      <button
        class="check-btn"
        :class="{ checked: task.completed }"
        @click="emit('toggle', task.id)"
        :id="`toggle-${task.id}`"
        :aria-label="task.completed ? 'Mark as incomplete' : 'Mark as complete'"
      >
        <span v-if="task.completed" class="check-icon">✓</span>
      </button>

      <div class="task-info">
        <span class="task-title">{{ task.title }}</span>
        <div class="task-meta">
          <span class="task-category">
            {{ categoryIcons[task.category] }} {{ task.category }}
          </span>
          <!--
            Dynamic class with template literal pattern.
            We use the priority value to pick the right CSS class.
          -->
          <span class="task-priority" :class="`priority-${task.priority}`">
            {{ task.priority }}
          </span>
          <span class="task-date">{{ formatDate(task.createdAt) }}</span>
        </div>
      </div>
    </div>

    <button
      class="delete-btn"
      @click="emit('delete', task.id)"
      :id="`delete-${task.id}`"
      aria-label="Delete task"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  transition: all var(--transition-normal);
  gap: var(--space-sm);
}

.task-item:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* When task is completed, dim it */
.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: var(--text-muted);
}

.task-content {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1;
  min-width: 0;
}

/* ---- Checkbox button ---- */
.check-btn {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: var(--radius-full);
  border: 2px solid var(--text-muted);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  padding: 0;
}

.check-btn:hover {
  border-color: var(--accent);
}

.check-btn.checked {
  background: var(--accent);
  border-color: var(--accent);
}

.check-icon {
  color: white;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}

/* ---- Task info ---- */
.task-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.task-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all var(--transition-normal);
}

.task-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 12px;
  color: var(--text-secondary);
}

.task-category {
  text-transform: capitalize;
}

.task-priority {
  padding: 1px 8px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.priority-low {
  background: var(--priority-low-soft);
  color: var(--priority-low);
}

.priority-medium {
  background: var(--priority-medium-soft);
  color: var(--priority-medium);
}

.priority-high {
  background: var(--priority-high-soft);
  color: var(--priority-high);
}

.task-date {
  color: var(--text-muted);
}

/* ---- Delete button ---- */
.delete-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 14px;
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--radius-sm);
  opacity: 0;
  transition: all var(--transition-fast);
  line-height: 1;
}

.task-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: var(--color-danger);
  background: var(--color-danger-soft);
}
</style>
