
<script setup lang="ts">

defineProps<{
  stats: {
    total: number
    completed: number
    active: number
  }
}>()
</script>

<template>
 
  <div class="stats-bar" id="task-stats">
    <div class="stat-card">
      <span class="stat-number">{{ stats.total }}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat-card stat-active">
      <span class="stat-number">{{ stats.active }}</span>
      <span class="stat-label">Active</span>
    </div>
    <div class="stat-card stat-completed">
      <span class="stat-number">{{ stats.completed }}</span>
      <span class="stat-label">Done</span>
    </div>
   
    <div v-if="stats.completed > 0" class="stat-card stat-progress">
      <span class="stat-number">{{ Math.round((stats.completed / stats.total) * 100) }}%</span>
      <span class="stat-label">Progress</span>
      <div class="progress-bar">
      
        <div
          class="progress-fill"
          :style="{ width: `${(stats.completed / stats.total) * 100}%` }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2px;
}

.stat-active .stat-number {
  color: var(--accent-light);
}

.stat-completed .stat-number {
  color: var(--color-success);
}

.stat-progress .stat-number {
  color: var(--color-warning);
  font-size: 22px;
}

/* ---- Progress bar ---- */
.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--bg-input);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--color-success));
  border-radius: 0 var(--radius-full) var(--radius-full) 0;
  transition: width var(--transition-slow);
}
</style>
