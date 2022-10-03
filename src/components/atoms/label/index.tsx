import React from 'react';
import {Text} from 'react-native';

type Props = {
  text: string | number | undefined;
  textSize?: string;
  paddingTop?: string;
  fontWeight?: string;
  color?: string;
};

const Label = ({text, textSize, fontWeight, color}: Props) => {
  return <Text className={`${textSize} ${fontWeight} ${color}`}>{text}</Text>;
};

export default Label;
