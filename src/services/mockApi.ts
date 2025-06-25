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

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface Privilege {
  id: string;
  name: string;
  description: string;
}

export interface LegalEntity {
  id: string;
  name: string;
  type: string;
  country: string;
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

let roles: Role[] = [
  { id: 'role-1', name: 'Admin', description: 'Full access to all features' },
  { id: 'role-2', name: 'User', description: 'Standard user access' },
  { id: 'role-3', name: 'Manager', description: 'Manage users and tenants' },
];

let privileges: Privilege[] = [
  { id: 'priv-1', name: 'View Dashboard', description: 'Can view dashboard data' },
  { id: 'priv-2', name: 'Manage Tenants', description: 'Can add, edit, and delete tenants' },
  { id: 'priv-3', name: 'Edit Users', description: 'Can edit user information' },
];

let legalEntities: LegalEntity[] = [
  { id: 'le-1', name: 'Acme Holdings', type: 'Corporation', country: 'USA' },
  { id: 'le-2', name: 'Globex Ltd', type: 'LLC', country: 'UK' },
  { id: 'le-3', name: 'Umbrella Group', type: 'Partnership', country: 'Germany' },
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

export function mockGetRoles() {
  return new Promise<Role[]>((resolve) => {
    setTimeout(() => {
      resolve([...roles]);
    }, 500);
  });
}

export function mockAddRole(data: Omit<Role, 'id'>) {
  return new Promise<Role>((resolve) => {
    setTimeout(() => {
      const newRole: Role = {
        ...data,
        id: `role-${Date.now()}`,
      };
      roles.push(newRole);
      resolve(newRole);
    }, 700);
  });
}

export function mockEditRole(id: string, data: Partial<Omit<Role, 'id'>>) {
  return new Promise<Role>((resolve, reject) => {
    setTimeout(() => {
      const idx = roles.findIndex((r) => r.id === id);
      if (idx === -1) return reject(new Error('Role not found'));
      roles[idx] = {
        ...roles[idx],
        ...data,
      };
      resolve(roles[idx]);
    }, 700);
  });
}

export function mockDeleteRole(id: string) {
  return new Promise<{ id: string }>((resolve, reject) => {
    setTimeout(() => {
      const idx = roles.findIndex((r) => r.id === id);
      if (idx === -1) return reject(new Error('Role not found'));
      roles.splice(idx, 1);
      resolve({ id });
    }, 700);
  });
}

export function mockGetPrivileges() {
  return new Promise<Privilege[]>((resolve) => {
    setTimeout(() => {
      resolve([...privileges]);
    }, 500);
  });
}

export function mockAddPrivilege(data: Omit<Privilege, 'id'>) {
  return new Promise<Privilege>((resolve) => {
    setTimeout(() => {
      const newPrivilege: Privilege = {
        ...data,
        id: `priv-${Date.now()}`,
      };
      privileges.push(newPrivilege);
      resolve(newPrivilege);
    }, 700);
  });
}

export function mockEditPrivilege(id: string, data: Partial<Omit<Privilege, 'id'>>) {
  return new Promise<Privilege>((resolve, reject) => {
    setTimeout(() => {
      const idx = privileges.findIndex((p) => p.id === id);
      if (idx === -1) return reject(new Error('Privilege not found'));
      privileges[idx] = {
        ...privileges[idx],
        ...data,
      };
      resolve(privileges[idx]);
    }, 700);
  });
}

export function mockDeletePrivilege(id: string) {
  return new Promise<{ id: string }>((resolve, reject) => {
    setTimeout(() => {
      const idx = privileges.findIndex((p) => p.id === id);
      if (idx === -1) return reject(new Error('Privilege not found'));
      privileges.splice(idx, 1);
      resolve({ id });
    }, 700);
  });
}

export function mockGetLegalEntities() {
  return new Promise<LegalEntity[]>((resolve) => {
    setTimeout(() => {
      resolve([...legalEntities]);
    }, 500);
  });
}

export function mockAddLegalEntity(data: Omit<LegalEntity, 'id'>) {
  return new Promise<LegalEntity>((resolve) => {
    setTimeout(() => {
      const newEntity: LegalEntity = {
        ...data,
        id: `le-${Date.now()}`,
      };
      legalEntities.push(newEntity);
      resolve(newEntity);
    }, 700);
  });
}

export function mockEditLegalEntity(id: string, data: Partial<Omit<LegalEntity, 'id'>>) {
  return new Promise<LegalEntity>((resolve, reject) => {
    setTimeout(() => {
      const idx = legalEntities.findIndex((le) => le.id === id);
      if (idx === -1) return reject(new Error('Legal Entity not found'));
      legalEntities[idx] = {
        ...legalEntities[idx],
        ...data,
      };
      resolve(legalEntities[idx]);
    }, 700);
  });
}

export function mockDeleteLegalEntity(id: string) {
  return new Promise<{ id: string }>((resolve, reject) => {
    setTimeout(() => {
      const idx = legalEntities.findIndex((le) => le.id === id);
      if (idx === -1) return reject(new Error('Legal Entity not found'));
      legalEntities.splice(idx, 1);
      resolve({ id });
    }, 700);
  });
} 