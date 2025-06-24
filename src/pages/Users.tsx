import React from 'react';

const mockUsers = [
  { id: 'user-1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: 'user-2', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 'user-3', name: 'Charlie Lee', email: 'charlie@example.com', role: 'Manager' },
];

const Users: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Users</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Role</th>
        </tr>
      </thead>
      <tbody>
        {mockUsers.map((user) => (
          <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 8 }}>{user.id}</td>
            <td style={{ padding: 8 }}>{user.name}</td>
            <td style={{ padding: 8 }}>{user.email}</td>
            <td style={{ padding: 8 }}>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Users; 