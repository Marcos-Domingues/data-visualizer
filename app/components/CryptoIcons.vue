<script setup>
const props = defineProps({
  coin: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div
    class="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center"
  >
    <span class="text-xs font-bold text-gray-600">{{
      props.coin.charAt(0)
    }}</span>
  </div>
</template>
