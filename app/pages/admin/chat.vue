<template>
  <div class="grid grid-cols-12 h-full overflow-hidden min-h-0">
    <div class="col-span-2 flex flex-col min-h-0 h-full border-r border-gray-200 dark:border-gray-800">
      <UDashboardToolbar>
        <span class="font-semibold text-[15px] text-gray-900 dark:text-white">Đoạn chat</span>
      </UDashboardToolbar>
      <CustomerList :customers="customers" />
    </div>

    <div class="col-span-8 h-full flex flex-col min-h-0 bg-pink-50/50 dark:bg-pink-950/20 relative">
      <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.07] bg-repeat bg-[length:250px]"
        :style="{ backgroundImage: `url('${chatBackgroundImage}')` }">
      </div>

      <UDashboardToolbar
        class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm relative z-10 border-b border-gray-200 dark:border-gray-800">
        <template #left>
          <div class="flex items-center gap-2">
            <UAvatar src="https://api.dicebear.com/7.x/initials/svg?seed=Tuan Anh" />
            <span>Tuan Anh</span>
          </div>
        </template>
        <template #right>
          <UButton color="neutral">
            <UIcon name="i-lucide-phone-call" />
            Nhận chat
          </UButton>
        </template>
      </UDashboardToolbar>

      <div class="relative z-10 flex-1 min-h-0 flex flex-col">
        <ChatList :messages="messages" />
      </div>
      <div class="p-3 relative z-10  ">
        <div
          class="w-full flex items-end gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[24px] p-2 pr-2.5 shadow-sm focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">

          <div class="flex items-center gap-1 shrink-0  pl-1">
            <UButton color="neutral" variant="ghost" icon="i-lucide-plus" size="md"
              class="rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white" />
            <UButton color="neutral" variant="ghost" icon="i-lucide-image" size="md"
              class="rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white hidden sm:inline-flex" />
          </div>

          <UTextarea :maxrows="5" :rows="1" autoresize size="md" variant="none" placeholder="Nhập tin nhắn của bạn..."
            class="flex-1 focus:ring-0 bg-transparent placeholder:text-gray-400" />

          <div class="shrink-0 ">
            <UButton color="primary" variant="solid" icon="i-lucide-send" size="md"
              class="rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-transform hover:scale-105" />
          </div>

        </div>
      </div>
    </div>

    <div class="col-span-2 h-full border-l border-gray-200">
      <UDashboardToolbar>
        Hẹ
      </UDashboardToolbar>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// Cấu hình ảnh nền chat ở đây để dễ dàng thay đổi sau này
const chatBackgroundImage = '/images/background/cat-2.svg'

const customers = ref([
  { id: 1, name: 'Vương Tùng', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=VT', lastMessage: 'Nhà mình có xe 5 chỗ đi bduong k shop', time: '17:27', assignedTo: 'Thu Hiền' },
  { id: 2, name: 'Hoàng Nhân', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HN', lastMessage: 'Báo cho em giá để phụ thu và cầu đường xe 5 chỗ', time: '17:27', assignedTo: 'Thu Hiền' },
  { id: 3, name: 'Phụng Trần', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PT', lastMessage: 'tài xế sẽ chủ động liên hệ với mình nữa ạ', time: '17:21', assignedTo: 'Tạ Nga', isPrefix: 'Bạn', active: true },
  { id: 4, name: 'Bích Hiền', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BH', lastMessage: 'em có xe đi được 7 người giá 2.600k/2 chiều', time: '17:20', assignedTo: 'Tạ Nga', isPrefix: 'Bạn' },
  { id: 5, name: 'Thanh Tran', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TT', lastMessage: 'Cho hỏi xe 5c từ SGon đi Chợ Châu Pha (Phú Mỹ)', time: '17:17', assignedTo: 'Thu Hiền' },
  { id: 6, name: 'Toni Nguyễn', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TN', lastMessage: 'dạ', time: '17:15', assignedTo: 'Thu Hiền', isPrefix: 'Bạn' },
  { id: 7, name: 'Hg Hg', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HH', lastMessage: 'dạ xe 5c 1.270k/chiều, xe 7c 1.320k/chiều trị', time: '17:15', assignedTo: 'Tạ Nga', isPrefix: 'Bạn' },
])

const messages = ref([
  {
    id: '6045235a-a435-46b8-989d-2df38ca2eb47',
    role: 'customer',
    content: 'Xin chào',
    createdAt: '2026-07-08T10:00:00Z'
  },
  {
    id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8',
    role: 'support',
    content: 'I am doing well, thank you for asking! How can I assist you today?',
    createdAt: '2026-07-08T10:01:00Z'
  },
  {
    id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a',
    role: 'customer',
    content: 'What is the current weather in Tokyo?',
    createdAt: '2026-07-08T10:05:00Z'
  },
  {
    id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4',
    role: 'support',
    content: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies.",
    createdAt: '2026-07-08T10:06:00Z'
  },
  {
    id: 'customer-msg-1',
    role: 'customer',
    content: 'Awesome, thanks!',
    createdAt: '2026-07-08T10:07:05Z'
  },
  {
    id: 'customer-msg-2',
    role: 'customer',
    content: 'Do you know if it will rain later this evening?',
    createdAt: '2026-07-08T10:07:25Z'
  },
  {
    id: 'customer-msg-3',
    role: 'customer',
    content: 'I am planning to go out for dinner.',
    createdAt: '2026-07-08T10:07:45Z'
  },
  {
    id: 'customer-msg-4',
    role: 'customer',
    content: 'Maybe around Shibuya area?',
    createdAt: '2026-07-08T10:08:10Z'
  }
])

Array.from({ length: 100 }).forEach(i => {
  messages.value.push({
    id: 'customer-msg-' + i,
    role: 'customer',
    content: 'Xin chào',
    createdAt: '2026-07-08T10:00:00Z'
  })
  messages.value.push({
    id: 'support-msg-' + i,
    role: 'support',
    content: 'I am doing well, thank you for asking! How can I assist you today?',
    createdAt: '2026-07-08T10:01:00Z'
  })
})

</script>
