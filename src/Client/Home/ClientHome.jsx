import React, { useEffect, useState } from 'react';
import { Auth, App } from '../../ServerDetails/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader';
import TopbarClient from '../ClientExtra/TopbarClient/TopbarClient';
import BottomNavbar from '../ClientExtra/BottomNavbar/BottomNavbar';
import { getDatabase, ref, onValue } from 'firebase/database';
import Menulistview from '../ClientExtra/MenuListView/Menulistview';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Divider,
  Text,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import './Hero.css';
import Fuse from 'fuse.js';

const ClientHome = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [menuData, setMenuData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState({});

  const database = getDatabase(App);
  const menuRef = ref(database, 'menu');

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUserDisplayName(user.displayName);
        
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
        // Initially set the filtered data to menuData
        setFilteredData(data);
      }
    });
    return () => {
      // Unsubscribe when component unmounts
      unsubscribe();
    };
  }, [database]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === '') {
      // If search query is empty, reset filteredData to menuData
      setFilteredData(menuData);
    } else {
      // Use Fuse.js to perform fuzzy search on the menuData based on item_name
      const fuse = new Fuse(Object.values(menuData), { keys: ['item_name'] });
      const result = fuse.search(query);
      const filteredMenuData = result.map((item) => item.item);

      // Update the filtered data based on the search query
      setFilteredData(filteredMenuData);
    }
  };

  const[acceptOrders, setacceptOrders]=useState()
  useEffect(()=>{
    const getValues = ref(database, "settings")
    onValue(getValues, (snapshot)=>{
        const data = snapshot.val()

        setacceptOrders(data.accept_orders)
        setIsPageLoading(false);
    })
})

  return (
    <>
      {isPageLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          <TopbarClient content={userDisplayName} />
          {acceptOrders
          ?
          <Box>
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
          :
          <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>We dont accept Orders during this hour</div>
        }
          
          <BottomNavbar />
        </>
      )}
    </>
  );
};

export default ClientHome;
