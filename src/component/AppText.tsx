import {colors, fontFamily, SIZE} from '@util';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface AppTextProps {
  children: any;
  style?: any;
  onPress?: any;
  numberOfLines?: number;
}

const AppText = React.memo((props: AppTextProps) => {
  const {children, style, onPress, numberOfLines} = props;
  return (
    <>
      <Text
        style={[styles.txtStyle, style]}
        onPress={onPress}
        numberOfLines={numberOfLines}>
        {children}
      </Text>
    </>
  );
});

const styles = StyleSheet.create({
  txtStyle: {
    ...fontFamily.fontWeight400,
    fontSize: SIZE.base_size,
    color: colors.textPrimary,
  },
});

export {AppText};
