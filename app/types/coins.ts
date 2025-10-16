// Define a estrutura de um único usuário
export interface Coin {
    rank: number;
    id: number
    name: string;
    symbol: string;
    price_usd: string;
    market_cap_usd: string;
    percent_change_24h: string;
    percent_change_1h: string
    percent_change_7d: string
    price_btc: string
    volume24: number
    volume24a: number
    csupply: string
    tsupply: string
    msupply: string
    nameid: string
}

// Define a estrutura de todo o estado do store
export interface CoinState {
  coins: { data: Coin[] };
  isLoading: boolean;
  error: string | null;
}