import { AppLoading } from 'expo';
import React,{useState} from 'react';
import {bootstrap} from "./src/bootstrap";
import {AppNavigator} from "./src/navigation/AppNavigation";
import {Provider} from "react-redux";
import store from './src/store'

export default function App() {
  const [isReady,setIsReady] = useState(false)

  if(!isReady) {
    return <AppLoading
        startAsync={bootstrap}
        onError={error => console.log(error)}
        onFinish={()=>setIsReady(true)}
    />
  }

  return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
  );
}
