// src/services/mockApi.ts

interface LoginRequest {
  email: string;
  password: string;
}

export interface Tenant {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  logo_url: string;
  industry: string;
  annual_revenue: string;
  employee_count: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const mockUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  user_id: '1',
  tenant_id: 'tenant-1',
  organization_id: 'org-1',
};

const mockToken = 'mock-jwt-token';

let tenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Acme Corp',
    description: 'A sample tenant',
    email: 'contact@acme.com',
    phone: '1234567890',
    website: 'https://acme.com',
    logo_url: '',
    industry: 'Technology',
    annual_revenue: '10M',
    employee_count: 100,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

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

export function mockGetTenants() {
  return new Promise<Tenant[]>((resolve) => {
    setTimeout(() => {
      resolve([...tenants]);
    }, 500);
  });
}

export function mockAddTenant(data: Omit<Tenant, 'id' | 'created_at' | 'updated_at' | 'active'>) {
  return new Promise<Tenant>((resolve) => {
    setTimeout(() => {
      const newTenant: Tenant = {
        ...data,
        id: `tenant-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        active: true,
      };
      tenants.push(newTenant);
      resolve(newTenant);
    }, 700);
  });
} 