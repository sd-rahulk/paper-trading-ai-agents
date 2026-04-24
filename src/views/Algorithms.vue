<script setup>
import { useTradingStore } from '../stores/trading'
import { Brain, BarChart3, Target, ShieldCheck, Zap } from 'lucide-vue-next'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useTradingStore()

const weightData = {
  labels: ['Trend', 'Momentum', 'Risk', 'Reward'],
  datasets: [{
    label: 'Agent Weights',
    data: [
      store.weights.trend_weight * 100, 
      store.weights.momentum_weight * 100, 
      store.weights.risk_weight * 100, 
      store.weights.reward_weight * 100
    ],
    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    borderRadius: 8
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#64748b' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' }, max: 100 }
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Weight Management -->
      <div class="glass-card p-6">
        <div class="flex items-center gap-3 mb-8">
          <div class="p-2 bg-primary-500/10 rounded-lg text-primary-500">
            <Brain :size="24" />
          </div>
          <div>
            <h3 class="text-lg font-bold">Neural Weighting</h3>
            <p class="text-xs text-slate-500">Real-time agent priority distribution</p>
          </div>
        </div>
        
        <div class="h-64 mb-8">
          <Bar :data="weightData" :options="chartOptions" />
        </div>

        <div class="space-y-4">
          <div v-for="(val, key) in store.weights" :key="key" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400 capitalize">{{ key.replace('_', ' ') }}</span>
              <span class="text-white font-bold">{{ (val * 100).toFixed(0) }}%</span>
            </div>
            <div class="h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <div class="h-full bg-primary-500 transition-all duration-500" :style="{ width: val * 100 + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategy Performance -->
      <div class="glass-card p-6">
        <div class="flex items-center gap-3 mb-8">
          <div class="p-2 bg-accent-success/10 rounded-lg text-accent-success">
            <Zap :size="24" />
          </div>
          <div>
            <h3 class="text-lg font-bold">Strategy Metrics</h3>
            <p class="text-xs text-slate-500">Internal AI performance evaluation</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-dark-700/30 p-4 rounded-xl border border-white/5">
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Trend Accuracy</p>
            <h4 class="text-xl font-bold mt-1 text-accent-success">92.4%</h4>
          </div>
          <div class="bg-dark-700/30 p-4 rounded-xl border border-white/5">
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Regime Detection</p>
            <h4 class="text-xl font-bold mt-1 text-primary-500">Trending</h4>
          </div>
          <div class="bg-dark-700/30 p-4 rounded-xl border border-white/5">
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Avg. Confidence</p>
            <h4 class="text-xl font-bold mt-1 text-white">0.78</h4>
          </div>
          <div class="bg-dark-700/30 p-4 rounded-xl border border-white/5">
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Execution Latency</p>
            <h4 class="text-xl font-bold mt-1 text-white">120ms</h4>
          </div>
        </div>

        <div class="mt-8 space-y-6">
           <div class="flex items-start gap-4">
             <div class="mt-1 p-2 bg-primary-500/10 rounded-full text-primary-500">
               <Target :size="16" />
             </div>
             <div>
               <h4 class="text-sm font-bold">Price Prediction Engine</h4>
               <p class="text-xs text-slate-500 mt-1">LSTM-based time series prediction active with 85% confidence interval.</p>
             </div>
           </div>
           <div class="flex items-start gap-4">
             <div class="mt-1 p-2 bg-accent-success/10 rounded-full text-accent-success">
               <ShieldCheck :size="16" />
             </div>
             <div>
               <h4 class="text-sm font-bold">Risk Exposure Guard</h4>
               <p class="text-xs text-slate-500 mt-1">Real-time volatility monitoring preventing overexposure in high-beta stocks.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
