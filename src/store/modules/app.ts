import { defineStore } from 'pinia'
import { pinia } from '../index'

interface AppState {
  ready: boolean
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      ready: false,
    }
  },
  actions: {
    // ssr期间初始化数据
    async initialize() {
      // console.log('init')

      this.ready = true
    },
  },
})

// Need to be used outside the setup
export function useAppStoreOut() {
  return useAppStore(pinia)
}
