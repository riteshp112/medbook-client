import App from "./App";
import { registerRootComponent } from "expo";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(gestureHandlerRootHOC(App));
