import React from 'react';
import '../styles/Privileges.css';

const mockPrivileges = [
  { id: 'priv-1', name: 'View Dashboard', description: 'Can view dashboard data' },
  { id: 'priv-2', name: 'Manage Tenants', description: 'Can add, edit, and delete tenants' },
  { id: 'priv-3', name: 'Edit Users', description: 'Can edit user information' },
];

const Privileges: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Privileges</h1>
    <table className="entity-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {mockPrivileges.map((priv) => (
          <tr key={priv.id}>
            <td>{priv.id}</td>
            <td>{priv.name}</td>
            <td>{priv.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Privileges; 