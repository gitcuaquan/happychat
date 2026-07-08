<template>
  <div class="flex h-screen bg-white dark:bg-gray-950">
    <!-- Thin Sidebar (WhatsApp Style) -->
    <aside
      class="w-[68px] flex flex-col items-center py-5 bg-[#fcfcfc] dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shrink-0">

      <!-- Top Logo -->
      <div class="mb-6">
        <AppLogo :width="40" :height="40" />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 flex flex-col items-center gap-3 w-full px-2">
        <UTooltip v-for="link in topLinks" :key="link.to" :text="link.label" :content="{ side: 'right' }">
          <UButton :to="link.to" :icon="link.icon" color="neutral" variant="ghost"
            class="w-11 h-11 flex items-center justify-center rounded-xl transition-all text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-800"
            active-class="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
            :ui="{ icon: { size: 'size-6' } }" />
        </UTooltip>

      </nav>

      <!-- Footer -->
      <div class="mt-auto px-2 w-full flex flex-col items-center gap-4">
        <UTooltip text="Gallery" :content="{ side: 'right' }">
          <UButton icon="i-lucide-image" color="neutral" variant="ghost"
            class="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800 transition-all"
            :ui="{ icon: { size: 'size-6' } }" />
        </UTooltip>
        <UTooltip text="Profile" :content="{ side: 'right' }">
          <div
            class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center cursor-pointer text-primary-500 hover:ring-2 hover:ring-primary-300 transition-all">
            <UAvatar src="https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=Felix" />
          </div>
        </UTooltip>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 min-w-0 overflow-auto bg-white dark:bg-gray-950">
      <div class="h-full">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const topLinks = [
  { label: 'Chat', to: '/admin/chat', icon: 'i-lucide-message-circle' },
  { label: 'Bình Luận', to: '/admin/comments', icon: 'i-lucide-messages-square' },
  { label: 'Khách Hàng', to: '/admin/customers', icon: 'i-lucide-users' },
  { label: 'Đơn Hàng', to: '/admin/orders', icon: 'i-lucide-shopping-bag' },
]
</script>
