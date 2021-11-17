import {AppText} from '@component';
import {scaleWidth} from '@util';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface PropertyChoicesProps {
  data: [];
}

export const PropertyChoices = (props: PropertyChoicesProps) => {
  const {data} = props;

  return (
    <View style={{width: scaleWidth(250)}}>
      {data?.length > 0 &&
        data.map((item: any) => {
          console.log('vv', item);
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: scaleWidth(15),
              }}>
              <AppText style={styles.Txt}>{item}</AppText>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  Txt: {
    marginRight: scaleWidth(15),
    alignSelf: 'center',
  },
});
