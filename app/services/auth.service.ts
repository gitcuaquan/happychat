export class AuthService {
  constructor(private fetcher: any) {}

  async login(credentials: any) {
    // Giả lập độ trễ mạng ngắn
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    return {
      token: "mock-happy-chat-token-xyz",
      user: {
        id: 1,
        username: credentials.username,
        name: "Admin User",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=" + credentials.username
      }
    };
  }

  async register(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true };
  }

  async logout() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { success: true };
  }
}

