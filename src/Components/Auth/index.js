import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NavigationContainer,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
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

const Auth = ({}) => {
  const login = () => {};
  return (
    <>
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
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.label}>Login</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpace} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.label}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Auth;
