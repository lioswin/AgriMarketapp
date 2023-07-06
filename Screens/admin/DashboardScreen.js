import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
import { colors } from "../../constants";
import CustomCard from "../../components/CustomCard/CustomCard";
import OptionList from "../../components/OptionList/OptionList";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressDialog from "react-native-progress-dialog";
import pb from "../../constants/Network";
import { LogBox } from 'react-native';

const DashboardScreen = ({ navigation, route }) => {
  LogBox.ignoreAllLogs(true);
  const { authUser } = route.params;
  const [user, setUser] = useState(authUser);
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const [refeshing, setRefreshing] = useState(false);
  const [records, setRecords] = useState([]);

  //method to remove the auth user from async storage and navigate the login if token expires
  const logout = async () => {
    await AsyncStorage.removeItem("authUser");
    navigation.replace("login");
  };
  //filter: "uploaded.name='tony'"
  // we gonna query db for products uploaded by loged in user hahahah 
  const fetchStats = async () => {
    const filterExpression = `uploaded.name='${authUser.name}'`;
    const records = await pb.collection('products').getFullList({
      filter: filterExpression,
      expand: 'ordered'
    });
    const categories = records.map((p) => p.category);
    const categoryTotal = new Set(categories.flat()).size //category total
    const products = records.length //products
    const orders = records.map((p) => p['expand']['ordered']).flat().length//orders
    const customer = records.map((p) => p['expand']['ordered']).flat()
    const customers = new Set(customer.flat().map((p) => p.id).flat()).size//customers
    setData([
      {
        id: 1,
        title: "Buyers",
        value: customers,
        iconName: "user",
        type: "parimary",
        screenName: "viewusers",
      },
      {
        id: 2,
        title: "Orders",
        value: orders,
        iconName: "shopping-bag",
        type: "secondary",
        screenName: "vieworder",
      },
      {
        id: 3,
        title: "Products",
        value: products,
        iconName: "square",
        type: "warning",
        screenName: "viewproduct",
      },
      {
        id: 4,
        title: "Categories",
        value: categoryTotal,
        iconName: "menu",
        type: "muted",
        screenName: "viewcategories",
      },
    ])
    console.log(data)
    setError("");
    setIsloading(false);
    // console.log(records[0]['expand']['ordered'])
    // console.log(records)
    // console.log('tony')
    // console.log(records.map((p) => p['expand']['ordered']))
    console.log(authUser.name);
  }


  //method call on Pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchStats();
    setRefreshing(false);
  };

  //call the fetch function initial render
  useEffect(() => {
    fetchStats();
  }, []);

  // const data = [
  //   {
  //     id: 1,
  //     title: "Buyers",
  //     value: "4",
  //     iconName: "user",
  //     type: "parimary",
  //     screenName: "viewusers",
  //   },
  //   {
  //     id: 2,
  //     title: "Orders",
  //     value: "9",
  //     iconName: "shopping-bag",
  //     type: "secondary",
  //     screenName: "vieworder",
  //   },
  //   {
  //     id: 3,
  //     title: "Products",
  //     value: "10",
  //     iconName: "square",
  //     type: "warning",
  //     screenName: "viewproduct",
  //   },
  //   {
  //     id: 4,
  //     title: "Categories",
  //     value: "9",
  //     iconName: "menu",
  //     type: "muted",
  //     screenName: "viewcategories",
  //   },
  // ]

  return (
    <InternetConnectionAlert onChange={(connectionState) => { }}>
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <ProgressDialog visible={isloading} label={label} />
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("authUser");
              navigation.replace("login");
            }}
          >
            <Ionicons name="log-out" size={30} color={colors.muted} />
          </TouchableOpacity>
          <View>
            <Text style={styles.toBarText}>Dashboard</Text>
          </View>
          <TouchableOpacity
          onPress={() =>
            navigation.navigate("profile", { authUser: user })
          }>
            <Ionicons
              name="user"
              size={30}
              color={colors.muted}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <MaterialCommunityIcons name="chevron-right" size={30} color="black" />
          <Text style={styles.headingText}>Welcome, Farmer</Text>
        </View>
        <View style={{ height: 370 }}>
          {data && (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refeshing}
                  onRefresh={handleOnRefresh}
                />
              }
              contentContainerStyle={styles.cardContainer}
            >
              {data.map((data) => (
                <CustomCard
                  key={data.id}
                  iconName={data.iconName}
                  title={data.title}
                  value={data.value}
                  type={data.type}
                  onPress={() => {
                    navigation.navigate(data.screenName, { authUser: user });
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.headingContainer}>
          <MaterialCommunityIcons name="chevron-right" size={30} color="black" />
          <Text style={styles.headingText}>Actions</Text>
        </View>
        <View style={{ flex: 1, width: "100%" }}>
          <ScrollView style={styles.actionContainer}>
            <OptionList
              text={"Products"}
              Icon={Ionicons}
              iconName={"square"}
              onPress={() =>
                navigation.navigate("viewproduct", { authUser: user })
              }
              onPressSecondary={() =>
                navigation.navigate("addproduct", { authUser: user })
              }
              type="morden"
            />
            <OptionList
              text={"Categories"}
              Icon={Ionicons}
              iconName={"menu"}
              onPress={() =>
                navigation.navigate("viewcategories",{ authUser: user })
              }
              onPressSecondary={() =>
                navigation.navigate("addcategories",{ authUser: user })
              }
              type="morden"
            />
            <OptionList
              text={"Orders"}
              Icon={Ionicons}
              iconName={"shopping-bag"}
              onPress={() =>
                navigation.navigate("vieworder", { authUser: user })
              }
              type="morden"
            />
            <OptionList
              text={"Buyers"}
              Icon={Ionicons}
              iconName={"user"}
              onPress={() =>
                navigation.navigate("viewusers", { authUser: user })
              }
              type="morden"
            />

            <View style={{ height: 20 }}></View>
          </ScrollView>
        </View>
      </View>
    </InternetConnectionAlert>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: 20,
    color: colors.muted,
    fontWeight: "800",
  },
  actionContainer: { padding: 20, width: "100%", flex: 1 },
});
