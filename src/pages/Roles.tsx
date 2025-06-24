import React from 'react';

const mockRoles = [
  { id: 'role-1', name: 'Admin', description: 'Full access to all features' },
  { id: 'role-2', name: 'User', description: 'Standard user access' },
  { id: 'role-3', name: 'Manager', description: 'Manage users and tenants' },
];

const Roles: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Roles</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {mockRoles.map((role) => (
          <tr key={role.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 8 }}>{role.id}</td>
            <td style={{ padding: 8 }}>{role.name}</td>
            <td style={{ padding: 8 }}>{role.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Roles; 