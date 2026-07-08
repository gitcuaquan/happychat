<template>
  <svg :width="width" :height="height" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="12" width="488" height="488" rx="100" fill="none" stroke="#ff6900" stroke-width="24" />
    <path
      d="M160 190C160 173.431 173.431 160 190 160H322C338.569 160 352 173.431 352 190V280C352 296.569 338.569 310 322 310H230L160 360V190Z"
      fill="#ff6900" />
    <circle cx="225" cy="220" r="12" fill="white" />
    <circle cx="287" cy="220" r="12" fill="white" />
    <path d="M225 255C225 255 240 265 256 265C272 265 287 255 287 255" stroke="white" stroke-width="10"
      stroke-linecap="round" />
  </svg>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  width?: string | number
  height?: string | number
}>(), {
  width: 512,
  height: 512
})
</script>

<style></style>