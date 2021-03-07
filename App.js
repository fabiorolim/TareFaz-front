import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import List from './src/pages/list';
import New from './src/pages/new';
import Login from './src/pages/login';
import Loading from './src/pages/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const Stack = createStackNavigator();

  async function logout(navigation) {
    AsyncStorage.removeItem('token')
      .then(() => navigation.reset({ index: 0, routes: [{ name: 'Loading' }] }))
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Loading'
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name='List'
          component={List}
          options={({ navigation }) => {
            return {
              title: 'Lista de Tarefas',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('New')}
                  type="clear"
                  icon={<Icon name="add" size={25} color="white" />}
                />
              ),
              headerLeft: () => (
                <Button
                  onPress={() => logout(navigation)}
                  type="clear"
                  icon={<Icon name="logout" size={25} color="white" />}
                />
              )
            }
          }}
        />
        <Stack.Screen
          name='New'
          component={New}
          options={() => {
            return {
              title: 'Nova tarefa',
            }
          }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={() => {
            return {
              title: 'Login',
            }
          }}
        />
        <Stack.Screen
          name='Loading'
          component={Loading}
          options={() => {
            return {
              title: 'Loading',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
const screenOptions = {
  headerStyle: {
    backgroundColor: "orange"
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontWeight: "bold"
  }
}