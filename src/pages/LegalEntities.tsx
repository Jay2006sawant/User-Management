import React from 'react';

const mockLegalEntities = [
  { id: 'le-1', name: 'Acme Holdings', type: 'Corporation', country: 'USA' },
  { id: 'le-2', name: 'Globex Ltd', type: 'LLC', country: 'UK' },
  { id: 'le-3', name: 'Umbrella Group', type: 'Partnership', country: 'Germany' },
];

const LegalEntities: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1>Legal Entities</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Type</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Country</th>
        </tr>
      </thead>
      <tbody>
        {mockLegalEntities.map((le) => (
          <tr key={le.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 8 }}>{le.id}</td>
            <td style={{ padding: 8 }}>{le.name}</td>
            <td style={{ padding: 8 }}>{le.type}</td>
            <td style={{ padding: 8 }}>{le.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LegalEntities; 