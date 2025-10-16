<template>
  <section class="container">
    <div v-if="data" class="crypto-card">
      <header class="card-header">
        <h2 class="coin-name">{{ data.name }} ({{ data.symbol }})</h2>
        <span class="rank-badge">#{{ data.rank }}</span>
      </header>

      <section class="main-price">
        <p class="price-usd">${{ formatNumber(data.price_usd) }}</p>

        <p
          :class="[
            'change-24h',
            isPositive(data.percent_change_24h) ? 'positive' : 'negative',
          ]"
        >
          {{ data.percent_change_24h }}%
          <span class="icon">
            {{ isPositive(data.percent_change_24h) ? "▲" : "▼" }}
          </span>
        </p>
      </section>

      <section class="metrics-grid">
        <div class="metric-item">
          <span class="label">Cap. de Mercado</span>
          <span class="value">${{ formatCompact(data.market_cap_usd) }}</span>
        </div>
        <div class="metric-item">
          <span class="label">Volume 24h</span>
          <span class="value">${{ formatCompact(data.volume24) }}</span>
        </div>
        <div class="metric-item">
          <span class="label">Suprimento Circulante</span>
          <span class="value"
            >{{ formatCompact(data.csupply) }}
            <span>{{ data.symbol }}</span></span
          >
        </div>
      </section>

      <section class="trend-metrics">
        <div class="trend-item">
          <span class="label">Última Hora</span>
          <span
            :class="
              isPositive(data.percent_change_1h) ? 'positive' : 'negative'
            "
          >
            {{ data.percent_change_1h }}%
          </span>
        </div>
        <div class="trend-item">
          <span class="label">Últimos 7 Dias</span>
          <span
            :class="
              isPositive(data.percent_change_7d) ? 'positive' : 'negative'
            "
          >
            {{ data.percent_change_7d }}%
          </span>
        </div>
      </section>
    </div>
    <div v-else>
      <p>Moeda não encontrada.</p>
    </div>
    <button class="btn" @click="handleGoToHome">Voltar</button>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useCryptoStore } from "../../stores/cryptos";
import { useRoute } from "vue-router";
import type { Coin } from "../../types/coins";

const route = useRoute();
const store = useCryptoStore();
const data = ref<Coin>();

const index = Number(route.params.id);
data.value = store.getCoinByIndex(index);

const handleGoToHome = () => {
  window.location.href = '/';
}

const formatCompact = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-US", { style: "decimal" }).format(num);
};

// 2. Formata o preço principal com separador de milhares e casas decimais
const formatNumber = (value: string): string => {
  const num = parseFloat(value);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

// 3. Verifica se a variação percentual é positiva ou negativa
const isPositive = (percent: string): boolean => {
  return parseFloat(percent) >= 0;
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}
.btn {
      padding: 10px;
    border: 1px solid #000;
    border-radius: 8px;
    margin-top: 30px;
}
.crypto-card {
  background: #2b2b2b; /* Fundo escuro */
  color: #f0f0f0; /* Texto claro */
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
  font-family: "Inter", sans-serif;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444;
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.coin-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #f7931a; /* Cor do Bitcoin */
}

.rank-badge {
  background-color: #444;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.main-price {
  text-align: center;
  margin-bottom: 30px;
}

.price-usd {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  margin: 0;
}

.change-24h {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 5px;
}

.positive {
  color: #16c784; /* Verde */
}

.negative {
  color: #ea3943; /* Vermelho */
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding-bottom: 25px;
  border-bottom: 1px solid #444;
  margin-bottom: 25px;
}

.metric-item .label {
  display: block;
  font-size: 0.8rem;
  color: #aaa;
  margin-bottom: 4px;
}

.metric-item .value {
  font-size: 1rem;
  font-weight: 600;
}

.trend-metrics {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.trend-item {
  flex-basis: 48%;
  padding: 10px;
  border-radius: 6px;
  background-color: #383838;
}

.trend-item .label {
  font-size: 0.85rem;
  color: #aaa;
  display: block;
  margin-bottom: 5px;
}
</style>
