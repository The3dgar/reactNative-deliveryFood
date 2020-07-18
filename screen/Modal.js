import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  AsyncStorage,
  TouchableHighlight,
} from "react-native";
import { useFetch } from "../hooks";

export default ({ navigation }) => {
  const id = navigation.getParam("_id");
  const { loading, data } = useFetch(
    `${global.BASE_URL}/api/meals/${id}`
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <Text>{data._id}</Text>
          <Text>{data.name}</Text>
          <Text>{data.description}</Text>
          <TouchableHighlight
            underlayColor={"#eee"}
            style={styles.button}
            activeOpacity={0.1}
            onPress={() => {
              AsyncStorage.getItem("token").then((token) => {
                if (token) {
                  fetch(`${global.BASE_URL}/api/orders`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      authorization: token,
                    },
                    body: JSON.stringify({
                      meal_id: id,
                    }),
                  }).then((res) => {
                    if (res.status !== 201) {
                      return Alert.alert(
                        "Error",
                        "La orden no pudo ser generada"
                      );
                    }
                    alert("Orden generada con exito");
                    navigation.navigate("Meals");
                  });
                } else {
                  Alert.alert("Error", "Volver a ingresar");
                }
              });
            }}
          >
            <Text style={styles.text}>Aceptar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            style={styles.button}
            activeOpacity={0.1}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.text}>Volver</Text>
          </TouchableHighlight>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "dodgerblue",
  },
});
