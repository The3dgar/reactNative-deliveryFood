import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { MealsScreen, Modal, Login, Register, AuthLoading } from "./screen";
global.BASE_URL = "https://serverless.the3dgar.vercel.app"

const OnBoardingNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Peddi",
        headerTitleAlign: "center"
      }
    },
    Register:{
      screen: Register,
      navigationOptions:{
        title: "Crear cuenta",
        headerTitleAlign: "center"
      }
    },
  },
  {
    initialRouteName: "Login",
  }
);

const AppNavigator = createStackNavigator(
  {
    Meals: {
      navigationOptions: {
        title: "Comidas disponibles",
        headerTitleAlign: "center"
      },
      screen: MealsScreen,
    },
  },
  {
    initialRouteName: "Meals",
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen:AppNavigator,
      navigationOptions:{
        title: "Comidas disponibles",
        headerTitleAlign: "center"
      }
    },
    Modal: {
      screen: Modal,
      navigationOptions: {
        title: "Detalles",
        headerTitleAlign: "center"
      }
    },
  },
  {
    mode: "modal",
    headerMode: "screen",
  }
);

const BaseStack = createSwitchNavigator(
  {
    AuthLoading,
    OnBoarding: OnBoardingNavigator,
    Root: RootStack,
  },
  {
    initialRouteName: "AuthLoading",
  }
);

export default createAppContainer(BaseStack);
