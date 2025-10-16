<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Cryptocurrency Coins</h1>
    
    <LoadingSpinner v-if="pending" message="Carregando dados das criptomoedas..." />
    
    <div v-else-if="error" class="text-red-500 text-center py-8">
      <p>Erro ao carregar dados: {{ error }}</p>
    </div>
    
    <div v-else-if="data?.data" class="overflow-x-auto shadow-lg rounded-lg">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th v-for="header in tableHeader" :key="header" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{{ header }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="coin in data.data" :key="coin.id" class="hover:bg-gray-50 transition-colors cursor-pointer">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ coin.rank }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                <CryptoIcons :coin="coin.symbol" />
              {{ coin.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
              {{ coin.symbol }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${{ formatPrice(coin.price_usd) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${{ formatMarketCap(coin.market_cap_usd) }}
            </td>
            <td 
            class="px-6 py-4 whitespace-nowrap text-sm font-semibold"
                :class="parseFloat(coin.percent_change_24h) >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ coin.percent_change_24h }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

const config = useRuntimeConfig()

const { data, pending, error } = await useFetch('/tickers/', {
    method: 'get',
    baseURL: config.public.apiBaseUrl
})

const tableHeader = ['Rank', 'Nome', 'Símbolo', 'Preço (USD)', 'Market Cap', '24h (%)']

const formatPrice = (price) => {
  if (!price) return '0.00'
  const num = parseFloat(price)
  return num.toLocaleString('pt-BR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 6 
  })
}

const formatMarketCap = (marketCap) => {
  if (!marketCap) return '0'
  const num = parseFloat(marketCap)
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B'
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M'
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K'
  }
  return num.toLocaleString('pt-BR')
}
</script>