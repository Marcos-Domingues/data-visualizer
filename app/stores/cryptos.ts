import { defineStore } from 'pinia'
import type { Coin } from '~/types/coins'

export const useCryptoStore = defineStore('crypto', () => {
    const coins = ref<Coin[]>([])
    const error = ref<string | null>(null)
    const isLoading = ref(false)

    async function fetchCoins(): Promise<void> {
      isLoading.value = true
      error.value = null
      const config = useRuntimeConfig()

      try {
        const { data } = await useFetch<{ data: Coin[] }>('/tickers/', {
          method: 'get',
          baseURL: config.public.apiBaseUrl
        })
        
        coins.value = data.value?.data || []
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
        error.value = errorMessage
        console.error('API Error:', err)
      } finally {
        isLoading.value = false
      }
    }


    const getCoinByIndex = (index: number): Coin | undefined => {
        return coins.value[index]
    }

  return { coins, isLoading, error, fetchCoins, getCoinByIndex }

})