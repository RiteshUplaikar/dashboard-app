import React, { useState } from 'react';
import './user.css';
import { FaSignOutAlt, FaUser, FaStore } from 'react-icons/fa';

interface Store {
  name: string;
  address: string;
  rating: number;
  userRating?: number;
}

const initialStores: Store[] = [
  { name: "Tech World", address: "500 Innovation Drive", rating: 4.6, userRating: 5 },
  { name: "Book Haven", address: "321 Library Lane", rating: 4.3 },
  { name: "Gadget Galaxy", address: "123 Gizmo Street", rating: 4.7 },
  { name: "Fashion Fiesta", address: "555 Style Avenue", rating: 4.2 },
];

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stores' | 'profile'>('stores');
  const [searchTerm, setSearchTerm] = useState('');
  const [stores, setStores] = useState(initialStores);

  const handleLogout = () => {
    console.log('Logged out');
  };

  const handleRatingChange = (index: number, value: number) => {
    const updated = [...stores];
    updated[index].userRating = value;
    setStores(updated);
  };

  const handleSubmitRating = (index: number) => {
    alert(`Rating submitted: ${stores[index].userRating} for ${stores[index].name}`);
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (activeTab === 'profile') {
      return (
        <div>
          <h2>User Information</h2>
          <div className="user-info-box">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Registered Since:</strong> January 2024</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2>Store Listings</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="store-grid">
          {filteredStores.map((store, index) => (
            <div className="store-card" key={index}>
              <h3>{store.name}</h3>
              <p><strong>Address:</strong> {store.address}</p>
              <p><strong>Overall Rating:</strong> {store.rating}</p>
              <p><strong>Your Rating:</strong> {store.userRating ?? 'Not rated yet'}</p>
              <select
                value={store.userRating ?? ''}
                onChange={e => handleRatingChange(index, parseInt(e.target.value))}
              >
                <option value="">Rate this store</option>
                {[1, 2, 3, 4, 5].map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
              <button onClick={() => handleSubmitRating(index)}>
                {store.userRating ? 'Update Rating' : 'Submit Rating'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="user-page">
      <div className="sidebar">
        <div
          className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser className="sidebar-icon" />
        </div>
        <div
          className={`sidebar-item ${activeTab === 'stores' ? 'active' : ''}`}
          onClick={() => setActiveTab('stores')}
        >
          <FaStore className="sidebar-icon" />
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

export default UserPage;
