import React from 'react';
import '../styles/Users.css';

const mockUsers = [
  { id: 'user-1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: 'user-2', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 'user-3', name: 'Charlie Lee', email: 'charlie@example.com', role: 'Manager' },
];

const Users: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Users</h1>
    <table className="entity-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {mockUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Users; 