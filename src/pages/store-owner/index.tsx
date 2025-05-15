import React, { useState } from 'react';
import './store-owner.css';
import { FaChartBar, FaStar, FaSignOutAlt } from 'react-icons/fa';

interface Rating {
  userName: string;
  rating: number;
  comment: string;
}

const ratings: Rating[] = [
  { userName: 'Alice', rating: 4, comment: 'Good service' },
  { userName: 'Bob', rating: 5, comment: 'Excellent store!' },
  { userName: 'Charlie', rating: 3, comment: 'Average experience' },
];

const StoreOwnerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ratings'>('dashboard');

  const handleLogout = () => {
    console.log('Logged out');
  };

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
      : 'No ratings yet';

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <div>
          <h2>Dashboard</h2>
          <div className="info-box">
            <h3>Store Overview</h3>
            <p>Total Ratings: {ratings.length}</p>
            <p>Average Rating: {averageRating}</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2>User Ratings</h2>
        {ratings.length === 0 ? (
          <p>No user has rated the store yet.</p>
        ) : (
          <table className="ratings-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((r, index) => (
                <tr key={index}>
                  <td>{r.userName}</td>
                  <td>{r.rating}</td>
                  <td>{r.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className="store-owner-page">
      <div className="sidebar">
        <div
          className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <FaChartBar className="sidebar-icon" />
        </div>
        <div
          className={`sidebar-item ${activeTab === 'ratings' ? 'active' : ''}`}
          onClick={() => setActiveTab('ratings')}
        >
          <FaStar className="sidebar-icon" />
        </div>
        <div className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
        </div>
      </div>

      <div className="info-section">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoreOwnerPage;
