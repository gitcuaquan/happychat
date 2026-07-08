<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import { z } from 'zod'

definePageMeta({
  layout: 'blank',
})


const { $api } = useNuxtApp()
const toast = useToast()

const schema = z.object({
  username: z.string({ message: 'Tài khoản không được để trống' })
    .min(1, 'Tài khoản không được để trống')
    .min(6, 'Tài khoản phải có ít nhất 6 ký tự')
    .max(32, 'Tài khoản không được vượt quá 32 ký tự')
    .regex(/^[a-zA-Z0-9]+$/, 'Tài khoản chỉ được chứa chữ cái và số'),
  password: z.string({ message: 'Mật khẩu không được để trống' })
    .min(1, 'Mật khẩu không được để trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(32, 'Mật khẩu không được vượt quá 32 ký tự')
})

const state = reactive({
  username: '',
  password: ''
})

const isLoading = ref(false)
const showPassword = ref(false)

async function onSubmit(event: FormSubmitEvent<any>) {
  isLoading.value = true

  try {
    const result = await $api.auth.login(event.data)

    toast.add({
      title: 'Đăng nhập thành công!',
      description: 'Đang chuyển hướng vào hệ thống...',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    console.log('Đăng nhập thành công:', result)
  } catch (error) {
    toast.add({
      title: 'Đăng nhập thất bại',
      description: 'Sai tài khoản hoặc mật khẩu, vui lòng thử lại.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    console.error('Đăng nhập thất bại:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden dark:bg-gray-950">
    <!-- Interactive Background -->
    <div class="absolute inset-0 z-0 pointer-events-auto">
      <DotField
        :dot-radius="2.5"
        :dot-spacing="16"
        :bulge-strength="60"
        :glow-radius="200"
        :sparkle="false"
        :wave-amplitude="0"
        :cursor-radius="400"
        :cursor-force="0.1"
        :bulge-only="false"
        gradient-from="#22c55e"
        gradient-to="#10b981"
        glow-color="rgba(34, 197, 94, 0.2)"
      />
    </div>

    <UCard
      class="w-full max-w-[420px] relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border border-white/50 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,200,100,0.08)] transition-all duration-500 rounded-3xl divide-none"
      :ui="{ header: 'px-8 pt-10 pb-6', body: 'px-8 pb-4', footer: 'px-8 pb-8 pt-6 border-t border-gray-100 dark:border-gray-800' }">
      <template #header>
        <div class="text-center space-y-4">
          <div
            class="w-16 h-16 bg-gradient-to-tr from-green-600 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
            <UIcon name="i-lucide-leaf" class="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Đăng nhập</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Đăng nhập vào Gomchat để tiếp tục</p>
          </div>
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
        <UFormField name="username" label="Tài khoản" required>
          <UInput v-model="state.username" placeholder="Nhập tên đăng nhập" icon="i-lucide-user" size="lg"
            class="w-full" />
        </UFormField>

        <UFormField name="password" label="Mật khẩu" required>
          <template #hint>
            <NuxtLink to="/forgot-password"
              class="text-sm font-semibold text-green-600 hover:text-green-500 transition-colors">Quên mật khẩu?
            </NuxtLink>
          </template>
          <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" placeholder="Nhập mật khẩu"
            icon="i-lucide-lock" size="lg" class="w-full">
            <template #trailing>
              <UButton
                color="neutral"
                variant="ghost"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                @click="() => { showPassword = !showPassword }"
                size="sm"
                class="pointer-events-auto"
                aria-label="Hiện mật khẩu"
              />
            </template>
          </UInput>
        </UFormField>

        <div class="pt-2">
          <UButton type="submit" label="Đăng nhập" block size="xl" :loading="isLoading"
            class="font-bold text-base bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0" />
        </div>
      </UForm>

      <template #footer>
        <div class="text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Bạn chưa có tài khoản?
            <NuxtLink to="/signup" class="font-bold text-green-600 hover:text-green-500 transition-colors ml-1">Đăng ký
              ngay</NuxtLink>
          </p>
        </div>
      </template>
    </UCard>
  </div>
</template>