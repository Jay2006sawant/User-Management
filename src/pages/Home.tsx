import React from 'react';
import AtomButton from '../components/atoms/Button';

const Home: React.FC = () => (
  <div>
    <h1>Welcome to the User Management System!</h1>
    <AtomButton color="primary" variant="contained" onClick={() => alert('Button works!')}>
      Test Button
    </AtomButton>
  </div>
);

const mockOrganizations = [
  { id: 'org-1', name: 'Acme Corp', email: 'info@acme.com' },
  { id: 'org-2', name: 'Globex Inc', email: 'contact@globex.com' },
  { id: 'org-3', name: 'Umbrella LLC', email: 'admin@umbrella.com' },
];

const Organizations: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Organizations</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
        </tr>
      </thead>
      <tbody>
        {mockOrganizations.map((org) => (
          <tr key={org.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 8 }}>{org.id}</td>
            <td style={{ padding: 8 }}>{org.name}</td>
            <td style={{ padding: 8 }}>{org.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Organizations; 