<script setup>
import { useTradingStore } from '../stores/trading'
import { Save, RotateCcw, Shield, Gauge, Zap } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const store = useTradingStore()
const localConfig = ref({ ...store.config })

watch(() => store.config, (newVal) => {
  localConfig.ref = { ...newVal }
}, { deep: true })

const saveSettings = () => {
  store.updateConfig(localConfig.value)
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8 pb-12">
    <!-- Risk Profile Selection -->
    <div class="glass-card p-8">
      <h3 class="text-xl font-bold mb-6">Risk Profile</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          v-for="profile in ['Safe', 'Balanced', 'Aggressive']" 
          :key="profile"
          @click="localConfig.risk_profile = profile"
          :class="['p-6 rounded-2xl border transition-all text-left group', 
                  localConfig.risk_profile === profile ? 'bg-primary-500/10 border-primary-500' : 'bg-dark-700/30 border-white/5 hover:border-white/10']"
        >
          <div :class="['p-2 rounded-lg inline-block mb-4', 
                        profile === 'Safe' ? 'text-accent-success bg-accent-success/10' : 
                        profile === 'Balanced' ? 'text-primary-500 bg-primary-500/10' : 
                        'text-accent-danger bg-accent-danger/10']">
            <component :is="profile === 'Safe' ? Shield : profile === 'Balanced' ? Gauge : Zap" :size="24" />
          </div>
          <h4 class="font-bold mb-1">{{ profile }}</h4>
          <p class="text-xs text-slate-500">
            {{ profile === 'Safe' ? 'Prioritizes capital preservation and low volatility.' : 
               profile === 'Balanced' ? 'A mix of steady growth and moderate risk taking.' : 
               'High frequency trading with maximum exposure targets.' }}
          </p>
        </button>
      </div>
    </div>

    <!-- Quantitative Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="glass-card p-8 space-y-6">
        <h3 class="text-lg font-bold">Capital Management</h3>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Capital (₹)</label>
            <input type="number" v-model="localConfig.initial_capital" class="settings-input" />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Max Exposure Per Trade (%)</label>
            <input type="number" v-model="localConfig.max_exposure" step="0.01" class="settings-input" />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Max Open Trades</label>
            <input type="number" v-model="localConfig.max_trades" class="settings-input" />
          </div>
        </div>
      </div>

      <div class="glass-card p-8 space-y-6">
        <h3 class="text-lg font-bold">Trading Rules</h3>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Stop Loss (%)</label>
            <input type="number" v-model="localConfig.stop_loss_pct" step="0.001" class="settings-input" />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Take Profit (%)</label>
            <input type="number" v-model="localConfig.take_profit_pct" step="0.001" class="settings-input" />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Scan Frequency (min)</label>
            <input type="number" v-model="localConfig.scan_frequency" class="settings-input" />
          </div>
        </div>
      </div>

      <!-- Telegram Alerts -->
      <div class="glass-card p-8 space-y-6 md:col-span-2">
        <h3 class="text-lg font-bold">Telegram Notifications</h3>
        <p class="text-xs text-slate-500">Get real-time alerts on your phone whenever the AI executes a trade.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Bot Token</label>
            <input type="password" v-model="localConfig.telegram_token" placeholder="Enter your BotFather token" class="settings-input" />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Chat ID</label>
            <input type="text" v-model="localConfig.telegram_chat_id" placeholder="Enter your Telegram Chat ID" class="settings-input" />
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4 pt-4">
      <button class="px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-slate-400 hover:text-white transition-all">
        <RotateCcw :size="18" />
        Reset Defaults
      </button>
      <button @click="saveSettings" class="bg-primary-500 hover:bg-primary-600 text-white px-10 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-primary-500/20">
        <Save :size="18" />
        Save Configuration
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@config "../../tailwind.config.js";

.settings-input {
  @apply w-full bg-dark-700/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-all;
}
</style>
