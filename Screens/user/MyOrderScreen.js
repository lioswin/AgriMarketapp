import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import Ionicons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/Feather';
import ProductList from "../../components/ProductList/ProductList";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomInput from "../../components/CustomInput/";
import ProgressDialog from "react-native-progress-dialog";
import pb from "../../constants/Network";
import { LogBox } from 'react-native';
const MyOrderScreen = ({ navigation, route }) => {
  LogBox.ignoreAllLogs(true);
  const { authUser } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");

  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [cat,setCat] = useState("")

  // query data from db
   
  const fetchProduct = async () => {
    const filterExpression = `ordered.name='rose'`;
    const records = await pb.collection('products').getFullList({
      filter: filterExpression,
      expand: 'category'
    });
    const orders = records.map((p) => p['expand']['category']).flat()
    setProducts(records);
    // console.log(records.map((p) => p['expand']['category']).flat())
    setCat(orders)
    console.log(cat)
    setFoundItems(records);
    setError("");
    setIsloading(false);
  }

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchProduct();
    setRefreshing(false);
  };
  //method to delete the specific order
  // const handleDelete = (id) => {
  //   setIsloading(true);
  //   console.log(`${network.serverip}/delete-product?id=${id}`);
  //   fetch(`${network.serverip}/delete-product?id=${id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.success) {
  //         fetchProduct();
  //         setError(result.message);
  //         setAlertType("success");
  //       } else {
  //         setError(result.message);
  //         setAlertType("error");
  //       }
  //       setIsloading(false);
  //     })
  //     .catch((error) => {
  //       setIsloading(false);
  //       setError(error.message);
  //       console.log("error", error);
  //     });
  // };

  //method for alert
  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete the order?",
      [
        {
          text: "Yes",
          onPress: () => {
            handleDelete(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  //method to filer the orders for by title [search bar]
  // const filter = () => {
  //   const keyword = filterItem;
  //   if (keyword !== "") {
  //     const results = products?.filter((product) => {
  //       return product?.title.toLowerCase().includes(keyword.toLowerCase());
  //     });
  //     setFoundItems(results);
  //   } else {
  //     setFoundItems(products);
  //   }
  // };

  //filter the data whenever filteritem value change
  // useEffect(() => {
  //   filter();
  // }, [filterItem]);

  // bado search feature
  //fetch the categories on initial render
  useEffect(() => {
    fetchProduct();
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
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("addproduct", { authUser: authUser });
          }}
        >
          <AntDesign name="plus-square" size={30} color={colors.muted} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Products ordered</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View Orders made</Text>
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
          <Text>{`No orderd product found with the name of ${filterItem}!`}</Text>
        ) : (
          foundItems.map((product,index) => {
            return (
              // description for quantity
              <ProductList
                key={index}
                image={`${pb.baseUrl}/api/files/products/${product.id}/${product.image}`}
                title={product.name}
                // category={`${cat[index].name}`}
                price={`${product.price}Tsh`}
                qantity={product.location}
                onPressView={() => {
                  console.log("view is working " + product._id);
                }}
                // onPressEdit={() => {
                //   navigation.navigate("editproduct", {
                //     product: product,
                //     authUser: authUser,
                //   });
                // }}
                onPressDelete={() => {
                  showConfirmDialog(product._id);
                }}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
//MyOrderScreen
export default MyOrderScreen;

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
