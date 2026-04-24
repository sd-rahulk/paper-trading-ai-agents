<script setup>
import { Cpu } from 'lucide-vue-next'
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-900">
    <!-- Animated background pulses -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-success/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 1s"></div>
    </div>

    <div class="relative flex flex-col items-center">
      <!-- Orbiting Loader -->
      <div class="relative w-24 h-24 mb-8">
        <div class="absolute inset-0 border-4 border-white/5 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center text-primary-500">
          <Cpu :size="32" class="animate-pulse" />
        </div>
      </div>

      <h1 class="text-3xl font-bold text-gradient mb-2 tracking-tight">SimTrade AI</h1>
      <p class="text-slate-500 text-sm font-medium uppercase tracking-[0.3em] animate-pulse">Synchronizing Neural Engine</p>
      
      <div class="mt-8 w-48 h-1 bg-dark-700 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-primary-500 to-accent-success w-full origin-left animate-loading-bar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading-bar {
  0% { transform: scaleX(0); }
  50% { transform: scaleX(0.7); }
  100% { transform: scaleX(1); }
}

.animate-loading-bar {
  animation: loading-bar 2s infinite ease-in-out;
}
</style>
