import React from 'react';
import { useStats } from './hooks';

const Stats = () => {
  const { data, isLoading } = useStats()
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const cardStyle: React.CSSProperties = {
    flex: '1',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
  };

  const titleStyle: React.CSSProperties = {
    marginBottom: '10px',
    color: '#333',
    fontSize: '1.1rem',
    fontWeight: 600,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#007bff',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Total Users</h3>
        {
          isLoading ? (
            <p style={valueStyle}>loading</p>) : (
            <p style={valueStyle}>{data.data?.totalUsers}</p>)
        }
      </div>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Total Stores</h3>
        {
          isLoading ? (
            <p style={valueStyle}>loading</p>) : (
            <p style={valueStyle}>{data.data?.totalStores}</p>)
        }
      </div>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Total Ratings</h3>
        {
          isLoading ? (
            <p style={valueStyle}>loading</p>) : (
            <p style={valueStyle}>{data.data?.totalRatings}</p>)
        }
      </div>
    </div>
  );
};

export default Stats;
