import React, { useEffect, useState } from 'react';
import { Auth } from '../../ServerDetails/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader';
import AdminId from '../../ServerDetails/adminId';
import Sidebar from '../../Extras/Sidebar/Sidebar';
import Stafforder from '../../Extras/OrdersAdmin/OrdersAdmin';
import { getDatabase, ref, onValue } from 'firebase/database';

const Orders = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const database = getDatabase();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(Auth, (user) => {
      if (user) {
        if (user.uid === AdminId) {
          setIsPageLoading(false);
        } else {
          window.location.href = '/';
        }
      } else {
        window.location.href = '/admin/login';
      }
    });

    return () => unsubscribeAuth(); // Cleanup for auth listener
  }, []);

  useEffect(() => {
    const orderRaw = ref(database, 'users');

    const unsubscribeOrders = onValue(orderRaw, (snapshot) => {
      const data = snapshot.val();
      const orders = Object.values(data || {}); // Convert object values to an array
        console.log(orders)
      setOrderData(<Stafforder order={orders} />);
    });

    return () => unsubscribeOrders(); // Cleanup for orders listener
  }, [database]);

  return (
    <>
      {isPageLoading ? (
        <SpinnerLoader />
      ) : (
        <Sidebar children={<>{orderData}</>} />
      )}
    </>
  );
};

export default Orders;
