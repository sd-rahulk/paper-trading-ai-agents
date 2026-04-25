<script setup>
import { LayoutDashboard, Zap, History, Settings, Play, Pause, Power } from 'lucide-vue-next'
import { useTradingStore } from './stores/trading'
import LoadingScreen from './components/LoadingScreen.vue'
import { Analytics } from '@vercel/analytics/vue'
import { onMounted, ref } from 'vue'

const store = useTradingStore()
const isInitialLoad = ref(true)

onMounted(async () => {
  await store.fetchAll()
  isInitialLoad.value = false
  setInterval(() => store.fetchAll(), 10000) // Auto refresh every 10s
})
</script>

<template>
  <Analytics />
  <LoadingScreen v-if="isInitialLoad" />
  
  <div v-else class="flex h-screen bg-dark-900 text-slate-200">
    <!-- Sidebar -->
    <aside class="w-64 bg-dark-800 border-r border-white/5 flex flex-col">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gradient">SimTrade AI</h1>
        <p class="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Autonomous Hedge Fund</p>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <router-link to="/" class="nav-link" active-class="nav-link-active">
          <LayoutDashboard :size="20" />
          <span>Dashboard</span>
        </router-link>
        <router-link to="/algorithms" class="nav-link" active-class="nav-link-active">
          <Zap :size="20" />
          <span>Algorithms</span>
        </router-link>
        <router-link to="/history" class="nav-link" active-class="nav-link-active">
          <History :size="20" />
          <span>History</span>
        </router-link>
        <router-link to="/settings" class="nav-link" active-class="nav-link-active">
          <Settings :size="20" />
          <span>Settings</span>
        </router-link>
      </nav>

      <div class="p-4 mt-auto">
        <div class="glass-card p-4 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400">System Status</span>
            <span class="flex items-center gap-1.5">
              <span :class="['w-2 h-2 rounded-full animate-pulse', store.systemStatus === 'RUNNING' ? 'bg-accent-success' : 'bg-accent-danger']"></span>
              <span class="text-xs font-bold">{{ store.systemStatus }}</span>
            </span>
          </div>
          <button 
            @click="store.toggleEngine"
            :class="['w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-bold text-sm', 
                    store.systemStatus === 'RUNNING' ? 'bg-accent-danger/20 text-accent-danger hover:bg-accent-danger/30' : 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20']"
          >
            <component :is="store.systemStatus === 'RUNNING' ? Pause : Play" :size="16" />
            {{ store.systemStatus === 'RUNNING' ? 'Pause Trading' : 'Run Bot Now' }}
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-dark-800 via-dark-900 to-dark-900">
      <header class="h-16 border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-sm sticky top-0 z-10">
        <h2 class="text-lg font-medium text-slate-400">{{ $route.name }}</h2>
        <div class="flex items-center gap-6">
          <div class="flex flex-col items-end">
            <span class="text-xs text-slate-500">Total Portfolio Value</span>
            <span class="font-bold text-white">₹{{ store.portfolio.total_value?.toLocaleString() }}</span>
          </div>
          <button class="p-2 hover:bg-dark-700 rounded-full text-accent-danger transition-colors border border-white/5" title="Emergency Stop">
            <Power :size="20" />
          </button>
        </div>
      </header>

      <div class="p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@config "../tailwind.config.js";

.nav-link {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white;
}

.nav-link-active {
  @apply bg-primary-500/10 text-primary-500 font-bold border border-primary-500/20;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
