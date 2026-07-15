<template>
  <div class="grid grid-cols-12 h-full overflow-hidden min-h-0">
    <!-- Left Sidebar -->
    <div
      class="col-span-3 flex flex-col min-h-0 h-full border-r border-gray-200 dark:border-gray-800 bg-[#fcfcfc] dark:bg-gray-900"
    >
      <UDashboardToolbar class="border-b border-gray-200 dark:border-gray-800">
        <span class="font-semibold text-[15px] text-gray-900 dark:text-white"
          >Cài đặt ứng dụng</span
        >
      </UDashboardToolbar>

      <div class="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
        <div
          v-for="item in settingsItems"
          :key="item.to"
          class="flex items-start gap-4 px-4 py-3.5 hover:bg-gray-100/70 dark:hover:bg-gray-800/40 transition-colors cursor-pointer select-none rounded-2xl"
          :class="
            activeSetting === item.to ? 'bg-gray-100 dark:bg-gray-800' : ''
          "
          @click="activeSetting = item.to"
        >
          <UIcon
            :name="item.icon"
            class="w-[22px] h-[22px] shrink-0 mt-0.5"
            :class="
              activeSetting === item.to
                ? 'text-primary-500'
                : 'text-gray-500 dark:text-gray-400'
            "
          />
          <div class="flex flex-col">
            <span
              class="text-[15px] font-semibold"
              :class="
                activeSetting === item.to
                  ? 'text-primary-500'
                  : 'text-gray-900 dark:text-gray-100'
              "
            >
              {{ item.title }}
            </span>
            <span
              v-if="item.description"
              class="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 leading-[1.4]"
            >
              {{ item.description }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="col-span-9 h-full flex flex-col min-h-0 bg-white dark:bg-gray-950 relative"
    >
      <UDashboardToolbar class="border-b border-gray-200 dark:border-gray-800">
        <template #left>
          <div class="font-semibold text-[15px] text-gray-900 dark:text-white">
            {{ activeSettingItem?.title }}
          </div>
        </template>
        <template #right>
          <slot name="right"></slot>
        </template>
      </UDashboardToolbar>

      <div class="flex-1 overflow-y-auto p-8 bg-gray-50/20 dark:bg-gray-900/10">
        <div class="w-full">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const settingsItems = [
  {
    title: "Kết nối Facebook",
    description: "Quản lý kết nối Fanpage Facebook",
    icon: "i-simple-icons-facebook",
    to: "/admin/settings/facebook",
  },
  {
    title: "Chat Template",
    description: "Cài đặt mẫu tin nhắn trả lời nhanh",
    icon: "i-lucide-message-square-plus",
    to: "/admin/settings/chat-template",
  },
];
const activeSetting = ref(router.currentRoute.value.path);
const activeSettingItem = computed(() => {
  return settingsItems.find((item) => item.to === activeSetting.value);
});
watch(activeSetting, (newVal) => {
  navigateTo(newVal);
});
</script>

<style></style>
