import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/auth/LoginScreen";
import SignupScreen from "../Screens/auth/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../Screens/auth/splash";
// import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
// import UpdatePasswordScreen from "../screens/profile/UpdatePasswordScreen";
import MyAccountScreen from "../Screens/profile/MyAccountScreen";
import AddProductScreen from "../Screens/admin/AddProductScreen";
import DashboardScreen from "../Screens/admin/DashboardScreen";
import ViewProductScreen from "../Screens/admin/ViewProductScreen";
import Tabs from "./tabs/Tabs";
// import CartScreen from "../screens/user/CartScreen";
import CheckoutScreen from "../Screens/user/CheckoutScreen.js";
// import OrderConfirmScreen from "../screens/user/OrderConfirmScreen";
import ProductDetailScreen from "../Screens/user/ProductDetailScreen";
// import EditProductScreen from "../screens/admin/EditProductScreen";
import ViewOrdersScreen from "../Screens/admin/ViewOrdersScreen";
import ViewOrderDetailScreen from "../Screens/admin/ViewOrderDetailScreen";
import MyOrderScreen from "../Screens/user/MyOrderScreen";
import MyOrderDetailScreen from "../Screens/user/MyOrderDetailScreen";
import ViewCategoryScreen from "../Screens/admin/ViewCategoryScreen";
import AddCategoryScreen from "../Screens/admin/AddCategoryScreen";
import ViewUsersScreen from "../Screens/admin/ViewUsersScreen";
import CategoriesScreen from "../Screens/user/CategoriesScreen";
// import EditCategoryScreen from "../Screens/admin/EditCategoryScreen";
import MyWishlistScreen from "../Screens/profile/MyWishlistScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        {/* <Stack.Screen name="forgetpassword" component={ForgetPasswordScreen} /> */}
        {/* <Stack.Screen name="updatepassword" component={UpdatePasswordScreen} /> */}
        <Stack.Screen name="myaccount" component={MyAccountScreen} />
        <Stack.Screen name="mywishlist" component={MyWishlistScreen} />
        <Stack.Screen name="dashboard" component={DashboardScreen} />
        <Stack.Screen name="addproduct" component={AddProductScreen} />
        <Stack.Screen name="viewproduct" component={ViewProductScreen} />
        {/* <Stack.Screen name="editproduct" component={EditProductScreen} /> */}
        <Stack.Screen name="tab" component={Tabs} />
        {/* <Stack.Screen name="cart" component={CartScreen} /> */}
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        {/* <Stack.Screen name="orderconfirm" component={OrderConfirmScreen} /> */}
        <Stack.Screen name="productdetail" component={ProductDetailScreen} />
        <Stack.Screen name="vieworder" component={ViewOrdersScreen} />
        <Stack.Screen
          name="vieworderdetails"
          component={ViewOrderDetailScreen}
        />
        <Stack.Screen name="myorder" component={MyOrderScreen} />
        <Stack.Screen name="myorderdetail" component={MyOrderDetailScreen} />
        <Stack.Screen name="viewcategories" component={ViewCategoryScreen} />
        <Stack.Screen name="addcategories" component={AddCategoryScreen} />
        {/* <Stack.Screen name="editcategories" component={EditCategoryScreen} /> */}
        <Stack.Screen name="viewusers" component={ViewUsersScreen} />
        <Stack.Screen name="categories" component={CategoriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
