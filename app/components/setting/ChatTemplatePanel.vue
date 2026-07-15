<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Mẫu tin nhắn trả lời nhanh</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Tạo sẵn câu trả lời để nhân viên chăm sóc khách hàng phản hồi nhanh bằng cách gõ ký tự `/` trong màn hình chat.
        </p>
      </div>
      <UButton
        color="primary"
        icon="i-lucide-plus"
        class="rounded-xl px-4 py-2 font-semibold shrink-0 cursor-pointer"
        @click="openAddModal"
      >
        Thêm mẫu mới
      </UButton>
    </div>

    <!-- Search Filter -->
    <div class="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-1 flex items-center shadow-sm">
      <UIcon name="i-lucide-search" class="w-5 h-5 text-gray-400 ml-3 shrink-0" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm mẫu tin nhắn (bằng phím tắt)..."
        class="flex-1 bg-transparent border-0 outline-none px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-0"
      />
      <UButton
        v-if="searchQuery"
        color="neutral"
        variant="ghost"
        icon="i-lucide-x"
        size="sm"
        class="rounded-full mr-1 cursor-pointer"
        @click="searchQuery = ''"
      />
    </div>

    <!-- Templates Grid -->
    <div v-if="filteredTemplates.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="tmpl in filteredTemplates" :key="tmpl.id"
        class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md hover:border-primary-500/30 dark:hover:border-primary-400/20 transition-all flex flex-col justify-between group">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900/50 px-2.5 py-1 rounded-lg">
              {{ tmpl.shortcut }}
            </span>
            
            <!-- Actions Menu -->
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-edit-2"
                size="xs"
                class="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                @click="openEditModal(tmpl)"
              />
              <UButton
                color="danger"
                variant="ghost"
                icon="i-lucide-trash-2"
                size="xs"
                class="rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                @click="deleteTemplate(tmpl.id)"
              />
            </div>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
            {{ tmpl.content }}
          </p>
        </div>
        
        <!-- Mobile Quick Actions -->
        <div class="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 md:hidden">
          <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-edit-2"
            size="sm"
            class="rounded-lg px-2.5 py-1 cursor-pointer"
            @click="openEditModal(tmpl)"
          >
            Sửa
          </UButton>
          <UButton
            color="danger"
            variant="outline"
            icon="i-lucide-trash-2"
            size="sm"
            class="rounded-lg px-2.5 py-1 cursor-pointer"
            @click="deleteTemplate(tmpl.id)"
          >
            Xóa
          </UButton>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col items-center justify-center text-center py-12">
      <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <UIcon name="i-lucide-message-square" class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1">
        {{ searchQuery ? 'Không tìm thấy mẫu tin nhắn nào' : 'Chưa có mẫu tin nhắn nào' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {{ searchQuery ? 'Thử tìm kiếm với từ khóa hoặc phím tắt khác.' : 'Tạo sẵn câu trả lời để tiết kiệm thời gian phản hồi cho khách hàng.' }}
      </p>
      <UButton
        v-if="!searchQuery"
        color="primary"
        icon="i-lucide-plus"
        class="rounded-xl px-4 py-2 font-semibold cursor-pointer"
        @click="openAddModal"
      >
        Thêm mẫu đầu tiên
      </UButton>
    </div>

    <!-- Add/Edit Modal (using UModal) -->
    <UModal v-model:open="isModalOpen" :title="editingTemplate ? 'Sửa mẫu tin nhắn' : 'Thêm mẫu tin nhắn mới'" description="Tạo phím tắt nhanh để chèn tin nhắn này trong khung chat." class="max-w-md">
      <template #body>
        <div class="space-y-4 pt-2">
          <UFormField label="Phím tắt nhanh (Shortcut)" required :error="formErrors.shortcut" hint="Phải bắt đầu bằng dấu / và không có dấu cách">
            <UInput
              v-model="templateForm.shortcut"
              placeholder="/xin-chao"
              class="w-full"
              :ui="{ input: 'font-mono' }"
            />
          </UFormField>

          <UFormField label="Nội dung tin nhắn" required :error="formErrors.content">
            <UTextarea
              v-model="templateForm.content"
              placeholder="Nội dung sẽ hiển thị khi gửi..."
              :rows="4"
              class="w-full"
            />
          </UFormField>
        </div>
      </template>
      
      <template #footer>
        <UButton
          color="neutral"
          variant="outline"
          class="rounded-xl px-4 py-2 cursor-pointer"
          @click="isModalOpen = false"
        >
          Hủy
        </UButton>
        <UButton
          color="primary"
          class="rounded-xl px-4 py-2 cursor-pointer"
          @click="saveTemplate"
        >
          Lưu thay đổi
        </UButton>
      </template>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const isModalOpen = ref(false)
const editingTemplate = ref(null)

const templates = ref([
  { id: 1, shortcut: '/xin-chao', content: 'Dạ, HappyChat xin chào anh/chị ạ! Em có thể hỗ trợ gì cho anh/chị hôm nay ạ?' },
  { id: 2, shortcut: '/gia-xe', content: 'Dạ xe 5 chỗ đi Vũng Tàu giá 1.200k (đã bao gồm phí cầu đường), xe 7 chỗ giá 1.400k ạ.' },
  { id: 3, shortcut: '/lien-he', content: 'Anh/chị vui lòng liên hệ Hotline/Zalo: 0987.654.321 để đặt xe nhanh nhất nhé.' }
])

const templateForm = ref({
  shortcut: '',
  content: ''
})

const formErrors = ref({
  shortcut: '',
  content: ''
})

const filteredTemplates = computed(() => {
  if (!searchQuery.value) return templates.value
  const query = searchQuery.value.toLowerCase()
  return templates.value.filter(tmpl => tmpl.shortcut.toLowerCase().includes(query))
})

const openAddModal = () => {
  editingTemplate.value = null
  templateForm.value = {
    shortcut: '/',
    content: ''
  }
  formErrors.value = {
    shortcut: '',
    content: ''
  }
  isModalOpen.value = true
}

const openEditModal = (tmpl) => {
  editingTemplate.value = tmpl
  templateForm.value = {
    shortcut: tmpl.shortcut,
    content: tmpl.content
  }
  formErrors.value = {
    shortcut: '',
    content: ''
  }
  isModalOpen.value = true
}

const saveTemplate = () => {
  formErrors.value = { shortcut: '', content: '' }
  let hasError = false

  let shortcut = templateForm.value.shortcut.trim()
  if (!shortcut) {
    formErrors.value.shortcut = 'Vui lòng nhập phím tắt'
    hasError = true
  } else if (!shortcut.startsWith('/')) {
    formErrors.value.shortcut = 'Phím tắt phải bắt đầu bằng ký tự /'
    hasError = true
  } else if (/\s/.test(shortcut)) {
    formErrors.value.shortcut = 'Phím tắt không được chứa khoảng trắng'
    hasError = true
  }

  const content = templateForm.value.content.trim()
  if (!content) {
    formErrors.value.content = 'Vui lòng nhập nội dung tin nhắn'
    hasError = true
  }

  if (hasError) return

  if (editingTemplate.value) {
    // Edit existing
    const idx = templates.value.findIndex(t => t.id === editingTemplate.value.id)
    if (idx !== -1) {
      templates.value[idx] = {
        ...templates.value[idx],
        shortcut,
        content
      }
    }
  } else {
    // Create new
    const newId = templates.value.length > 0 ? Math.max(...templates.value.map(t => t.id)) + 1 : 1
    templates.value.push({
      id: newId,
      shortcut,
      content
    })
  }

  isModalOpen.value = false
}

const deleteTemplate = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa mẫu tin nhắn này?')) {
    templates.value = templates.value.filter(t => t.id !== id)
  }
}
</script>
