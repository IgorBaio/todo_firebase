import { registerRootComponent } from 'expo';
import { Provider } from "react-redux";
import storeConfig from './src/store/configureStore'
import React from 'react'
import Navigator from "./src/Navigator";
import axios from 'axios'

axios.defaults.baseURL= 'https://api-todo-firebase.herokuapp.com/'

const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <Navigator />
    </Provider>
)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Redux);
