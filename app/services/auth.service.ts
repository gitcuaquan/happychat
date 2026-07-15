export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private fetcher: any) {}

  async login(credentials: Record<string, unknown>) {
    return await this.fetcher('auth/login', {
      method: 'POST',
      body: credentials
    })
  }

  async register(data: Record<string, unknown>) {
    return await this.fetcher('auth/register', {
      method: 'POST',
      body: data
    })
  }

  async logout() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return { success: true }
  }

  // Facebook integrations (Mocked)
  async connectFacebook(_code: string, _redirectUri?: string) {
    await new Promise(resolve => setTimeout(resolve, 600))
    return { success: true }
  }

  async getFacebookPages() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [
      { id: 'fb-page-1', name: 'Gom Order - Hàng nội địa Trung', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GO' },
      { id: 'fb-page-2', name: 'Gom Express - Vận chuyển Việt Trung', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GE' },
      { id: 'fb-page-3', name: 'Gom Mỹ Phẩm - Chính hãng giá sỉ', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GMP' },
      { id: 'fb-page-4', name: 'HappyChat Support Hub', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HSH' }
    ]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getConnectedFromStorage(): any[] {
    if (typeof window === 'undefined') return []
    const val = localStorage.getItem('fb_connected_pages')
    if (!val) {
      // Seed initial connected pages
      const initial = [
        { id: 'fb-page-1', platformChannelId: 'fb-page-1', name: 'Gom Order - Hàng nội địa Trung', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GO', syncMessenger: true, syncComments: true },
        { id: 'fb-page-2', platformChannelId: 'fb-page-2', name: 'Gom Express - Vận chuyển Việt Trung', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GE', syncMessenger: true, syncComments: false }
      ]
      localStorage.setItem('fb_connected_pages', JSON.stringify(initial))
      return initial
    }
    return JSON.parse(val)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private saveConnectedToStorage(pages: any[]) {
    if (typeof window === 'undefined') return
    localStorage.setItem('fb_connected_pages', JSON.stringify(pages))
  }

  async getConnectedFacebookPages() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.getConnectedFromStorage()
  }

  async subscribeFacebookPages(pageIds: string[]) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const allPages = await this.getFacebookPages()
    const connected = this.getConnectedFromStorage()

    pageIds.forEach((id) => {
      if (!connected.some(c => c.id === id)) {
        const page = allPages.find(p => p.id === id)
        if (page) {
          connected.push({
            ...page,
            platformChannelId: page.id,
            syncMessenger: true,
            syncComments: true
          })
        }
      }
    })

    this.saveConnectedToStorage(connected)
    return { success: true }
  }

  async disconnectFacebookPage(pageId: string) {
    await new Promise(resolve => setTimeout(resolve, 200))
    let connected = this.getConnectedFromStorage()
    connected = connected.filter(c => c.id !== pageId && c.platformChannelId !== pageId)
    this.saveConnectedToStorage(connected)
    return { success: true }
  }

  async updateFacebookPageSettings(pageId: string, settings: { syncMessenger?: boolean, syncComments?: boolean }) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const connected = this.getConnectedFromStorage()
    const page = connected.find(c => c.id === pageId || c.platformChannelId === pageId)
    if (page) {
      if (settings.syncMessenger !== undefined) page.syncMessenger = settings.syncMessenger
      if (settings.syncComments !== undefined) page.syncComments = settings.syncComments
      this.saveConnectedToStorage(connected)
    }
    return { success: true }
  }
}
