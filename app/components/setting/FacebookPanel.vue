<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Kết nối Facebook Fanpage
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Đồng bộ hóa các hội thoại tin nhắn (Messenger) và bình luận (Comments) từ nhiều trang Fanpage của bạn về HappyChat để quản lý tập trung.
        </p>
      </div>
      <UButton
        v-if="connectedPages.length > 0"
        color="primary"
        variant="outline"
        icon="i-lucide-plus"
        class="rounded-xl px-4 py-2 font-semibold shrink-0 cursor-pointer"
        :loading="isConnecting"
        @click="redirectToFacebook"
      >
        Kết nối thêm Fanpage
      </UButton>
    </div>

    <!-- Connected State: Grid of connected Pages -->
    <div
      v-if="connectedPages.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div
        v-for="page in connectedPages"
        :key="page.id"
        class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md hover:border-blue-500/20 dark:hover:border-blue-400/10 transition-all"
      >
        <!-- Page Info Header -->
        <div class="p-6 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between gap-3">
          <div class="flex items-center gap-4">
            <div class="relative">
              <UAvatar
                :src="getPageAvatar(page)"
                size="lg"
                class="rounded-full ring-2 ring-blue-500/10"
              />
              <div class="absolute -bottom-1 -right-1 bg-blue-600 rounded-full border-2 border-white dark:border-gray-900 w-5 h-5 flex items-center justify-center">
                <UIcon
                  name="i-simple-icons-facebook"
                  class="w-3 h-3 text-white shrink-0"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-900 dark:text-white leading-snug">
                {{ page.name }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {{ page.category }} • ID: {{ page.id }}
              </p>
              <div class="flex items-center gap-1.5 mt-1.5">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span class="text-[11px] font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Đang đồng bộ</span>
              </div>
            </div>
          </div>

          <UButton
            color="danger"
            variant="ghost"
            icon="i-lucide-trash-2"
            size="sm"
            class="rounded-xl cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20"
            @click="disconnectPage(page.id)"
          />
        </div>

        <!-- Page Sync Configurations -->
        <div class="p-6 bg-gray-50/30 dark:bg-gray-900/10 space-y-4">
          <!-- Toggle 1: Messenger -->
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-0.5 pr-4">
              <span class="text-xs font-semibold text-gray-900 dark:text-white">Đồng bộ tin nhắn (Messenger)</span>
              <span class="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">Nhận và phản hồi tin nhắn Messenger.</span>
            </div>
            <USwitch
              v-model="page.syncMessenger"
              @change="updateSyncSettings(page)"
            />
          </div>

          <USeparator />

          <!-- Toggle 2: Comments -->
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-0.5 pr-4">
              <span class="text-xs font-semibold text-gray-900 dark:text-white">Đồng bộ bình luận (Comments)</span>
              <span class="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">Tự động đẩy bình luận thành hội thoại chat.</span>
            </div>
            <USwitch
              v-model="page.syncComments"
              @change="updateSyncSettings(page)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Disconnected State -->
    <div
      v-else
      class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12"
    >
      <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
        <UIcon
          name="i-simple-icons-facebook"
          class="w-8 h-8 text-blue-600 dark:text-blue-400"
        />
      </div>
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Chưa kết nối Fanpage Facebook
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-8">
        Kết nối các trang Fanpage giúp bạn quản lý tin nhắn và bình luận trực tiếp của nhiều trang ngay trên HappyChat mà không cần mở nhiều tab.
      </p>

      <!-- Connect Button -->
      <UButton
        color="primary"
        size="lg"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2.5 flex items-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer"
        :loading="isConnecting"
        @click="redirectToFacebook"
      >
        <UIcon
          v-if="!isConnecting"
          name="i-simple-icons-facebook"
          class="w-5 h-5"
        />
        Kết nối với Facebook
      </UButton>

      <!-- Guidelines -->
      <div class="mt-12 text-left w-full border-t border-gray-100 dark:border-gray-800 pt-8">
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Các bước thực hiện
        </h4>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
              1
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Click vào nút <b>Kết nối với Facebook</b> phía trên.
            </p>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
              2
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Đăng nhập tài khoản Facebook có quyền quản trị các Fanpage của bạn.
            </p>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
              3
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Lựa chọn một hoặc nhiều trang Fanpage muốn đồng bộ và cấp quyền quản lý.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Connection Setup Modal (Simulating FB Page Selector) -->
    <UModal
      v-model:open="showConnectionModal"
      title="Kết nối Fanpage Facebook"
      description="Chọn các trang Facebook Fanpage bạn muốn đồng bộ tin nhắn về HappyChat."
      class="max-w-md"
    >
      <template #body>
        <div class="space-y-4 pt-2">
          <!-- Auth Info -->
          <div class="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <UAvatar
                src="https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=Felix"
                size="sm"
                class="rounded-full"
              />
              <div class="flex flex-col">
                <span class="text-xs font-semibold text-gray-900 dark:text-white">Tuan Anh</span>
                <span class="text-[10px] text-gray-500 dark:text-gray-400">Đăng nhập với vai trò Quản trị viên</span>
              </div>
            </div>
            <span class="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-semibold">Đổi tài khoản</span>
          </div>

          <!-- Page List -->
          <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
            <div
              v-if="availablePagesToConnect.length > 0"
              class="space-y-2"
            >
              <div
                v-for="page in availablePagesToConnect"
                :key="page.id"
                class="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer select-none transition-colors"
                @click="togglePageSelection(page)"
              >
                <div class="flex items-center gap-3">
                  <UAvatar
                    :src="getPageAvatar(page)"
                    size="md"
                    class="rounded-full"
                  />
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ page.name }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ page.category }}</span>
                  </div>
                </div>
                <UCheckbox
                  v-model="selectedPagesMap[page.id]"
                  @click.stop
                />
              </div>
            </div>
            <div
              v-else
              class="text-center py-6 text-sm text-gray-500 dark:text-gray-400"
            >
              Tất cả các Fanpage của bạn đã được kết nối.
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <UButton
          color="neutral"
          variant="outline"
          class="rounded-xl px-4 py-2 cursor-pointer"
          @click="showConnectionModal = false"
        >
          Hủy bỏ
        </UButton>
        <UButton
          color="primary"
          class="rounded-xl px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
          :disabled="selectedCount === 0"
          @click="confirmConnection"
        >
          Xác nhận kết nối ({{ selectedCount }})
        </UButton>
      </template>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { $api } = useNuxtApp()
const toast = useToast()

const showConnectionModal = ref(false)
const isConnecting = ref(false)
const connectedPages = ref([])
const availablePages = ref([])
const selectedPagesMap = ref({})

const availablePagesToConnect = computed(() => {
  return availablePages.value.filter(p => !connectedPages.value.some(cp => cp.platformChannelId === p.id))
})

const selectedCount = computed(() => {
  return Object.values(selectedPagesMap.value).filter(Boolean).length
})

let messageListener = null

const getPageAvatar = (page) => {
  if (page.avatarUrl) return page.avatarUrl
  if (page.avatar) return page.avatar
  if (page.picture?.data?.url) return page.picture.data.url
  if (page.picture && typeof page.picture === 'string') return page.picture
  const fbPageId = page.platformChannelId || page.id
  return `https://graph.facebook.com/${fbPageId}/picture?type=large`
}

// Lấy danh sách các trang đã được kết nối từ backend
const fetchConnectedPages = async () => {
  try {
    const pages = await $api.auth.getConnectedFacebookPages()
    if (pages && Array.isArray(pages)) {
      connectedPages.value = pages
    }
  } catch (error) {
    console.error('Không thể lấy danh sách Fanpage đã kết nối:', error)
    toast.add({
      title: 'Lỗi tải danh sách',
      description: 'Không thể kết nối đến máy chủ để lấy danh sách Fanpage.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  }
}

// Mở cửa sổ popup mới kết nối với Facebook
const redirectToFacebook = () => {
  const appId = config.public.facebookAppId
  if (!appId) {
    toast.add({
      title: 'Lỗi cấu hình',
      description: 'Vui lòng cấu hình NUXT_PUBLIC_FACEBOOK_APP_ID trong file .env ở thư mục root!',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    return
  }

  isConnecting.value = true

  const redirectUri = `${window.location.origin}/admin/app-settings`
  const scopes = [
    'pages_show_list',
    'pages_messaging',
    'pages_read_engagement',
    'pages_manage_metadata'
  ].join(',')

  const oauthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&response_type=code`

  // Tạo cửa sổ popup căn giữa màn hình
  const width = 600
  const height = 700
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  const popup = window.open(
    oauthUrl,
    'FacebookAuthPopup',
    `width=${width},height=${height},top=${top},left=${left},status=no,resizable=yes,scrollbars=yes`
  )

  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    isConnecting.value = false
    toast.add({
      title: 'Popup bị chặn',
      description: 'Trình duyệt đã chặn cửa sổ popup. Vui lòng cấp quyền mở popup cho trang web này.',
      color: 'warning',
      icon: 'i-lucide-alert-triangle'
    })
  }
}

const confirmConnection = async () => {
  const pagesToAdd = availablePagesToConnect.value.filter(p => selectedPagesMap.value[p.id])
  const pageIds = pagesToAdd.map(p => p.id)

  isConnecting.value = true

  try {
    // Đăng ký các fanpage đã chọn lên backend để nhận webhook tin nhắn
    await $api.auth.subscribeFacebookPages(pageIds)
    await fetchConnectedPages()
    toast.add({
      title: 'Kết nối thành công',
      description: `Đã kết nối thành công ${pagesToAdd.length} Fanpage.`,
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    showConnectionModal.value = false
  } catch (error) {
    console.error('Lỗi khi đăng ký Fanpage:', error)
    toast.add({
      title: 'Lỗi đăng ký Fanpage',
      description: 'Không thể kết nối với API backend để đăng ký Fanpage.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    isConnecting.value = false
  }
}

const disconnectPage = async (id) => {
  try {
    // Hủy đăng ký fanpage trên backend
    await $api.auth.disconnectFacebookPage(id)
    await fetchConnectedPages()
    toast.add({
      title: 'Hủy kết nối thành công',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
  } catch (error) {
    console.error('Lỗi khi hủy kết nối Fanpage:', error)
    toast.add({
      title: 'Lỗi hủy kết nối',
      description: 'Không thể hủy kết nối Fanpage qua API.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  }
}

const updateSyncSettings = async (page) => {
  try {
    await $api.auth.updateFacebookPageSettings(page.id, {
      syncMessenger: page.syncMessenger,
      syncComments: page.syncComments
    })
    toast.add({
      title: 'Đã cập nhật cài đặt',
      description: `Đã lưu cài đặt đồng bộ cho trang ${page.name}.`,
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
  } catch (error) {
    console.error('Lỗi khi cập nhật cài đặt Fanpage:', error)
    toast.add({
      title: 'Lỗi cập nhật',
      description: 'Không thể lưu cấu hình đồng bộ lên máy chủ.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    // Phục hồi lại trạng thái cũ từ DB nếu lỗi
    await fetchConnectedPages()
  }
}

const togglePageSelection = (page) => {
  selectedPagesMap.value[page.id] = !selectedPagesMap.value[page.id]
}

const handleFacebookAuth = async (code) => {
  isConnecting.value = true
  try {
    const redirectUri = `${window.location.origin}/admin/app-settings`

    // 1. Gửi Authorization code lên backend
    const response = await $api.auth.connectFacebook(code, redirectUri)
    console.log('Facebook Login Success response:', response)

    // 2. Lấy danh sách các trang khả dụng từ backend
    try {
      const pages = await $api.auth.getFacebookPages()
      if (pages && Array.isArray(pages)) {
        availablePages.value = pages
      } else {
        availablePages.value = []
      }
    } catch (err) {
      console.error('Không thể lấy danh sách trang từ backend:', err)
      availablePages.value = []
      throw err
    }

    // Mở modal chọn Trang
    selectedPagesMap.value = {}
    availablePagesToConnect.value.forEach((p) => {
      selectedPagesMap.value[p.id] = false
    })
    showConnectionModal.value = true
  } catch (error) {
    console.error('Lỗi khi kết nối Facebook API:', error)
    toast.add({
      title: 'Kết nối Facebook thất bại',
      description: 'Không thể kết nối tài khoản Facebook với backend API.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    isConnecting.value = false
  }
}

onMounted(() => {
  // Lấy các trang đã kết nối từ trước
  fetchConnectedPages()

  // 1. Lắng nghe tin nhắn gửi về từ popup (khi chạy ở cửa sổ cha)
  messageListener = (event) => {
    if (event.origin !== window.location.origin) return
    if (event.data && event.data.type === 'facebook-auth') {
      const code = event.data.code
      if (code) {
        handleFacebookAuth(code)
      }
    }
  }
  window.addEventListener('message', messageListener)

  // 2. Nếu route có code (được chạy bên trong cửa sổ popup sau khi Facebook redirect về)
  if (route.query.code) {
    if (window.opener) {
      // Gửi code về cửa sổ cha và đóng cửa sổ popup
      window.opener.postMessage(
        { type: 'facebook-auth', code: route.query.code },
        window.location.origin
      )
      window.close()
    } else {
      // Trường hợp người dùng mở link trực tiếp (fallback)
      handleFacebookAuth(route.query.code)
      router.replace({ query: { ...route.query, code: undefined } })
    }
  }
})

onBeforeUnmount(() => {
  if (messageListener) {
    window.removeEventListener('message', messageListener)
  }
})
</script>
