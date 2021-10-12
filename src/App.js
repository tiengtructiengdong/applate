import React, {useState} from 'react';

import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Register from './Components/Register';
import ListVC from './Components/List';
import ScanVC from './Components/Scan';
import SettingsVC from './Components/Settings';

import {AppTabbar} from './Components/AppTabbar';
import {useIsFocused} from '@react-navigation/native';

import DefaultPreference from 'react-native-default-preference';

function List({navigation}) {
  return <ListVC navigation={navigation}></ListVC>;
}

function Scan({navigation}) {
  const isFocused = useIsFocused();

  if (isFocused) {
    return <ScanVC navigation={navigation}></ScanVC>;
  }
  return <View style={{flex: 1, backgroundColor: '#121212'}}></View>;
}

function Settings({navigation}) {
  return <SettingsVC navigation={navigation}></SettingsVC>;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    fetch('https://www.google.com/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          response
            .json()
            .then(data => {
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  DefaultPreference.get('price')
    .then(price => {
      if (price == null) {
        DefaultPreference.set('price', '0')
          .then(language => {
            console.log('set');
          })
          .catch(err => {
            console.log(err);
          });
        DefaultPreference.set('carPrice', '0')
          .then(language => {
            console.log('set');
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });

  DefaultPreference.get('language').then(language => {
    if (language == null)
      DefaultPreference.set('language', 'en')
        .then(language => {
          console.log('set');
        })
        .catch(err => {
          console.log(err);
        });
  });

  DefaultPreference.get('appMode').then(mode => {
    if (mode == null)
      DefaultPreference.set('appMode', 'parking')
        .then(mode => {
          console.log('modeset');
        })
        .catch(err => {
          console.log(err);
        });
  });

  DefaultPreference.get('token').then(t => {
    if (t && (token == null || token == '')) {
      setToken(t);
    }
  });

  if (token == null || token == '') {
    return (
      <NavigationContainer>
        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setUsername(text)}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <View style={styles.buttonArea}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.label} onPress={login}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonSpace} />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.label}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <AppTabbar {...props} />}>
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Scan" component={Scan} options={{tabBarBadge: 3}} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//org.reactjs.native.example.plateapp

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  field: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    width: 250,
    marginTop: 200,
  },
  label: {
    fontSize: 20,
  },
  input: {
    height: 50,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: '#eeeeee',
    padding: 10,
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#ffb500',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonArea: {
    height: 50,
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonSpace: {
    width: 10,
  },
});

export default App;
