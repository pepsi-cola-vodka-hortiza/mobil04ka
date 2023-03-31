import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {GRAY_1, GRAY_3, GRAY_4, GRAY_5, PINK_1} from '../constants/colors';

type Props = {};

const UserForm: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = () => {
    // this function is called when the user presses the form button
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        placeholderTextColor={GRAY_4}
        value={email}
        textContentType="emailAddress"
        autoComplete="email"
        autoFocus={true}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        placeholderTextColor={GRAY_4}
        value={password}
        textContentType="password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: GRAY_1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: GRAY_3,
    width: '100%',
  },
  buttonContainer: {
    backgroundColor: GRAY_5,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  buttonText: {
    fontSize: 16,
    color: PINK_1,
  },
});
