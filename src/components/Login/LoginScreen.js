// #6 Email Authentication using Firebase Authentication in React Native App
// https://aboutreact.com/react-native-firebase-authentication/

// Import React and Component
import React, {
  useState,
  createRef,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {Button, Card, Text} from 'react-native-paper';
import {ICheckoutItem} from '../../data.interface';
import {foodList} from '../../data';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [user, setUser] = useState(null);
  const userRef = useRef(null);
  const passwordInputRef = createRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let curUser = auth().currentUser;
      if (curUser) setUser(curUser);
      userRef.current = curUser;
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, user]);

  const handleSubmitPress = useCallback(() => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(user => {
        // If server response message same as Data Matched
        setUser(user);
        if (user) navigation.navigate('Restaurants');
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') setErrortext(error.message);
        else if (error.code === 'auth/user-not-found')
          setErrortext('No User Found');
        else {
          setErrortext('Please check your email id or password');
        }
      });
  }, [navigation, userEmail, userPassword]);

  const renderView = useCallback(
    curUser => {
      return (
        <View>
          {userRef && userRef.current ? (
            <Card style={styles.cardContainer}>
              <Card.Content style={styles.contentStyle}>
                <Text variant="bodyLarge">
                  Name: {userRef.current.displayName}
                </Text>
                <Text variant="bodyLarge">Email: {userRef.current.email}</Text>
                <Button
                  elevation={1}
                  style={styles.logoutButton}
                  mode="elevated"
                  onPress={() => {
                    setUser(null);
                    auth().signOut();
                    userRef.current = null;
                  }}>
                  <Text variant="bodyMedium">Logout</Text>
                </Button>
              </Card.Content>
            </Card>
          ) : (
            <KeyboardAvoidingView enabled>
              <View style={{alignItems: 'center'}}></View>
              <View style={styles.sectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserEmail => setUserEmail(UserEmail)}
                  placeholder="Enter Email"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.sectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserPassword => setUserPassword(UserPassword)}
                  placeholder="Enter Password"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}> {errortext} </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                New Here ? Register
              </Text>
            </KeyboardAvoidingView>
          )}
        </View>
      );
    },
    [
      errortext,
      handleSubmitPress,
      navigation,
      passwordInputRef,
      userRef.current,
    ],
  );

  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {renderView(user)}
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  logoutButton: {
    margin: 'auto',
    // padding: 20,
    // width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#808080',
    text: '#fff',
    // width: '50%',
    // left: '50%',
  },
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  cardContainer: {
    margin: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  contentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
