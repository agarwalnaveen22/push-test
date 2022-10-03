import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {Start, Login, Home} from './scenes';

export type RootStackParamsList = {
  Start: undefined;
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const Routes = () => {
  const [initialScreen, setInitialScreen] =
    useState<keyof RootStackParamsList>('Start');
  const [initializing, setInitializing] = useState<boolean>(true);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setInitialScreen('Home');
      } else {
        setInitialScreen('Start');
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) return null;

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Routes;
