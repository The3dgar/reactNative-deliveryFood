import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { ListItem } from "../components";
import { useFetch } from "../hooks";

const Meals = ({ navigation }) => {
  const {loading, data: meals} = useFetch("https://serverless.the3dgar.vercel.app/api/meals")

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando comidas...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={meals}
          keyExtractor={(x) => x._id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate("Modal", { _id: item._id })}
              name={item.name}
            ></ListItem>
          )}
        ></FlatList>
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
});

export default Meals;
