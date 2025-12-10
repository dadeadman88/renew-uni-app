import { theme } from '@/utils/designSystem';
import * as React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { View, ViewProps } from 'react-native-ui-lib';
import AppBar from './Header';

const {height} = Dimensions.get('window');

interface ContainerProps {
  backgroundColor?: string;
  children: any;
  scrollProps?: any;
  containerProps?: ViewProps;
  scrollEnabled?: boolean;
  appBar?: boolean;
  appBarTitle?: string;
  appBarSubtitle?: string;
  back?: boolean;
  light?: boolean;
  noLeft?: boolean;
  LeftPress?: () => void;
  appBarRight?: any;
  extraLargeAppBarTitle?: boolean;
  onAppBarTitlePress?: () => void;
}

const Container = ({
  scrollEnabled = true,
  containerProps,
  children,
  LeftPress,
  appBar = true,
  appBarTitle,
  back = false,
  light = false,
  noLeft = false,
  scrollProps,
  backgroundColor = theme.color.containerBackground,
  appBarSubtitle = '',
  appBarRight,
  extraLargeAppBarTitle,
  onAppBarTitlePress,
}: ContainerProps) => {

  const isDarkMode = useColorScheme() === 'dark';


  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: isDarkMode ? theme.dark_color.containerBackground : backgroundColor}}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={{
          height: scrollEnabled
            ? null
            : Platform.OS === 'android'
            ? height * 0.95
            : height * 0.9,
        }}
        style={{flex: 1, backgroundColor: 'transparent'}}
        {...scrollProps}>
        {appBar && (
          <AppBar
            backgroundColor={isDarkMode ? theme.color.textColor : backgroundColor}
            drawer={!back}
            LeftPress={LeftPress}
            title={appBarTitle}
            noLeft={noLeft}
            light={light}
            subtitle={appBarSubtitle}
            right={appBarRight}
            extraLarge={extraLargeAppBarTitle}
            titlePress={onAppBarTitlePress}
          />
        )}
        <View flex style={{paddingHorizontal: '4%',paddingBottom: '4%'}} {...containerProps}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Container;
