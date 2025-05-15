import React from 'react';

interface StoreProps {
  name: string;
  email: string;
  address: string;
  rating: number;
}

const StoreCard: React.FC<StoreProps> = ({ name, email, address, rating }) => {
  return (
    <div style={styles.card}>
      <h4 style={styles.name}>{name}</h4>
      <div style={styles.details}>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Rating:</strong> {rating}/5</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '12px',
    width: '100%',
    minHeight: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    marginBottom: '8px',
    fontSize: '18px',
    color: '#2c3e50',
  },
  details: {
    fontSize: '14px',
    color: '#444',
  }
};

export default StoreCard;
