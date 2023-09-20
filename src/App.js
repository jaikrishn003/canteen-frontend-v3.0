
import { BrowserRouter, Routes, Route } from "react-router-dom";



//Imports for Admins

import Login from "./Admin/Login/Login";
import Home from "./Admin/Home/Home";
import Menu from "./Admin/Menu/Menu";
import Orders from "./Admin/Orders/Orders";
import Staffs from "./Admin/Staffs/Staffs";
import Settings from "./Admin/Settings/Settings";
//********************* */

//Client Side

import ClientLogin from "./Client/Login/ClientLogin";
import ClientHome from "./Client/Home/ClientHome";
import Cart from "./Client/Cart/Cart";
import MyOrders from "./Client/MyOrders/MyOrders";
//************* */

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/staffs" element={<Staffs />} />
        <Route path="/admin/settings" element={<Settings/>}/>


        <Route path="/login" element={<ClientLogin/>}/>
        <Route path="/" element={<ClientHome/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
