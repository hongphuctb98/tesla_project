import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/user/login/Login";
import HomePage from "./pages/user/home/HomePage";
import CarDetailPage from "./pages/user/cardetail/CarDetailPage";
import OrderPage from "./pages/user/order/OrderPage";
import EditDesign from "./components/user/EditDesign";
import OrderCard from "./components/user/OrderCard";
import Register from "./pages/user/register/Register";
import Form from "./components/admin/Form";
import UserProfileLayout from "./pages/user/profile/UserProfileLayout";
import UserOrder from "./pages/user/profile/UserOrder";
import UserProfile from "./pages/user/profile/UserProfile";
import UserSetting from "./pages/user/profile/UserSetting";
import AdminLogin from "./pages/admin/admin_login/AdminLogin";
import ManagerHome from "./pages/admin/manager_home/ManagerHome";
import Manager_Product from "./pages/admin/manager_product";
import Manager_User from "./pages/admin/manager_user";
import CarDetail from "./components/admin/CarDetail";
import Manager_Order from "./pages/admin/manager_order";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/:id" element={<UserProfileLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="order" element={<UserOrder />} />
          <Route path="setting" element={<UserSetting />} />
        </Route>

        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/order/:id" element={<OrderPage />}>
          <Route index element={<OrderPage />} />
          <Route path="design" element={<EditDesign />} />
          <Route path="ordercard" element={<OrderCard />} />
        </Route>

        {/* <Route path="/admin" element={<Manager_User />}></Route> */}
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin" element={<ManagerHome />}>
          <Route path="users" element={<Manager_User />} />
          <Route path="product" element={<Manager_Product />}></Route>
          <Route path="product/:id" element={<CarDetail />} />
          <Route path="order" element={<Manager_Order />}></Route>
        </Route>
        <Route path="/admin/firebase" element={<Form />}></Route>
      </Routes>
    </>
  );
}

export default App;
