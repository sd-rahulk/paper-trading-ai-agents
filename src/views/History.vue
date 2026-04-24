<script setup>
import { useTradingStore } from '../stores/trading'
import { Download, FileSpreadsheet, Calendar, Search } from 'lucide-vue-next'

const store = useTradingStore()

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString()
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <div class="relative w-96">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" :size="18" />
        <input 
          type="text" 
          placeholder="Search by symbol or strategy..." 
          class="w-full bg-dark-800 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-500 transition-all"
        />
      </div>
      <div class="flex gap-4">
        <button class="glass-card px-4 py-2 flex items-center gap-2 text-sm font-medium hover:bg-dark-700 transition-all">
          <Calendar :size="18" />
          Last 30 Days
        </button>
        <button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-primary-500/20">
          <FileSpreadsheet :size="18" />
          Export CSV
        </button>
      </div>
    </div>

    <div class="glass-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-dark-700/30 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 font-semibold">Symbol</th>
              <th class="px-6 py-4 font-semibold">Type</th>
              <th class="px-6 py-4 font-semibold">Quantity</th>
              <th class="px-6 py-4 font-semibold">Entry Price</th>
              <th class="px-6 py-4 font-semibold">Exit Price</th>
              <th class="px-6 py-4 font-semibold">PnL (₹)</th>
              <th class="px-6 py-4 font-semibold">Exit Time</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="trade in store.history" :key="trade.id" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 font-bold text-white">{{ trade.symbol }}</td>
              <td class="px-6 py-4">
                <span class="text-xs font-bold px-2 py-1 rounded bg-accent-danger/10 text-accent-danger">SELL</span>
              </td>
              <td class="px-6 py-4 text-slate-300">{{ trade.quantity }}</td>
              <td class="px-6 py-4 text-slate-300">₹{{ trade.price?.toLocaleString() }}</td>
              <td class="px-6 py-4 text-slate-300">₹{{ trade.exit_price?.toLocaleString() }}</td>
              <td class="px-6 py-4">
                <span :class="['font-bold', trade.pnl >= 0 ? 'text-accent-success' : 'text-accent-danger']">
                  {{ trade.pnl >= 0 ? '+' : '' }}₹{{ trade.pnl?.toLocaleString() }}
                </span>
              </td>
              <td class="px-6 py-4 text-slate-500 text-xs font-mono">{{ formatDate(trade.exit_timestamp) }}</td>
            </tr>
            <tr v-if="store.history.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500 italic">No trade history found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
