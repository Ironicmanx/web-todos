
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Listpage from './src/listcomponent';
import { Button, TextInput } from 'react-native-paper';
import Appbar from './components/Appbar';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listpage from './src/listcomponent';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          header: () => <Appbar navigation={navigation} route={route} />
        })}
      >
        <Stack.Screen name="Home" component={listpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
