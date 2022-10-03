import React from 'react';
import {Pressable} from 'react-native';
import Label from '../label';
import Spinner from '../spinner';

type Props = {
  text: string | number | undefined;
  disabled?: boolean;
  onPress: () => void;
  loading?: boolean;
};

const Button = ({text, disabled, onPress, loading}: Props) => {
  return (
    <Pressable
      className="p-3 bg-amber-600 justify-center items-center w-20 rounded"
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <Spinner />
      ) : (
        <Label text={text} fontWeight="font-bold" color="text-white" />
      )}
    </Pressable>
  );
};

export default Button;
