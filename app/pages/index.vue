<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div class="container mx-auto p-4">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Cryptocurrency Coins
        </h1>
        <p class="text-gray-600 text-lg">Acompanhe as principais criptomoedas em tempo real</p>
      </div>

      <LoadingSpinner
        v-if="store.isLoading"
        message="Carregando dados das criptomoedas..."
      />

      <div v-else-if="store.error" class="text-red-500 text-center py-8">
        <p>Erro ao carregar dados: {{ error }}</p>
      </div>

    <div v-else-if="store.coins" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-blue-600 to-purple-600">
          <tr>
            <th
              v-for="header in tableHeader"
              :key="header"
              class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-50">
          <tr
            v-for="(coin, index) in store.coins"
            :key="coin.id"
            class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 cursor-pointer transform hover:scale-[1.01] hover:shadow-md"
            @click="handleDetails(index)"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="rank-badge w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {{ coin.rank }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <CryptoIcons :coin="coin.symbol" />
                <div>
                  <div class="text-sm font-semibold text-gray-900">{{ coin.name }}</div>
                  <div class="text-xs text-gray-500">{{ coin.symbol }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {{ coin.symbol }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              ${{ formatPrice(coin.price_usd) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              ${{ formatMarketCap(coin.market_cap_usd) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                :class="
                  parseFloat(coin.percent_change_24h) >= 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
              >
                <svg
                  class="trend-icon w-3 h-3 mr-1"
                  :class="parseFloat(coin.percent_change_24h) >= 0 ? 'text-green-600' : 'text-red-600'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    :d="parseFloat(coin.percent_change_24h) >= 0
                      ? 'M5 10l3-3m0 0l3 3m-3-3v12'
                      : 'M5 14l3 3m0 0l3-3m-3 3V4'"
                  />
                </svg>
                {{ coin.percent_change_24h }}%
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script setup>
const store = useCryptoStore();
await store.fetchCoins();

const tableHeader = [
  "Rank",
  "Nome",
  "Símbolo",
  "Preço (USD)",
  "Market Cap",
  "24h (%)",
];

const handleDetails = (index) => {
  navigateTo(`/details/${index}`);
};

const formatPrice = (price) => {
  if (!price) return "0.00";
  const num = parseFloat(price);
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
};

const formatMarketCap = (marketCap) => {
  if (!marketCap) return "0";
  const num = parseFloat(marketCap);
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  }
  return num.toLocaleString("pt-BR");
};
</script>

<style scoped>
/* Animações suaves para hover */
tr {
  transition: all 0.2s ease-in-out;
}

/* Efeito de brilho no hover */
tr:hover {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Gradiente animado no cabeçalho */
thead {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Badge do rank com efeito */
.rank-badge {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.rank-badge:hover {
  transform: scale(1.1);
}

/* Ícones de tendência */
.trend-icon {
  transition: transform 0.2s ease;
}

tr:hover .trend-icon {
  transform: translateY(-2px);
}
</style>
