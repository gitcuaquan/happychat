export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('happy_chat_token')

  // Allow navigation to auth routes (e.g. /auth/login)
  if (to.path.startsWith('/auth')) {
    // If user is already logged in, redirect them to admin chat when accessing login page
    if (token.value && to.path === '/auth/login') {
      return navigateTo('/admin/chat')
    }
    return
  }

  // Require login for all other routes
  if (!token.value) {
    return navigateTo('/auth/login')
  }
})
