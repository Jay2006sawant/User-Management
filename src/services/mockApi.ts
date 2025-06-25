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

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
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

let users: User[] = [
  { id: 'user-1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: 'user-2', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 'user-3', name: 'Charlie Lee', email: 'charlie@example.com', role: 'Manager' },
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

export function mockEditTenant(id: string, data: Partial<Omit<Tenant, 'id' | 'created_at' | 'updated_at'>>) {
  return new Promise<Tenant>((resolve, reject) => {
    setTimeout(() => {
      const idx = tenants.findIndex((t) => t.id === id);
      if (idx === -1) return reject(new Error('Tenant not found'));
      tenants[idx] = {
        ...tenants[idx],
        ...data,
        updated_at: new Date().toISOString(),
      };
      resolve(tenants[idx]);
    }, 700);
  });
}

export function mockDeleteTenant(id: string) {
  return new Promise<{ id: string }>((resolve, reject) => {
    setTimeout(() => {
      const idx = tenants.findIndex((t) => t.id === id);
      if (idx === -1) return reject(new Error('Tenant not found'));
      tenants.splice(idx, 1);
      resolve({ id });
    }, 700);
  });
}

export function mockGetUsers() {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve([...users]);
    }, 500);
  });
}

export function mockAddUser(data: Omit<User, 'id'>) {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        ...data,
        id: `user-${Date.now()}`,
      };
      users.push(newUser);
      resolve(newUser);
    }, 700);
  });
}

export function mockEditUser(id: string, data: Partial<Omit<User, 'id'>>) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) return reject(new Error('User not found'));
      users[idx] = {
        ...users[idx],
        ...data,
      };
      resolve(users[idx]);
    }, 700);
  });
}

export function mockDeleteUser(id: string) {
  return new Promise<{ id: string }>((resolve, reject) => {
    setTimeout(() => {
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) return reject(new Error('User not found'));
      users.splice(idx, 1);
      resolve({ id });
    }, 700);
  });
} 