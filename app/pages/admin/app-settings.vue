<template>
  <div class="grid grid-cols-12 h-full overflow-hidden min-h-0">
    <!-- Left Sidebar -->
    <div class="col-span-2 flex flex-col min-h-0 h-full border-r border-gray-200 dark:border-gray-800 bg-[#fcfcfc] dark:bg-gray-900">
      <UDashboardToolbar>
        <span class="font-semibold text-[15px] text-gray-900 dark:text-white">Cài đặt ứng dụng</span>
      </UDashboardToolbar>
      <div class="flex-1 overflow-y-auto p-2">
        <UNavigationMenu :items="settingsMenu" orientation="vertical" />
      </div>
    </div>

    <!-- Main Content -->
    <div class="col-span-10 h-full flex flex-col min-h-0 bg-white dark:bg-gray-950 relative">
      <UDashboardToolbar class="border-b border-gray-200 dark:border-gray-800">
        <template #left>
          <div class="font-semibold text-[15px] text-gray-900 dark:text-white">Chi tiết cài đặt</div>
        </template>
      </UDashboardToolbar>
      
      <div class="flex-1 overflow-y-auto p-8">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Cài Đặt Chung</h1>
          <div class="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <p class="text-gray-500 dark:text-gray-400">Quản lý các cài đặt chung của ứng dụng tại đây.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const settingsMenu = [
  { label: 'Cài đặt chung', icon: 'i-lucide-settings', to: '/admin/app-settings', active: true },
  { label: 'Giao diện', icon: 'i-lucide-palette' },
  { label: 'Thông báo', icon: 'i-lucide-bell' },
  { label: 'Tài khoản', icon: 'i-lucide-user' },
]

useHead({
  title: 'Cài Đặt Ứng Dụng - Quản trị'
})
</script>
