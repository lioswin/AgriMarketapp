import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import Splash from './Screens/auth/splash';
import SignupScreen from './Screens/auth/SignupScreen';
import LoginScreen from './Screens/auth/LoginScreen';

function App(): JSX.Element {
 

  return (
  //  <View>
  //   <Text>Hello</Text>
  //  </View>
  // <Splash navigation={undefined}/>
  // <SignupScreen navigation={undefined}/>
  <LoginScreen navigation={undefined}/>
  );
}

export default App;
