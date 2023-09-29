import React, { useEffect, useState, useMemo } from 'react';
import { Auth } from '../../ServerDetails/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader';
import AdminId from '../../ServerDetails/adminId';
import Sidebar from '../../Extras/Sidebar/Sidebar';

import { getDatabase, ref, onValue } from 'firebase/database';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Box,
} from '@chakra-ui/react';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [ordersData, setOrdersData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [tableData, setTableData] = useState([]);

  const database = getDatabase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setIsAdmin(user.uid === AdminId);
      } else {
        window.location.href = '/admin/login';
      }
      setIsPageLoading(false);
    });

    return () => unsubscribe(); // Cleanup when the component unmounts
  }, []);

  useEffect(() => {
    const orderRaw = ref(database, 'users');
    const unsubscribeOrders = onValue(orderRaw, (snapshot) => {
      const data = snapshot.val();
      const orders1 = Object.values(data || {}); // Convert object values to an array

      const classifiedData = {};

      orders1.forEach((userOrder) => {
        for (const userId in userOrder) {
          if (userOrder.hasOwnProperty(userId)) {
            const orders = userOrder[userId];
            orders.forEach((order) => {
              const date = new Date(order.time).toISOString().split('T')[0];
              const itemName = order.item_name;
              const count = order.count;

              // Initialize the date entry if it doesn't exist
              if (!classifiedData[date]) {
                classifiedData[date] = {};
              }

              // Initialize the item entry if it doesn't exist
              if (!classifiedData[date][itemName]) {
                classifiedData[date][itemName] = 0;
              }

              // Increment the count for the item on that date
              classifiedData[date][itemName] += count;
            });
          }
        }
      });

      // Now, set the state with the classifiedData
      setOrdersData(classifiedData);

      // Set the available dates for the dropdown
      const availableDates = Object.keys(classifiedData);
      if (availableDates.length > 0) {
        setSelectedDate(availableDates[0]); // Set the selected date to the first available date
        setTableData(classifiedData[availableDates[0]]);
      }

      console.log(classifiedData); // Log the data here
    });

    // Return a cleanup function
    return () => {
      // Unsubscribe from the Firebase event when the component unmounts
      unsubscribeOrders();
    };
  }, [database]);

  const handleDateChange = (event) => {
    const newSelectedDate = event.target.value;
    setSelectedDate(newSelectedDate);
    setTableData(ordersData[newSelectedDate]);
  };

  const sidebarContent = useMemo(() => {
    return isAdmin ? (
      <Box>
        <Select value={selectedDate} onChange={handleDateChange}>
          {Object.keys(ordersData).map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </Select>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData &&
              Object.entries(tableData).map(([item, count]) => (
                <Tr key={item}>
                  <Td>{item}</Td>
                  <Td>{count}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    ) : null;
  }, [isAdmin, selectedDate, ordersData, tableData]);

  return (
    <>
      {isPageLoading ? (
        <SpinnerLoader />
      ) : (
        <Sidebar children={sidebarContent} />
      )}
    </>
  );
};

export default Home;
