import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useForm } from "../hooks";

export default ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    fetch(`${global.BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          return Alert.alert("Exito", res.mensaje, [
            {
              text: "Ir al inicio",
              onPress: () => navigation.navigate("Login"),
            },
          ]);
        }
        return Alert.alert("Error", res.mensaje);
        
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={inputs.email}
        onChangeText={subscribe("email")}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={inputs.password}
        autoCapitalize="none"
        onChangeText={subscribe("password")}
        secureTextEntry={true}
      ></TextInput>

      <TouchableHighlight
        underlayColor={"#eee"}
        style={styles.button}
        activeOpacity={0.1}
        onPress={handleSubmit}
      >
        <Text style={styles.text}>Enviar</Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#eee"}
        style={styles.button}
        activeOpacity={0.1}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.text}>Volver al Inicio</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "dodgerblue",
  },
});
