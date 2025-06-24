// src/services/mockApi.ts

interface LoginRequest {
  email: string;
  password: string;
}

const mockUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  user_id: '1',
  tenant_id: 'tenant-1',
  organization_id: 'org-1',
};

const mockToken = 'mock-jwt-token';

export function mockLogin({ email, password }: LoginRequest) {
  return new Promise<{ token: string; user: typeof mockUser }>((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password') {
        resolve({ token: mockToken, user: mockUser });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
} 