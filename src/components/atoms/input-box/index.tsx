import Label from 'components/atoms/label';
import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';

type Props = {
  placeholder: TextInputProps['placeholder'];
  onChangeText: TextInputProps['onChangeText'];
  onBlur: TextInputProps['onBlur'];
  value: TextInputProps['value'];
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  error?: any;
};

const InputBox = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType,
  secureTextEntry,
  error,
}: Props) => {
  return (
    <View className="w-full">
      <TextInput
        className="border rounded border-slate-300 pl-4 my-2 h-10"
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {error && <Label text={error} color="text-red-500" />}
    </View>
  );
};

export default InputBox;
