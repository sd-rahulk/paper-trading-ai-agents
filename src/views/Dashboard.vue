<script setup>
import { useTradingStore } from '../stores/trading'
import { Wallet, TrendingUp, Percent, Activity, Cpu, Clock, MousePointer2, CheckCircle2, AlertCircle } from 'lucide-vue-next'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

import { computed } from 'vue'

const store = useTradingStore()

const chartData = computed(() => {
  const history = [...store.portfolioHistory].reverse()
  return {
    labels: history.map(h => new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    datasets: [{
      label: 'Portfolio Value',
      data: history.map(h => h.total_value),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#64748b' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } }
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="glass-card p-6 glass-card-hover group">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-slate-400 text-sm font-medium">Portfolio Value</p>
            <h3 class="text-2xl font-bold mt-1">₹{{ store.portfolio.total_value?.toLocaleString() }}</h3>
          </div>
          <div class="p-3 bg-primary-500/10 rounded-xl text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
            <Wallet :size="24" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs">
          <span class="text-accent-success font-bold">+2.4%</span>
          <span class="text-slate-500">from last scan</span>
        </div>
      </div>

      <div class="glass-card p-6 glass-card-hover group">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-slate-400 text-sm font-medium">Profit / Loss</p>
            <h3 :class="['text-2xl font-bold mt-1', store.portfolio.total_pnl >= 0 ? 'text-accent-success' : 'text-accent-danger']">
              ₹{{ store.portfolio.total_pnl?.toLocaleString() }}
            </h3>
          </div>
          <div class="p-3 bg-accent-success/10 rounded-xl text-accent-success group-hover:bg-accent-success group-hover:text-white transition-all">
            <TrendingUp :size="24" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs">
          <span class="text-slate-500">Win Rate:</span>
          <span class="text-white font-bold">{{ store.portfolio.win_rate }}%</span>
        </div>
      </div>

      <div class="glass-card p-6 glass-card-hover group">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-slate-400 text-sm font-medium">Active Positions</p>
            <h3 class="text-2xl font-bold mt-1">{{ store.positions.length }}</h3>
          </div>
          <div class="p-3 bg-accent-warning/10 rounded-xl text-accent-warning group-hover:bg-accent-warning group-hover:text-white transition-all">
            <Activity :size="24" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs">
          <span class="text-slate-500">Max Allowed:</span>
          <span class="text-white font-bold">{{ store.config.max_trades }}</span>
        </div>
      </div>

      <div class="glass-card p-6 glass-card-hover group">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-slate-400 text-sm font-medium">AI Confidence</p>
            <h3 class="text-2xl font-bold mt-1">88%</h3>
          </div>
          <div class="p-3 bg-primary-500/10 rounded-xl text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
            <Cpu :size="24" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs">
          <span class="text-accent-success font-bold">Stable</span>
          <span class="text-slate-500">Inference Engine</span>
        </div>
      </div>
    </div>

    <!-- Charts and Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Growth Chart -->
      <div class="lg:col-span-2 glass-card p-6 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold">Portfolio Growth</h3>
          <div class="flex gap-2">
            <button class="px-3 py-1 bg-dark-700 rounded-lg text-xs font-medium hover:bg-dark-600 transition-colors">1D</button>
            <button class="px-3 py-1 bg-primary-500 text-white rounded-lg text-xs font-medium">1W</button>
            <button class="px-3 py-1 bg-dark-700 rounded-lg text-xs font-medium hover:bg-dark-600 transition-colors">1M</button>
          </div>
        </div>
        <div class="flex-1 h-64 relative">
          <Line v-if="store.portfolioHistory.length > 1" :data="chartData" :options="chartOptions" />
          <div v-else class="absolute inset-0 flex flex-col items-center justify-center bg-white/5 rounded-xl border border-dashed border-white/10">
            <History :size="32" class="text-slate-700 mb-2 animate-pulse" />
            <p class="text-slate-500 text-sm font-medium">Collecting initial market data...</p>
            <p class="text-slate-600 text-[10px] mt-1 italic">The first line will appear in a few minutes.</p>
          </div>
        </div>
      </div>

      <!-- Agent Status -->
      <div class="glass-card p-6">
        <h3 class="text-lg font-bold mb-6">Agent Status</h3>
        <div class="space-y-6">
          <div v-for="agent in ['Market Scanner', 'Analyst Agent', 'Risk Engine', 'Execution Engine']" :key="agent" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-accent-success"></div>
              <span class="text-sm font-medium text-slate-300">{{ agent }}</span>
            </div>
            <span class="text-xs text-accent-success bg-accent-success/10 px-2 py-0.5 rounded-full font-bold uppercase">Healthy</span>
          </div>
          <div class="pt-6 border-t border-white/5 space-y-4">
             <div class="flex justify-between text-xs">
               <span class="text-slate-500">Inferences / Sec</span>
               <span class="text-white font-mono">{{ store.systemMetrics.inferences_per_second }}</span>
             </div>
             <div class="flex justify-between text-xs">
               <span class="text-slate-500">System Latency</span>
               <span class="text-white font-mono">{{ store.systemMetrics.latency }}</span>
             </div>
             <div class="flex justify-between text-xs">
               <span class="text-slate-500">Active Threads</span>
               <span class="text-white font-mono">16</span>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Holdings -->
    <div class="glass-card overflow-hidden">
      <div class="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 class="text-lg font-bold">Current Holdings</h3>
        <button class="text-primary-500 text-sm font-bold hover:underline">View All Positions</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-dark-700/30 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 font-semibold">Symbol</th>
              <th class="px-6 py-4 font-semibold">Action</th>
              <th class="px-6 py-4 font-semibold">Quantity</th>
              <th class="px-6 py-4 font-semibold">Entry Price</th>
              <th class="px-6 py-4 font-semibold">Current Price</th>
              <th class="px-6 py-4 font-semibold">PnL (%)</th>
              <th class="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="pos in store.positions" :key="pos.id" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4 font-bold text-white">{{ pos.symbol }}</td>
              <td class="px-6 py-4">
                <span class="text-xs font-bold px-2 py-1 rounded bg-primary-500/10 text-primary-500">{{ pos.action }}</span>
              </td>
              <td class="px-6 py-4 text-slate-300">{{ pos.quantity }}</td>
              <td class="px-6 py-4 text-slate-300">₹{{ pos.price?.toLocaleString() }}</td>
              <td class="px-6 py-4 text-slate-300">₹{{ (pos.price * 1.02).toLocaleString() }}</td>
              <td class="px-6 py-4">
                <span :class="['text-sm font-bold', pos.pnl >= 0 ? 'text-accent-success' : 'text-accent-danger']">+2.4%</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-1.5 text-accent-success">
                  <CheckCircle2 :size="14" />
                  <span class="text-xs font-bold">MONITORED</span>
                </div>
              </td>
            </tr>
            <tr v-if="store.positions.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500 italic">No active positions. The AI is scanning the market...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
