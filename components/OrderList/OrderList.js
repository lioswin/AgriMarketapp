import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../constants";
import { LogBox } from 'react-native';


const OrderList = ({ onPress }) => {
  LogBox.ignoreAllLogs(true);
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  // useEffect(() => {
  //   let packageItems = 0;
  //   item?.items.forEach(() => {
  //     ++packageItems;
  //   });
  //   setQuantity(packageItems);
  //   setTotalCost(
  //     item?.items.reduce((accumulator, object) => {
  //       return (accumulator + object.price) * object.quantity;
  //     }, 0)
  //   );
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        <View>
          <Text style={styles.primaryText}>Order # 5
          {/* {item?.orderId} */}
          </Text>
        </View>
        <View style={styles.timeDateContainer}>
          <Text style={styles.secondaryTextSm}>
            {/* {dateFormat(item?.createdAt)} */}
            4:45am
          </Text>
          <Text style={styles.secondaryTextSm}>
            {/* {getTime(item?.createdAt)} */}
            5:56pm
            </Text>
        </View>
      </View>
      {/* {item?.user?.name && (
        <View style={styles.innerRow}>
          <Text style={styles.secondaryText}>{item?.user?.name} </Text>
        </View>
      )}
      {item?.user?.email && (
        <View style={styles.innerRow}>
          <Text style={styles.secondaryText}>{item?.user?.email} </Text>
        </View>
      )} */}
       <View style={styles.innerRow}>
          <Text style={styles.secondaryText}> Rose</Text>
        </View>

        <View style={styles.innerRow}>
          <Text style={styles.secondaryText}>roserite@gmail.com</Text>
        </View>
        {/* //here */}
      <View style={styles.innerRow}>
        <Text style={styles.secondaryText}>Quantity : 50</Text>
        <Text style={styles.secondaryText}>Total Amount : 45000Tsh</Text>
      </View>
      <View style={styles.innerRow}>
        <TouchableOpacity style={styles.detailButton} onPress={onPress}>
          <Text>Details</Text>
        </TouchableOpacity>
        {/* <Text style={styles.secondaryText}> */}
          {/* {item?.status} */}
          {/* on
          </Text> */}
      </View>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "auto",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  innerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  primaryText: {
    fontSize: 15,
    color: colors.dark,
    fontWeight: "bold",
  },
  secondaryTextSm: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "bold",
  },
  timeDateContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  detailButton: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: colors.muted,
    color: colors.muted,
    width: 100,
  },
});
