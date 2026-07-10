export class AuthService {
  constructor(private fetcher: typeof $fetch) {}

  login(credentials: Record<string, unknown>) {
    return this.fetcher('/auth/login', { method: 'POST', body: credentials })
  }

  register(data: Record<string, unknown>) {
    return this.fetcher('/auth/register', { method: 'POST', body: data })
  }

  logout() {
    return this.fetcher('/auth/logout', { method: 'POST' })
  }

  connectFacebook(code: string, redirectUri?: string) {
    return this.fetcher('/auth/facebook', {
      method: 'POST',
      body: { code, redirectUri }
    })
  }

  getFacebookPages() {
    return this.fetcher('/auth/facebook/pages', { method: 'GET' })
  }

  subscribeFacebookPages(pageIds: string[]) {
    return this.fetcher('/auth/facebook/pages', {
      method: 'POST',
      body: { pageIds }
    })
  }

  getConnectedFacebookPages() {
    return this.fetcher('/auth/facebook/connected-pages', { method: 'GET' })
  }

  disconnectFacebookPage(pageId: string) {
    return this.fetcher(`/auth/facebook/pages/${pageId}`, { method: 'DELETE' })
  }

  updateFacebookPageSettings(pageId: string, settings: { syncMessenger?: boolean; syncComments?: boolean }) {
    return this.fetcher(`/auth/facebook/pages/${pageId}`, {
      method: 'PUT',
      body: settings
    })
  }
}
