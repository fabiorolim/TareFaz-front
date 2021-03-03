import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import List from './src/pages/list';
import New from './src/pages/new';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='List'
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