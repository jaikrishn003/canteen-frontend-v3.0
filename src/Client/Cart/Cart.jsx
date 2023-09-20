import React, { useEffect, useState } from 'react';
import BottomNavbar from '../ClientExtra/BottomNavbar/BottomNavbar';
import TopbarClient from '../ClientExtra/TopbarClient/TopbarClient';
import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader';
import { Box, Button, Flex, Spacer, Text, Divider } from '@chakra-ui/react';
import { Auth, App } from '../../ServerDetails/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue ,push} from 'firebase/database';
import ItemList from './ItemList';

import axios from 'axios';
import { server } from '../../ServerDetails/backendDetails';

const Cart = () => {
  const [itemTotal, setItemTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [displayPic, setDisplayPic] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [menuData, setMenuData] = useState({});
  const [isCartData, setIsCartData] = useState(true);
  const [cartEnabled, setCartEnabled] = useState(false);
  const[userEmail, setuserEmail]=useState("")
  const[GuserId, setuserId]=useState("")

  const database = getDatabase(App);
  const menuRef = ref(database, 'menu');

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setuserEmail(user.email)
        setuserId(user.uid)
        setUserDisplayName(user.displayName);
        setIsPageLoading(false);
        setDisplayPic(user.photoURL);
      } else {
        window.location.href = '/login';
      }
    });

    const items = JSON.parse(localStorage.getItem('Menu'));

    if (items) {
      const idList = items.map((item) => item.id);
        

      const unsubscribe = onValue(menuRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          const selectedData = idList.map((id) => {
            const menuItem = data[id];
            if (menuItem) {
              return {
                ...menuItem,
                count: items.find((item) => item.id === id).count,
              };
            }
            return null;
          });
          
          const isAnyItemNotAvailable = selectedData.some((item) => item.item_avl === false);

          setCartEnabled(!isAnyItemNotAvailable);
          setMenuData(selectedData);
          const totalPrice = idList.reduce((total, id) => {
            const item = data[id];
            const count = items.find((item) => item.id === id).count;
            if (item) {
              return total + item.item_cut_price * count;
            }
            return total;
          }, 0);
    
          setItemTotal(totalPrice);
        }
      });

      // Calculate the total price
     
    } else {
      setIsCartData(false);
    }
  }, []);


  const handleOpenRazorpay=(data)=>{
    const options={
      "key":"rzp_test_wji97YyPAnEVSW",
      "amount": Number(data.amount),
      "currency":data.currency,
      "name":"Jaikrishns and co",
      "description":"Sample description",
      "order_id": data.id,
      

      "handler":function(response){
        console.log(response)
        axios.post(`${server}/payment/verify`, {response:response, cartItem:menuData, userMail:userEmail, userId:GuserId}).then(res=>{
          
            // const userRef = ref(database, `/users/${userId}`);
            // push(userRef, res.data.orderId).then(()=>{
            // localStorage.removeItem("Menu")
            // window.location.href="/"  
            // }).catch((error)=>{
            //   console.log(error)
            // })
            // localStorage.removeItem("Menu")
            // window.location.href="/"
            localStorage.removeItem("Menu")
            window.location.href="/myorders"
          
        }).catch(err=>{
          console.log(err)
        })
      }

    }
    const rzp = new window.Razorpay(options)

    rzp.open()
}

  const handlePayment = ()=>{
    const data = {amount:itemTotal}
    
    axios.post(`${server}/payment/initialize`, data)
        .then(res=>{
            console.log(res.data.data)
            
            handleOpenRazorpay(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
  }

  return (
    <>
      {isPageLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          <TopbarClient content={userDisplayName} />
          <Box>
            <div style={{ overflowY: 'scroll', marginTop: '20px' }}>
              <div style={{ justifyContent: 'space-between', display: 'flex', marginTop: '10px' }}>
                <Flex justifyContent={'flex-start'}>
                  <Box>
                    <Text marginLeft={'30px'} fontSize={'xl'} fontWeight={'bold'}>
                      Total: ₹{itemTotal}
                    </Text>
                  </Box>
                </Flex>
                <Spacer />
                <Flex marginRight={'20px'} marginTop={'-10px'} justifyContent={'flex-end'}>
                  <Box>
                    <Button
                      isDisabled={!(isCartData && cartEnabled)}
                      onClick={() => (cartEnabled ? (handlePayment()) : null)}
                      colorScheme="green"
                    >
                      Checkout
                    </Button>
                  </Box>
                </Flex>
              </div>
              {!isCartData ? (
                <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="card-view-temp">
                  <Text>Nothing in Cart</Text>
                </div>
              ) : (
                <div>
                  {Object.keys(menuData).map((itemName) => (
                    <div key={menuData[itemName].item_name}>
                      <ItemList
                        imgUrl={menuData[itemName].item_image}
                        name={menuData[itemName].item_name}
                        count={menuData[itemName].count}
                        amount={menuData[itemName].item_cut_price  * menuData[itemName].count}
                        offerPrice={menuData[itemName].item_cut_price * menuData[itemName].count}
                        item_amount={menuData[itemName].item_stock}
                        availability={menuData[itemName].item_avl}
                      />
                      
                      <Divider my="4" borderColor={'#EEF6FD'} borderWidth={'1px'} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Box>
          <BottomNavbar />
        </>
      )}
    </>
  );
};

export default Cart;
