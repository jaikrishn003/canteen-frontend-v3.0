import React, { useEffect, useState } from 'react';

import { Auth, App } from '../../ServerDetails/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import TopbarClient from '../ClientExtra/TopbarClient/TopbarClient';
import BottomNavbar from '../ClientExtra/BottomNavbar/BottomNavbar';

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader';

import { getDatabase, ref, onValue } from 'firebase/database';

import ExtraOrders from '../../Extras/ExtraOrders/ExtraOrders';

const MyOrders = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userId, setUserId] = useState('');
  const database = getDatabase(App);
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array

  const [displayPic, setDisplayPic] = useState('');


  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUserDisplayName(user.displayName);
        setUserId(user.uid);
        setDisplayPic(user.photoURL)
        setIsPageLoading(false);
      } else {
        window.location.href = '/login';
      }
    });
  }, [Auth]);

  useEffect(() => {
    if (!userId) return;
    const userOrderRef = ref(database, `users/${userId}/`);

    onValue(userOrderRef, (snapshot) => {
      const orderData = snapshot.val();

      if (orderData) {
        const orderComponents = Object.keys(orderData).map((orderId) => {
          const orderedItems = orderData[orderId];

          const orderPartialData = {
            order_id: orderId,
            order_items: orderedItems,
          };
          console.log(orderPartialData.order_items)
          return <ExtraOrders key={orderId} order={orderPartialData} />;
        });

        // Update the state with the array of order components
        setOrders(orderComponents);
      }
    });
  }, [userId, database]);

  return (
    <>
      {isPageLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          <TopbarClient content={userDisplayName} displayPic={displayPic}  />

          {/* Render the orders */}
          {orders}

          <BottomNavbar />
        </>
      )}
    </>
  );
};

export default MyOrders;
