import { AuthService } from '~/services/auth.service'

export default defineNuxtPlugin((nuxtApp) => {
  // Tạo custom fetcher với cấu hình mặc định
  const apiFetcher = $fetch.create({
    baseURL: 'http://localhost:5000/api/v1/', // Thay đổi URL này thành API thật
    onRequest({ options }) {
      // Xử lý đính kèm Token
      const token = useCookie('happy_chat_token')
      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    async onResponseError({ response }) {
      // Xử lý lỗi 401 Unauthorized
      if (response.status === 401) {
        // Dùng runWithContext để đảm bảo SSR an toàn khi điều hướng
        await nuxtApp.runWithContext(() => navigateTo('/auth/login'))
      }
    }
  })

  // Khởi tạo các class Service (Repository Pattern)
  const modules = {
    auth: new AuthService(apiFetcher)
  }

  // Cung cấp instance dưới tên $api
  return {
    provide: {
      api: modules
    }
  }
})
