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

export default Home; 