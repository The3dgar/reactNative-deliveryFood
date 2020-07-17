import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { MealsScreen, Modal, Login, Register, AuthLoading } from "./screen";
global.BASE_URL = "https://serverless.the3dgar.vercel.app"

const OnBoardingNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Almuerzi",
        headerTitleAlign: "center"
      }
    },
    Register,
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
    Main: AppNavigator,
    Modal: Modal,
  },
  {
    mode: "modal",
    headerMode: "none",
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
