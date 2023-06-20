import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import Splash from './Screens/auth/splash';
import SignupScreen from './Screens/auth/SignupScreen';
import LoginScreen from './Screens/auth/LoginScreen';
import HomeScreen from './Screens/user/HomeScreen';
import OrderList from './components/OrderList/OrderList';
import MyOrderScreen from './Screens/user/MyOrderScreen';
import MyOrderDetailScreen from './Screens/user/MyOrderDetailScreen';

function App(): JSX.Element {
 

  return (
  //  <View>
  //   <Text>Hello</Text>
  //  </View>
  // <Splash navigation={undefined}/>
  // <SignupScreen navigation={undefined}/>
  // <LoginScreen navigation={undefined}/>
  // <HomeScreen navigation={undefined} route={undefined}/>
//  <OrderList item={undefined} onPress={undefined}/>
// <MyOrderScreen navigation={undefined} route={undefined}/> 
<MyOrderDetailScreen navigation={undefined} route={undefined}/>
  );
}

export default App;
