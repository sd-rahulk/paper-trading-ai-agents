import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://ai-agents-python-stockmarket-e456tgvbn.onrender.com/api'

export const useTradingStore = defineStore('trading', {
  state: () => ({
    systemStatus: 'PAUSED',
    portfolio: {
      cash_balance: 100000,
      total_value: 100000,
      total_pnl: 0,
      win_rate: 0,
      active_positions_count: 0
    },
    positions: [],
    history: [],
    config: {},
    weights: {
      trend_weight: 0.3,
      momentum_weight: 0.4,
      risk_weight: 0.15,
      reward_weight: 0.15
    },
    systemMetrics: {
        uptime: '99.9%',
        latency: '45ms',
        inferences_per_second: 12.5
    },
    portfolioHistory: [],
    loading: false
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const [status, portfolio, positions, tradeHistory, config, weights, portfolioHistoryData] = await Promise.all([
          axios.get(`${API_URL}/system`),
          axios.get(`${API_URL}/portfolio`),
          axios.get(`${API_URL}/positions`),
          axios.get(`${API_URL}/history`),
          axios.get(`${API_URL}/config`),
          axios.get(`${API_URL}/weights`),
          axios.get(`${API_URL}/portfolio/history`)
        ])
        
        this.systemStatus = status.data.status
        this.systemMetrics = status.data
        this.portfolio = portfolio.data
        this.positions = positions.data
        this.history = tradeHistory.data
        this.config = config.data
        this.weights = weights.data
        this.portfolioHistory = portfolioHistoryData.data
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false
      }
    },
    async toggleEngine() {
      try {
        if (this.systemStatus === 'PAUSED') {
          await axios.post(`${API_URL}/run`)
          this.systemStatus = 'RUNNING'
        } else {
          await axios.post(`${API_URL}/pause`)
          this.systemStatus = 'PAUSED'
        }
      } catch (error) {
        console.error('Error toggling engine:', error)
      }
    },
    async updateConfig(newConfig) {
      try {
        const response = await axios.post(`${API_URL}/config`, newConfig)
        this.config = response.data
      } catch (error) {
        console.error('Error updating config:', error)
      }
    }
  }
})
