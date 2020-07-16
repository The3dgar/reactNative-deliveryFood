import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { MealsScreen, Modal } from "./screen";

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

export default createAppContainer(RootStack);
