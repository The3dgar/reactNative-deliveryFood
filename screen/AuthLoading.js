import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  StyleSheet,
} from "react-native";

export default ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      setTimeout(() => {
        navigation.navigate(token ? "Root" : "OnBoarding");
      }, 1000);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={"blue"}></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
