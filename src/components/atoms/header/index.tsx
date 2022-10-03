import React from 'react';
import {View} from 'react-native';
import Label from '../label';

type Props = {
  title: string;
};

const Header = ({title}: Props) => {
  return (
    <View className="justify-center items-center bg-amber-600 py-1">
      <Label
        text={title}
        textSize="text-base"
        fontWeight="font-bold"
        color="text-white"
      />
    </View>
  );
};

export default Header;
