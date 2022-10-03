import React, {useCallback} from 'react';
import {View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import {RootStackParamsList} from '../../routes';
import {Button} from 'components/atoms';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
};

const StartScene = ({navigation}: Props) => {
  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      navigateToLogin();
    }
  }, [navigateToLogin]);

  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Button text={'Start'} onPress={requestUserPermission} />
      </View>
    </View>
  );
};

export default StartScene;
