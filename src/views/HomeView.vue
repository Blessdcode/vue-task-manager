
<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import TaskStats from '@/components/TaskStats.vue'
import { useTaskManager } from '@/composables/useTaskManager'


const {
  filterStatus,
  filterCategory,
  filterPriority,
  filteredTasks,
  stats,
  addTask,
  toggleTask,
  deleteTask,
  clearCompleted,
} = useTaskManager()
</script>

<template>
  <div class="task-manager">
    <!-- Header -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">
          <span class="title-icon">✅</span>
          Task Manager
        </h1>
        <p class="app-subtitle">Stay organized. Get things done.</p>
      </div>
    </header>

    <!-- Stats bar (receives computed stats as props) -->
    <TaskStats :stats="stats" />

 
    <TaskForm @add="addTask" />


    <TaskFilter
      v-model:status="filterStatus"
      v-model:category="filterCategory"
      v-model:priority="filterPriority"
    />

    <!-- Task list -->
    <div class="task-list" id="task-list">
      <!--
        <TransitionGroup> — Animating list changes.
        ──────────────────────────────────────────────
        Vue has BUILT-IN animation support! TransitionGroup
        automatically applies CSS classes when items are:
        - Added (list-enter-from → list-enter-active)
        - Removed (list-leave-active → list-leave-to)
        - Moved (list-move)

        We defined these CSS classes in main.css.
        React has no built-in equivalent — you'd need
        Framer Motion or React Transition Group.

        The tag="div" prop specifies the wrapper element
        to render. name="list" corresponds to our CSS
        class prefix (list-enter-from, etc).
      -->
      <TransitionGroup name="list" tag="div" class="task-items">
        <!--
          v-for with components + events.
          ─────────────────────────────────
          We loop through filteredTasks (a computed ref)
          and render a TaskItem for each one.

          :task="task" passes the task object as a prop
          @toggle="toggleTask" listens for the toggle event
          @delete="deleteTask" listens for the delete event
          :key="task.id" is required for Vue's diffing algorithm
        -->
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle="toggleTask"
          @delete="deleteTask"
        />
      </TransitionGroup>

      <!--
        v-if / v-else — Conditional branches.
        ───────────────────────────────────────
        v-if="condition" renders block A
        v-else renders block B (must be the next sibling)

        You can also chain: v-if → v-else-if → v-else

        In React: {condition ? <A /> : <B />}
        In Vue: <A v-if="condition" /><B v-else />
      -->
      <div v-if="filteredTasks.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <p class="empty-text" v-if="stats.total === 0">No tasks yet. Add one above!</p>
        <p class="empty-text" v-else>No tasks match your filters.</p>
      </div>
    </div>

    <!-- Footer -->
    <footer v-if="stats.completed > 0" class="task-footer">
      <button class="clear-btn" @click="clearCompleted" id="clear-completed-btn">
        🗑️ Clear {{ stats.completed }} completed task{{ stats.completed === 1 ? '' : 's' }}
      </button>
    </footer>
  </div>
</template>

<style scoped>
.task-manager {
  padding-bottom: var(--space-2xl);
}

/* ---- Header ---- */
.app-header {
  text-align: center;
  margin-bottom: var(--space-xl);
  padding: var(--space-xl) 0 var(--space-lg);
}

.app-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.title-icon {
  font-size: 36px;
}

.app-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: var(--space-xs);
}

/* ---- Task list ---- */
.task-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

/* ---- Empty state ---- */
.empty-state {
  text-align: center;
  padding: var(--space-2xl) var(--space-lg);
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: var(--space-md);
}

.empty-text {
  font-size: 15px;
}

/* ---- Footer ---- */
.task-footer {
  display: flex;
  justify-content: center;
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-color);
}

.clear-btn {
  background: var(--color-danger-soft);
  color: var(--color-danger);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font-family);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.clear-btn:hover {
  background: var(--color-danger);
  color: white;
  transform: translateY(-1px);
}
</style>
