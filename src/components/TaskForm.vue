
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


<template>

  <form class="task-form" @submit.prevent="handleSubmit" id="task-form">
    <div class="form-row">
    
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
