import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import Ionicons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/Feather';
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomInput from "../../components/CustomInput/";
import ProgressDialog from "react-native-progress-dialog";
import UserList from "../../components/UserList/UserList";
import pb from "../../constants/Network";

const ViewUsersScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const { authUser } = route.params;
  const [user, setUser] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  //method to convert the authUser to json object
  // const getToken = (obj) => {
  //   try {
  //     setUser(JSON.parse(obj));
  //   } catch (e) {
  //     setUser(obj);
  //     return obj.token;
  //   }
  //   return JSON.parse(obj).token;
  // };

  //method the fetch the users from server using API call
  // const fetchUsers = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("x-auth-token", getToken(authUser));

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
  //   setIsloading(true);
  //   fetch(`${network.serverip}/admin/users`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.success) {
  //         setUsers(result.data);
  //         setFoundItems(result.data);
  //         setError("");
  //       } else {
  //         setError(result.message);
  //       }
  //       setIsloading(false);
  //     })
  //     .catch((error) => {
  //       setIsloading(false);
  //       setError(error.message);
  //       console.log("error", error);
  //     });
  // };
  const fetchUsers = async () => {
    const filterExpression = `uploaded.name='${authUser.name}'`;
    const records = await pb.collection('products').getFullList({
      filter: filterExpression,
      expand: 'ordered'
    });
    const orders = records.map((p) => p['expand']['ordered']).flat()
    // console.log(records.map((p) => p['expand']['category']).flat())
    setUsers(orders);
    setFoundItems(orders);
    setError("");
    setIsloading(false);
    console.log(users)
  }

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchUsers();
    setRefreshing(false);
  };

  //method to filer the orders for by title [search bar]
  // const filter = () => {
  //   const keyword = filterItem;
  //   if (keyword !== "") {
  //     const results = users.filter((user) => {
  //       return user.name.toLowerCase().includes(keyword.toLowerCase());
  //     });

  //     setFoundItems(results);
  //   } else {
  //     setFoundItems(users);
  //   }
  //   setName(keyword);
  // };

  //filter the data whenever filteritem value change
  // useEffect(() => {
  //   filter();
  // }, [filterItem]);

  //fetch the orders on initial render
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressDialog visible={isloading} label={label} />
      <StatusBar></StatusBar>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-left-circle"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
        <TouchableOpacity disabled>
          <AntDesign name="user" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Buyers</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all Buyers</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <CustomInput
        radius={5}
        placeholder={"Search..."}
        value={filterItem}
        setValue={setFilterItem}
      />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
        }
      >
        {foundItems && foundItems.length == 0 ? (
          <Text>{`No user found with the name of ${filterItem}!`}</Text>
        ) : (
          foundItems.filter((item,index,self)=>self.findIndex(i=>i.id===item.id)==index).map((item, index) => (
            <UserList
              key={2}
              username={item.username}
              email={item.email}
              phone={item.phone}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ViewUsersScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },

  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
});
