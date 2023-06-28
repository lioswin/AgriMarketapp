// import React from 'react';
// import {
//   Text,
//   View,
// } from 'react-native';
// import Splash from './Screens/auth/splash';
// import SignupScreen from './Screens/auth/SignupScreen';
// import LoginScreen from './Screens/auth/LoginScreen';
// import HomeScreen from './Screens/user/HomeScreen';
// import OrderList from './components/OrderList/OrderList';
// import MyOrderScreen from './Screens/user/MyOrderScreen';
// import MyOrderDetailScreen from './Screens/user/MyOrderDetailScreen';
// import CheckoutScreen from './Screens/user/CheckoutScreen';
// import MyWishlistScreen from './Screens/profile/MyWishlistScreen';
// import ProductDetailScreen from './Screens/user/ProductDetailScreen';
// import UserProfileScreen from './Screens/profile/UserProfileScreen';
// import AddCategoryScreen from './Screens/admin/AddCategoryScreen';
// import AddProductScreen from './Screens/admin/AddProductScreen';
// import DashboardScreen from './Screens/admin/DashboardScreen';
// import ViewCategoryScreen from './Screens/admin/ViewCategoryScreen';
// import CategoryList from './components/CategoryList/CategoryList';
// import ViewUsersScreen from './Screens/admin/ViewUsersScreen';
// import ViewProductScreen from './Screens/admin/ViewProductScreen';
// import ViewOrdersScreen from './Screens/admin/ViewOrdersScreen';
// import ViewOrderDetailScreen from './Screens/admin/ViewOrderDetailScreen';
// import CategoriesScreen from './Screens/user/CategoriesScreen';

// function App(): JSX.Element {
 

//   return (
//   //  <View>
//   //   <Text>Hello</Text>
//   //  </View>
//   // <Splash navigation={undefined}/>
//   // <SignupScreen navigation={undefined}/>
//   <LoginScreen navigation={undefined}/>
//   // <HomeScreen navigation={undefined} route={undefined}/>
// //  <OrderList item={undefined} onPress={undefined}/>
// // <MyOrderScreen navigation={undefined} route={undefined}/> 
// //<MyOrderDetailScreen navigation={undefined} route={undefined}/> 
// //<CheckoutScreen navigation={undefined} route={undefined}/>
// // <MyWishlistScreen navigation={undefined} route={undefined}/> 
// //<ProductDetailScreen navigation={undefined} route={undefined}/>
// //<UserProfileScreen navigation={undefined} route={undefined}/>
// //<AddCategoryScreen navigation={undefined} route={undefined}/>
// //<AddProductScreen navigation={undefined} route={undefined}/>
// //<DashboardScreen navigation={undefined} route={undefined}/>
// //<ViewCategoryScreen navigation={undefined} route={undefined}/>
// //<ViewUsersScreen navigation={undefined} route={undefined}/>
// //<ViewProductScreen navigation={undefined} route={undefined}/>
// //<ViewOrdersScreen navigation={undefined} route={undefined}/>
// // <ViewOrderDetailScreen navigation={undefined} route={undefined}/>
// //<CategoriesScreen navigation={undefined} route={undefined}/>
//   );
// }

// export default App;

import Routes from "./routes/Routes";
export default function App() {
 
  return (
      <Routes />
  );
}
