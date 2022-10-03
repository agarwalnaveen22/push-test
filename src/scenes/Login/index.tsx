import React, {useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import {RootStackParamsList} from '../../routes';
import {Button, Header, InputBox} from 'components/atoms';
import {sendPush} from 'services';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
};

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const LoginScene = ({navigation}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendPushNotification = useCallback(
    async (token: string) => {
      try {
        await sendPush(token);
        setLoading(false);
        navigation.navigate('Home');
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    },
    [navigation],
  );

  const getFCMToken = useCallback(async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    sendPushNotification(token);
  }, [sendPushNotification]);

  const authenticate = useCallback(
    (values: {email: string; password: string}) => {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(async () => {
          // Account created / Signed IN
          await getFCMToken();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(async () => {
                // Signed IN
                await getFCMToken();
              })
              .catch(() => {
                setLoading(false);
                Alert.alert('Error', 'Wrong email address or password');
              });
          } else if (error.code === 'auth/invalid-email') {
            setLoading(false);
            Alert.alert('Error', 'That email address is invalid!');
          } else {
            setLoading(false);
            console.error(error);
          }
        });
    },
    [getFCMToken],
  );

  return (
    <SafeAreaView className="flex-1">
      <Header title="Authentication" />
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => authenticate(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <View className="flex-1 items-center mt-12 px-4">
            <InputBox
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              error={errors.email}
            />
            <InputBox
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              error={errors.password}
            />
            <View className="mt-4">
              <Button
                onPress={handleSubmit}
                text="Submit"
                disabled={!isValid || loading}
                loading={loading}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScene;
