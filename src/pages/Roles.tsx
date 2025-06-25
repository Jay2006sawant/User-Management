import React from 'react';
import '../styles/Roles.css';

const mockRoles = [
  { id: 'role-1', name: 'Admin', description: 'Full access to all features' },
  { id: 'role-2', name: 'User', description: 'Standard user access' },
  { id: 'role-3', name: 'Manager', description: 'Manage users and tenants' },
];

const Roles: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Roles</h1>
    <table className="entity-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {mockRoles.map((role) => (
          <tr key={role.id}>
            <td>{role.id}</td>
            <td>{role.name}</td>
            <td>{role.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Roles; 