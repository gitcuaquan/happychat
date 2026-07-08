<template>
  <UScrollArea ref="scrollArea" virtualize v-slot="{ item: msg }" :items="messages"
    class="flex-1 w-full h-full min-h-0 px-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors py-4">
    <ChatItem :message="msg" />
  </UScrollArea>
</template>

<script setup>
import { useTemplateRef, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  }
})

const scrollArea = useTemplateRef('scrollArea')

let scrollTimeout = null
const scrollToBottom = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout)

  nextTick(() => {
    scrollTimeout = setTimeout(() => {
      if (props.messages.length > 0) {
        scrollArea.value?.virtualizer?.scrollToIndex(props.messages.length - 1, { align: 'end' })
      }
    }, 50)
  })
}

let resizeObserver = null

onMounted(() => {
  scrollToBottom()

  // Track height changes on the scroll area container (e.g. when textarea grows)
  const el = scrollArea.value?.$el
  if (el) {
    resizeObserver = new ResizeObserver(() => {
      scrollToBottom()
    })
    resizeObserver.observe(el)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect()
})

// Auto scroll when new messages are pushed
watch(() => props.messages.length, () => {
  scrollToBottom()
}, { flush: 'post' })
</script>