import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import {RootStackParamsList} from '../../routes';
import {Header, Label, Spinner} from 'components/atoms';
import auth from '@react-native-firebase/auth';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
};

const HomeScene = ({navigation}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      setMessage(remoteMessage?.data?.message);
    });

    return unsubscribe;
  }, []);
  const logout = useCallback(() => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        setLoading(false);
        navigation.replace('Start');
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  }, [navigation]);
  return (
    <SafeAreaView className="flex-1">
      <Header title="Welcome" />
      <View className="flex-1 justify-center items-center px-4">
        <Label text={message ? message : 'No message found'} />
      </View>
      <TouchableOpacity
        className="items-center justify-center w-full h-10 bg-amber-600"
        onPress={logout}>
        {loading ? (
          <Spinner />
        ) : (
          <Label
            text="Logout"
            textSize="text-base"
            fontWeight="font-bold"
            color="text-white"
          />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScene;
