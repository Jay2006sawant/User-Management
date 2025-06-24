import React from 'react';

const mockPrivileges = [
  { id: 'priv-1', name: 'View Dashboard', description: 'Can view dashboard data' },
  { id: 'priv-2', name: 'Manage Tenants', description: 'Can add, edit, and delete tenants' },
  { id: 'priv-3', name: 'Edit Users', description: 'Can edit user information' },
];

const Privileges: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Privileges</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {mockPrivileges.map((priv) => (
          <tr key={priv.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 8 }}>{priv.id}</td>
            <td style={{ padding: 8 }}>{priv.name}</td>
            <td style={{ padding: 8 }}>{priv.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Privileges; 