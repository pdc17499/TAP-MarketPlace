import {AppInput, AppText} from '@component';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {colors, DEVICE, fontFamily, SIZE, SLIDER} from '@util';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface AppSliderProps {
  onValuesChangeFinish: (values: any) => void;
  min_range: number;
  max_range: number;
}

const AppSlider = React.memo((props: AppSliderProps) => {
  const {onValuesChangeFinish, min_range, max_range} = props;

  return (
    <>
      <View style={styles.container}>
        <AppInput
          label={'Min'}
          value={min_range.toString()}
          name={'min_range'}
          iconLeft={'dolar'}
          editable={false}
          containerStyle={{flex: 1}}
          inputStyle={{fontSize: SIZE.base_size + 2}}
        />
        <View style={styles.line} />
        <AppInput
          label={'Max'}
          value={max_range.toString()}
          name={'max_range'}
          iconLeft={'dolar'}
          editable={false}
          containerStyle={{flex: 1}}
          inputStyle={{fontSize: SIZE.base_size + 2}}
        />
      </View>
      <MultiSlider
        values={[min_range, max_range]}
        sliderLength={DEVICE.width - 2 * SIZE.padding}
        onValuesChangeFinish={onValuesChangeFinish}
        min={SLIDER.min}
        max={SLIDER.max}
        allowOverlap={false}
        trackStyle={styles.trackStyle}
        selectedStyle={{
          backgroundColor: colors.primary,
        }}
        markerStyle={styles.markerStyle}
      />
      <View style={styles.bottomView}>
        <AppText style={styles.textBottom}>{`${SLIDER.min}`}</AppText>
        <AppText style={styles.textBottom}>{`${SLIDER.max}`}</AppText>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: SIZE.base_space / 2,
  },
  line: {
    height: 1.5,
    width: 8,
    backgroundColor: colors.bgInput,
    marginBottom: SIZE.input_height / 2,
    marginHorizontal: 5,
  },
  trackStyle: {
    marginTop: -3,
    height: 6,
    backgroundColor: colors.borderPrimary,
  },
  markerStyle: {borderColor: colors.primary, borderWidth: 2},
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBottom: {
    color: colors.textSecondPrimary,
    ...fontFamily.fontWeight500,
  },
});

export {AppSlider};
