import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import AntDesign from 'react-native-vector-icons/Feather';
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProgressDialog from "react-native-progress-dialog";
import Ionicons from 'react-native-vector-icons/Feather';
import { useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import pb from "../../constants/Network";
import { useCallback } from 'react';
import { LogBox } from 'react-native';

const AddProductScreen = ({ navigation, route }) => {
  LogBox.ignoreAllLogs(true);
  const { authUser } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [statusDisable, setStatusDisable] = useState(false);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(new FormData());

  //method to convert the authUser to json object.
  const getToken = (obj) => {
    try {
      setUser(JSON.parse(obj));
    } catch (e) {
      setUser(obj);
      return obj.token;
    }
    return JSON.parse(obj).token;
  };


  const fetchCategories = async () => {
    try {
      const records = await pb.collection('category').getFullList({
        sort: '-created',
      });
      setCategories(records);
    } catch (error) {
      setError("Error fetching categories.");
    } finally {
      setIsloading(false);
    }
  };

  const pickImage = useCallback(() => {
    // No permissions request is necessary for launching the image library
    launchImageLibrary(
      {
        mediaType: 'photo',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      },
      (response) => {
        if (!response.didCancel) {
          const imageUri = response.assets[0].uri;
          setImage(imageUri)
          const imageFileName = response.assets[0].fileName; // You can customize the image filename
          const imageFileType = response.assets[0].type;
          formData.append('image', {
            uri: imageUri,
            name: imageFileName,
            type: imageFileType,
          });
          setFormData(formData)
          // upload();
        }
      }
    );
  }, [formData]);


  //Method for imput validation and post data to server to insert product using API call
  const addProductHandle = async () => {
    setIsloading(true);

    //[check validation] -- Start
    if (title == "") {
      setError("Please enter the product title");
      setIsloading(false);
    } else if (price == 0) {
      setError("Please enter the product price");
      setIsloading(false);
    } else if (quantity <= 0) {
      setError("Quantity must be greater then 1");
      setIsloading(false);
    } else if (image == null) {
      setError("Please upload the product image");
      setIsloading(false);
    } else {
      //[check validation] -- End
      formData.append('name', title);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('uploaded', authUser.id);
      formData.append('ordered', 'puk9skypjhpfw45');
      formData.append('category', category);
      formData.append('quantity', quantity);
      const record = await pb.collection('products').create(formData);
      console.log(record)
      setIsloading(false);
      setError("")
      setImage('')
      setTitle("")
      setQuantity("")
      setPrice("")

    }
  };

 
  //call the fetch functions initial render
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const array = categories.map((p) => ({ label: p.name, value: p.id }));
      setItems(array);
    }
  }, [categories]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={"Adding ..."} />
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            // navigation.replace("viewproduct", { authUser: authUser });
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-left-circle"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Add Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Add product details</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            {image ? (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <AntDesign name="plus-circle" size={50} color={colors.muted} />
              </TouchableOpacity>
            )}
          </View>

          {/* <CustomInput
            value={sku}
            setValue={setSku}
            placeholder={"SKU"}
            placeholderTextColor={colors.muted}
            radius={5}
          /> */}
          <CustomInput
            value={title}
            setValue={setTitle}
            placeholder={"name"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={price}
            setValue={setPrice}
            placeholder={"Price"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={quantity}
            setValue={setQuantity}
            placeholder={"Quantity"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={description}
            setValue={setDescription}
            placeholder={"Description"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <DropDownPicker
        placeholder={"Select Product Category"}
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setItems}
        disabled={statusDisable}
        disabledStyle={{
          backgroundColor: colors.light,
          borderColor: colors.white,
        }}
        labelStyle={{ color: colors.muted }}
        style={{ borderColor: "#fff", elevation: 5 }}
      />
      <View style={styles.buttomContainer}>
        <CustomButton text={"Add Product"} onPress={addProductHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

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
    justifyContent: "flex-start",
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
    marginTop: 10,
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
  imageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageHolder: {
    height: 200,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 5,
  },
});
