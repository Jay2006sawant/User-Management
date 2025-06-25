import React from 'react';
import '../styles/LegalEntities.css';

const mockLegalEntities = [
  { id: 'le-1', name: 'Acme Holdings', type: 'Corporation', country: 'USA' },
  { id: 'le-2', name: 'Globex Ltd', type: 'LLC', country: 'UK' },
  { id: 'le-3', name: 'Umbrella Group', type: 'Partnership', country: 'Germany' },
];

const LegalEntities: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Legal Entities</h1>
    <table className="entity-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {mockLegalEntities.map((le) => (
          <tr key={le.id}>
            <td>{le.id}</td>
            <td>{le.name}</td>
            <td>{le.type}</td>
            <td>{le.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LegalEntities; 