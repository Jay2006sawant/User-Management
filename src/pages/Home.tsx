import React from 'react';
import '../styles/Home.css';
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
    <table className="entity-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {mockOrganizations.map((org) => (
          <tr key={org.id}>
            <td>{org.id}</td>
            <td>{org.name}</td>
            <td>{org.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Organizations; 