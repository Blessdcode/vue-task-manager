
<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '@/composables/useTaskManager'


const emit = defineEmits<{
  add: [title: string, category: Task['category'], priority: Task['priority']]
}>()


const title = ref('')
const category = ref<Task['category']>('personal')
const priority = ref<Task['priority']>('medium')

function handleSubmit() {
  if (!title.value.trim()) return

  
  emit('add', title.value, category.value, priority.value)


  title.value = ''
  category.value = 'personal'
  priority.value = 'medium'
}
</script>

<!--
  <template>
  ────────────────────────────────────────────────
  Vue uses HTML-like templates instead of JSX.
  Key differences from React/JSX:
  - v-model="ref" instead of value={state} + onChange
  - @submit instead of onSubmit
  - :class instead of className
  - v-for instead of .map()
  - v-if instead of {condition && <element>}
-->
<template>
  <!--
    @submit.prevent — Event listener + modifier.
    ─────────────────────────────────────────────
    @ is shorthand for v-on: (event listener)
    .prevent is a modifier that calls e.preventDefault()

    In React: <form onSubmit={(e) => { e.preventDefault(); ... }}>
    In Vue:   <form @submit.prevent="handleSubmit">
    Much cleaner!
  -->
  <form class="task-form" @submit.prevent="handleSubmit" id="task-form">
    <div class="form-row">
      <!--
        v-model — Two-way data binding.
        ─────────────────────────────────
        v-model="title" is equivalent to:
          :value="title"
          @input="title = $event.target.value"

        It binds the input's value TO the ref AND
        updates the ref when the user types. No need
        for separate onChange handlers!
      -->
      <input
        id="task-title-input"
        v-model="title"
        type="text"
        placeholder="What needs to be done?"
        class="task-input"
        autocomplete="off"
      />
      <button type="submit" class="add-btn" id="add-task-btn">
        <span class="btn-icon">+</span>
        <span class="btn-text">Add</span>
      </button>
    </div>

    <div class="form-options">
      <!-- v-model on <select> works the same way -->
      <div class="select-wrapper">
        <label for="category-select">📁</label>
        <select id="category-select" v-model="category" class="form-select">
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
        </select>
      </div>

      <div class="select-wrapper">
        <label for="priority-select">⚡</label>
        <select id="priority-select" v-model="priority" class="form-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  </form>
</template>

<!--
  <style scoped>
  ────────────────────────────────────────────────
  The "scoped" attribute means these styles ONLY
  apply to this component. Vue adds a unique
  data-attribute to each element and scopes the
  CSS to match.

  No more CSS Modules, styled-components, or
  worrying about class name collisions!
-->
<style scoped>
.task-form {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  transition: border-color var(--transition-normal);
}

.task-form:focus-within {
  border-color: var(--accent);
  box-shadow: var(--shadow-glow);
}

.form-row {
  display: flex;
  gap: var(--space-sm);
}

.task-input {
  flex: 1;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  color: var(--text-primary);
  font-size: 15px;
  font-family: var(--font-family);
  outline: none;
  transition: border-color var(--transition-fast);
}

.task-input::placeholder {
  color: var(--text-muted);
}

.task-input:focus {
  border-color: var(--accent);
}

.add-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background: var(--accent);
  color: var(--text-on-accent);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-family);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.add-btn:hover {
  background: var(--accent-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow);
}

.add-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 18px;
  line-height: 1;
}

.form-options {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

.select-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex: 1;
}

.select-wrapper label {
  font-size: 14px;
}

.form-select {
  flex: 1;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 6px var(--space-sm);
  color: var(--text-primary);
  font-size: 13px;
  font-family: var(--font-family);
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}

.form-select:focus {
  border-color: var(--accent);
}

.form-select option {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
</style>
