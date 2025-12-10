import * as React from 'react';
import { Picker, PickerProps, View } from 'react-native-ui-lib';
import { theme } from '../utils/Constants';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from './Icon';
import { Platform } from 'react-native';

const PickerC = (props: PickerProps) => {
  return (
    <Picker
      placeholder="Select"
      black
      style={{ marginEnd: 10 }}
      height={Platform.select({
        android: verticalScale(45),
        ios: verticalScale(40),
      })}
      medium
      small
      placeholderTextColor={'#aaa'}
      trailingAccessory={
        <View absR style={{ right: scale(5), ...props?.iconStyle }}>
          <Icon
            vector="Entypo"
            name={props?.iconName ? props?.iconName : 'chevron-down'}
            color={props?.iconColor ? props?.iconColor : theme.color.secondary}
            size={20}
          />
        </View>
      }
      {...props}
      labelProps={{
        medium: true,
        small: true,
        'marginB-10': true,
        ...props.labelProps,
      }}
      fieldStyle={{
        borderWidth: 1,
        borderColor: theme.color.secondary,
        borderRadius: 10,
        paddingHorizontal: '6%',
        ...props?.fieldStyle,
      }}
      floatingPlaceholderStyle={{
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        fontFamily: theme.font.regular,
        ...props?.floatingPlaceholderStyle,
      }}
    />
  );
};

export default PickerC;
