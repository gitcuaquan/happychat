<template>
  <div 
    class="relative flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800/50"
    :class="{ 'bg-gray-100 dark:bg-gray-800': active }"
  >
    <!-- Right Border Indicator for Active -->
    <div v-if="active" class="absolute right-0 top-0 bottom-0 w-[3px] bg-primary rounded-l-md"></div>

    <div class="relative shrink-0 mt-0.5">
      <UAvatar :src="customer.avatar" :alt="customer.name" size="lg" />
      <!-- Messenger badge -->
      <div class="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-gray-900 rounded-full p-[1.5px]">
        <img src="/images/platfrom/messenger.svg" alt="Messenger" class="w-[14px] h-[14px]" />
      </div>
    </div>
    
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-baseline mb-0.5">
        <h4 class="text-[14px] font-semibold text-gray-900 dark:text-white truncate pr-2">{{ customer.name }}</h4>
        <span class="text-[11px] text-gray-500 whitespace-nowrap">{{ customer.time }}</span>
      </div>
      
      <p class="text-[13px] text-gray-500 dark:text-gray-400 truncate mb-1">
        <span v-if="customer.isPrefix" class="text-gray-900 dark:text-gray-300">{{ customer.isPrefix }}: </span>
        {{ customer.lastMessage }}
      </p>
      
      <div class="flex justify-end items-center gap-1 text-[11px] text-primary-600 dark:text-primary-400">
        <UIcon name="i-lucide-message-square-text" class="w-3 h-3" />
        <span class="font-medium">{{ customer.assignedTo }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  customer: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>
