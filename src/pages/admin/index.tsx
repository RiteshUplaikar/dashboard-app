import React, { useState } from 'react';
import { FaHome, FaUser, FaStore, FaSignOutAlt } from 'react-icons/fa';

import './admin-page.css';
import Stats from './components/stats';
import RegisterForm from '../../components/register-user';
import StoreCard from '../../components/store-card';
import UserCard from '../../components/user-card';
import StoreTable from './components/store-table';
import UserTable from './components/user-table';
import RegisterStoreForm from '../../components/register-store';
import { useAdminPage } from './hooks';

export const userData = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    address: "123 Maple Street, Springfield",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    address: "456 Oak Avenue, Metropolis",
  },
  {
    name: "Carol Davis",
    email: "carol.davis@example.com",
    address: "789 Pine Lane, Gotham",
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    address: "101 Elm Street, Star City",
  },
  {
    name: "Emma Brown",
    email: "emma.brown@example.com",
    address: "202 Birch Road, Central City",
  },
  {
    name: "Frank Thomas",
    email: "frank.thomas@example.com",
    address: "303 Cedar Blvd, Coast City",
  },
];

export const storeData = [
  {
    name: "Tech World",
    email: "contact@techworld.com",
    address: "500 Innovation Drive, Silicon Valley",
    rating: 4.8,
  },
  {
    name: "Book Haven",
    email: "info@bookhaven.com",
    address: "321 Library Lane, Knowledge Town",
    rating: 4.5,
  },
  {
    name: "Gadget Galaxy",
    email: "support@gadgetgalaxy.com",
    address: "123 Gizmo Street, Device City",
    rating: 4.7,
  },
  {
    name: "Fashion Fiesta",
    email: "hello@fashionfiesta.com",
    address: "555 Style Avenue, Trendy Town",
    rating: 4.2,
  },
  {
    name: "Grocery Giant",
    email: "shop@grocerygiant.com",
    address: "789 Market Blvd, Foodland",
    rating: 4.6,
  },
  {
    name: "Sports Spot",
    email: "sales@sportsspot.com",
    address: "404 Fitness Road, Active City",
    rating: 4.4,
  },
];


const dummyUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', address: '123 Street, City' },
  { name: 'Bob Smith', email: 'bob@example.com', address: '456 Avenue, City' },
];

const dummyStores = [
  { name: 'TechZone', email: 'tech@example.com', address: '789 Market St', rating: 4.5 },
  { name: 'GadgetWorld', email: 'gadget@example.com', address: '1010 Mall Rd', rating: 4.2 },
];

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const {
    isStoreLoading,
    isUserLoading,
    storesData,
    usersData
  } = useAdminPage()

  const handleLogout = () => {
    console.log('Logged out');
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isModalVisibleStore, setModalVisibleStore] = useState(false);

  const toggleModalStore = () => {
    setModalVisibleStore(!isModalVisibleStore);
  };


  const [title, setTitle] = useState("")

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '20px'
            }}>
              <h2>Dashboard</h2>
            </div>
            <Stats />
            <h2>Recents</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '40px',
              marginBottom: '20px',
            }}>
              <div style={{ flex: 1 }}>
                <h3>User List (Top 5)</h3>
                {
                  isUserLoading ? <p>Loading</p> : (
                    usersData?.data.length > 0 ? usersData.data.map((user: any, index: number) => (
                      <UserCard key={index} {...user} />
                    )) : <p>no data</p>
                  )
                }
              </div>

              <div style={{ flex: 1 }}>
                <h3>Store List (Top 5)</h3>
                {
                  isStoreLoading ? <p>Loading</p> : (
                    storesData.data?.length ? 0 > storesData.data.map((store: any, index: number) => (
                      <StoreCard key={index} {...store} />
                    )) : <p>no data</p>
                  )
                }
              </div>
            </div>
          </>
        );
      case 'users':
        return (
          <>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h2>User Management</h2>
              <button onClick={() => {
                setTitle("Register User")
                setModalVisible(true)
              }}>Create User</button>
            </div>
            <UserTable data={userData} />
          </>
        );
      case 'stores':
        return (
          <>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h2>Store Management</h2>
              <button onClick={() => {
                setTitle("Register Store")
                setModalVisibleStore(true)
              }}>Create Store</button>
            </div>
            <StoreTable />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <div className="sidebar">
        <div
          className={`sidebar-item ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => setActiveSection('home')}
        >
          <FaHome className="sidebar-icon" />
        </div>
        <div
          className={`sidebar-item ${activeSection === 'users' ? 'active' : ''}`}
          onClick={() => setActiveSection('users')}
        >
          <FaUser className="sidebar-icon" />
        </div>
        <div
          className={`sidebar-item ${activeSection === 'stores' ? 'active' : ''}`}
          onClick={() => setActiveSection('stores')}
        >
          <FaStore className="sidebar-icon" />
        </div>
        <div className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
        </div>
      </div>

      <div className="info-section">
        {renderSection()}
      </div>
      <RegisterForm
        visible={isModalVisible}
        onClose={toggleModal}
        title={title}
      />
      <RegisterStoreForm
        visible={isModalVisibleStore}
        onClose={toggleModalStore}
        title={title} />
    </div>
  );
};

export default AdminPage;
