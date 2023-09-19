import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from '@chakra-ui/react';

const Stafforder = ({ order }) => {
  // Create an array to store JSX elements
  const tableRows = [];

  order.forEach((element) => {
    const entries = Object.entries(element);

    entries.forEach(([key1, value]) => {
      // Create JSX elements and push them into the array
      tableRows.push(
        <Tr key={key1}>
          <Td>{key1}</Td>
          <Td>
            {value.map((item) => (
              <div key={item.item_name}>
                {item.item_name} - Amount: {item.count}
              </div>
            ))}
          </Td>
          <Td textColor={value.order_status ? "green.500" : "yellow.500"}>
            {value.order_status ? "Completed" : "Pending"}
          </Td>
        </Tr>
      );
    });
  });

  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>All Orders</TableCaption>
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Order items</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Render the JSX elements stored in the array */}
          {tableRows}
        </Tbody>
       
      </Table>
    </TableContainer>
  );
};

export default Stafforder;
