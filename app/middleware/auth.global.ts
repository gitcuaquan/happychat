export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("happy_chat_token")

  // Nếu người dùng đã đăng nhập và cố gắng truy cập trang auth (login, etc.), chuyển hướng đến trang admin
  if (token.value && to.path.startsWith('/auth')) {
    return navigateTo('/admin/chat')
  }

  // Nếu người dùng chưa đăng nhập và cố gắng truy cập trang quản trị hoặc trang chủ
  if (!token.value && (to.path.startsWith('/admin') || to.path === '/')) {
    return navigateTo('/auth/login')
  }
})
