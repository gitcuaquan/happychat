export class AuthService {
  constructor(private fetcher: typeof $fetch) {}

  login(credentials: any) {
    return this.fetcher('/auth/login', { method: 'POST', body: credentials })
  }

  register(data: any) {
    return this.fetcher('/auth/register', { method: 'POST', body: data })
  }

  logout() {
    return this.fetcher('/auth/logout', { method: 'POST' })
  }
}
