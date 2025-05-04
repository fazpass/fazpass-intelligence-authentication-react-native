import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FiaService } from './FiaService';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ValidateScreen } from './screens/ValidateScreen';

const fiaService = FiaService.getInstance();

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    fiaService.initialize()
  })
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name='Login'
        component={LoginScreen} />
        <Stack.Screen
          name='Validate'
          component={ValidateScreen} />
      <Stack.Screen
        name='Home'
        component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
