import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { ListItem } from "../components";
import { useFetch } from "../hooks";

const Meals = ({ navigation }) => {
  const { loading, data: meals } = useFetch(
    "https://serverless.the3dgar.vercel.app/api/meals"
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando comidas...</Text>
      ) : (
        <>
          <FlatList
            style={styles.list}
            data={meals}
            keyExtractor={(x) => x._id}
            renderItem={({ item }) => (
              <ListItem
                onPress={() => navigation.navigate("Modal", { _id: item._id, name: item.name })}
                name={item.name}
              ></ListItem>
            )}
          ></FlatList>
          <TouchableHighlight
            underlayColor={"#eee"}
            style={styles.button}
            activeOpacity={0.1}
            onPress={() => {
              AsyncStorage.clear()
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.text}>Salir</Text>
          </TouchableHighlight>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list: {
    alignSelf: "stretch",
  },
  button: {
    alignSelf: "stretch",
    paddingBottom: 20
  },
  text: {
    textAlign: "center",
    color: "dodgerblue",
  },
});

export default Meals;
