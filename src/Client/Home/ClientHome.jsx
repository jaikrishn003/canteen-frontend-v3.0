import React, { useEffect, useState } from 'react';
import { Auth, App } from '../../ServerDetails/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader';
import TopbarClient from '../ClientExtra/TopbarClient/TopbarClient';
import BottomNavbar from '../ClientExtra/BottomNavbar/BottomNavbar';
import { getDatabase, ref, onValue } from 'firebase/database';
import Menulistview from '../ClientExtra/MenuListView/Menulistview';
import { Divider, Box } from '@chakra-ui/react';
import './Hero.css';
import Fuse from 'fuse.js';

const ClientHome = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [menuData, setMenuData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState({});
  const [acceptOrders, setAcceptOrders] = useState(false);
  const [displayPic, setDisplayPic] = useState('');

  const database = getDatabase(App);
  const menuRef = ref(database, 'menu');
  const settingsRef = ref(database, 'settings');

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUserDisplayName(user.displayName);
        setDisplayPic(user.photoURL);
      } else {
        window.location.href = '/login';
      }
    });
  }, [Auth]);

  useEffect(() => {
    const unsubscribe = onValue(menuRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setMenuData(data);
        setFilteredData(data);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribeSettings = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAcceptOrders(data.accept_orders);
      }
      setIsPageLoading(false);
    });
    return () => {
      unsubscribeSettings();
    };
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredData(menuData);
    } else {
      const fuse = new Fuse(Object.values(menuData), { keys: ['item_name'] });
      const result = fuse.search(query);
      const filteredMenuData = result.map((item) => item.item);

      setFilteredData(filteredMenuData);
    }
  };

  return (
    <>
      {isPageLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          <TopbarClient content={userDisplayName} displayPic={displayPic} />
          {acceptOrders ? (
            <Box style={{marginBottom:"150px"}}>
              <div style={{ overflowY: 'scroll', marginBottom: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="I'd like to have..."
                      className="search-bar"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '45px' }}>
                {Object.keys(filteredData).map((itemName) => (
                  <div key={itemName}>
                    <Menulistview
                      itemUrl={filteredData[itemName].item_image}
                      itemName={filteredData[itemName].item_name}
                      itemCutprice={filteredData[itemName].item_price}
                      offerPrice={filteredData[itemName].item_cut_price}
                      item_amount={filteredData[itemName].item_stock}
                      item_Avl={filteredData[itemName].item_avl}
                    />
                    <Divider my="4" borderColor={'#EEF6FD'} borderWidth={'1px'} />
                  </div>
                ))}
              </div>
            </Box>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              We don't accept orders during this hour
            </div>
          )}

          <BottomNavbar/>
        </>
      )}
    </>
  );
};

export default ClientHome;
