import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  GRAY_1,
  GRAY_3,
  GRAY_4,
  GRAY_5,
  PINK_1,
  TEXT_INPUT_GREY,
} from '../../../constants/colors';
import {AuthenticationFormType} from './types';

type Props = {
  formType: AuthenticationFormType;
  action: (variables: any) => Promise<any>; // типизировать
};

const UserForm: React.FC<Props> = ({action, formType}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [userName, setUserName] = useState<string>();

  const handleSubmit = useCallback(async () => {
    await action({variables: {email, password}});
  }, [action, email, password]);

  return (
    <View style={styles.container}>
      {formType === AuthenticationFormType.SignUp && (
        <TextInput
          style={styles.input}
          onChangeText={text => setUserName(text)}
          placeholder="Username"
          placeholderTextColor={GRAY_4}
          value={userName}
          autoCapitalize="none"
        />
      )}
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        placeholderTextColor={GRAY_4}
        value={email}
        textContentType="emailAddress"
        autoComplete="email"
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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  container: {
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
    color: TEXT_INPUT_GREY,
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
