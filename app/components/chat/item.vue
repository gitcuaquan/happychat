<template>
  <div class="flex gap-3 my-2" :class="[isMe ? 'flex-row-reverse' : '']">
    <UAvatar
      v-if="!isMe"
      :src="'https://api.dicebear.com/7.x/initials/svg?seed=Customer'"
      :alt="'Customer'" />
    <div class="flex flex-col max-w-[75%]" :class="[isMe ? 'items-end' : 'items-start']">
      <div class="px-4 py-2 text-[15px] shadow-sm leading-relaxed" :class="[
        isMe
          ? 'bg-primary-50 text-primary-900 border border-primary-200 dark:bg-primary-900/40 dark:text-primary-100 dark:border-primary-800 rounded-2xl rounded-tr-sm'
          : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-tl-sm'
      ]">
        <p class="whitespace-pre-wrap">{{ message.content }}</p>
      </div>
      <span v-if="message.createdAt" class="text-[11px] text-gray-400 mt-1 px-1">
        {{ formatTime(message.createdAt) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const isMe = computed(() => props.message.role === 'support')

const formatTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}
</script>