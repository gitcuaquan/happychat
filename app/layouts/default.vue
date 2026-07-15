<template>
  <div class="flex h-screen bg-white dark:bg-gray-950">
    <!-- Thin Sidebar (WhatsApp Style) -->
    <aside
      class="w-[68px] flex flex-col items-center py-5 bg-[#fcfcfc] dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shrink-0"
    >
      <!-- Top Logo -->
      <div class="mb-6">
        <AppLogo
          :width="40"
          :height="40"
        />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 flex flex-col items-center gap-3 w-full px-2">
        <UTooltip
          v-for="link in topLinks"
          :key="link.to"
          :text="link.label"
          :content="{ side: 'right' }"
        >
          <UButton
            :to="link.to"
            :icon="link.icon"
            color="neutral"
            variant="ghost"
            class="w-11 h-11 flex items-center justify-center rounded-xl transition-all text-primary-400 hover:text-primary-900 hover:bg-primary-100 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-800"
            active-class="bg-primary-200 text-primary-900 dark:bg-primary-800 dark:text-white"
            :ui="{ icon: { size: 'size-6' } }"
          />
        </UTooltip>
      </nav>

      <!-- Footer -->
      <div class="mt-auto px-2 w-full flex flex-col items-center gap-4">
        <UTooltip
          text="Gallery"
          :content="{ side: 'right' }"
        >
          <UButton
            icon="i-lucide-image"
            color="neutral"
            variant="ghost"
            class="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800 transition-all"
            :ui="{ icon: { size: 'size-6' } }"
          />
        </UTooltip>
        <UTooltip
          text="Profile"
          :content="{ side: 'right' }"
        >
          <div
            class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center cursor-pointer text-primary-500 hover:ring-2 hover:ring-primary-300 transition-all"
            @click="isProfileOpen = true"
          >
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

    <!-- Profile Slideover -->
    <USlideover
      v-model:open="isProfileOpen"
      side="left"
      inset
      :dismissible="false"
    >
      <template #header="{ close }">
        <div class="flex justify-between items-center w-full">
          <span class="font-semibold text-gray-900 dark:text-white text-[17px]">Cài Đặt người dùng</span>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="outline"
            @click="close"
          />
        </div>
      </template>

      <template #body>
        <div class="flex flex-col h-full bg-white dark:bg-gray-950 overflow-y-auto">
          <!-- Top Avatar Section -->
          <div class="flex flex-col items-center justify-center pt-8 pb-6 relative">
            <div class="relative flex flex-col items-center">
              <div
                class="w-24 h-24 bg-[#c2e7ff] dark:bg-blue-900/40 rounded-full flex items-center justify-center relative z-0"
              >
                <UIcon
                  name="i-lucide-user"
                  class="w-12 h-12 text-[#004a77] dark:text-blue-300"
                />
              </div>
            </div>
          </div>

          <!-- List Items -->
          <div class="flex flex-col py-2 px-2 mt-auto">
            <div
              v-for="item in profileItems"
              :key="item.title"
              class="flex items-start gap-4 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer select-none rounded-2xl"
              @click="handleProfileItemClick(item)"
            >
              <UIcon
                :name="item.icon"
                class="w-[22px] h-[22px] shrink-0 mt-0.5"
                :class="item.danger ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'"
              />
              <div class="flex flex-col">
                <span
                  class="text-[15px]"
                  :class="item.danger ? 'text-red-600 font-medium' : 'text-gray-900 dark:text-gray-100 font-medium'"
                >{{
                  item.title }}</span>
                <span
                  v-if="item.description"
                  class="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 leading-[1.4]"
                >{{ item.description
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { $api } = useNuxtApp()
const isProfileOpen = ref(false)

const handleProfileItemClick = async (item) => {
  if (item.title === 'Đăng xuất') {
    try {
      await $api.auth.logout()
    } catch (e) {
      console.error('Lỗi đăng xuất API:', e)
    }
    const token = useCookie('happy_chat_token')
    token.value = null
    isProfileOpen.value = false
    await navigateTo('/auth/login')
  }
}

const profileItems = [
  {
    title: 'Trang cá nhân',
    description: 'Tên, ảnh đại diện, tên người dùng',
    icon: 'i-lucide-circle-user'
  },
  {
    title: 'Tài khoản',
    description: 'Thông báo bảo mật, thông tin tài khoản',
    icon: 'i-lucide-key'
  },
  {
    title: 'Quyền riêng tư',
    description: 'Người liên hệ đã chặn, tin nhắn tự hủy',
    icon: 'i-lucide-lock'
  },
  {
    title: 'Đoạn chat',
    description: 'Chủ đề, hình nền, cài đặt chat',
    icon: 'i-lucide-message-square'
  },
  {
    title: 'Thông báo',
    description: 'Tin nhắn, nhóm, âm thanh',
    icon: 'i-lucide-bell'
  },
  {
    title: 'Phím tắt',
    description: 'Hành động nhanh',
    icon: 'i-lucide-keyboard'
  },
  {
    title: 'Trợ giúp và ý kiến đóng góp',
    description: 'Trung tâm trợ giúp, liên hệ với chúng tôi, chính sách quyền riêng tư',
    icon: 'i-lucide-help-circle'
  },
  {
    title: 'Đăng xuất',
    icon: 'i-lucide-log-out',
    danger: true
  }
]

const topLinks = [
  { label: 'Chat', to: '/admin/chat', icon: 'i-lucide-message-circle' },
  { label: 'Bình Luận', to: '/admin/comments', icon: 'i-lucide-messages-square' },
  { label: 'Khách Hàng', to: '/admin/customers', icon: 'i-lucide-users' },
  { label: 'Đơn Hàng', to: '/admin/orders', icon: 'i-lucide-shopping-bag' },
  { label: 'Cài Đặt', to: '/admin/settings/facebook', icon: 'i-lucide-settings' }
]
</script>
