import {AppInput, AppText} from '@component';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {colors, DEVICE, fontFamily, SIZE, SLIDER} from '@util';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface AppSliderProps {
  onValuesChangeFinish: (values: any) => void;
  min_range_value: number;
  max_range_value: number;
  min_range?: number;
  max_range?: number;
}

const AppSlider = React.memo((props: AppSliderProps) => {
  const {onValuesChangeFinish, min_range, max_range} = props;
  const min_range_value = props.min_range_value || 0;
  const max_range_value = props.max_range_value || 0;
  const min_default = min_range || SLIDER.MIN_PRICE;
  const max_default = max_range || SLIDER.MAX_PRICE;

  return (
    <>
      <View style={styles.container}>
        <AppInput
          label={'Min'}
          value={min_range_value.toString()}
          name={'min_range_value'}
          iconLeft={'dolar'}
          editable={false}
          containerStyle={{flex: 1}}
          inputStyle={{fontSize: SIZE.base_size + 2}}
          typeInput={'price'}
        />
        <View style={styles.line} />
        <AppInput
          label={'Max'}
          value={max_range_value.toString()}
          name={'max_range_value'}
          iconLeft={'dolar'}
          editable={false}
          containerStyle={{flex: 1}}
          inputStyle={{fontSize: SIZE.base_size + 2}}
          typeInput={'price'}
        />
      </View>
      <MultiSlider
        values={[min_range_value, max_range_value]}
        sliderLength={DEVICE.width - 2 * SIZE.padding}
        onValuesChangeFinish={onValuesChangeFinish}
        min={min_default}
        max={max_default}
        allowOverlap={false}
        trackStyle={styles.trackStyle}
        selectedStyle={{
          backgroundColor: colors.primary,
        }}
        markerStyle={styles.markerStyle}
      />
      <View style={styles.bottomView}>
        <AppText style={styles.textBottom}>{`${min_default}`}</AppText>
        <AppText style={styles.textBottom}>{`${max_default}`}</AppText>
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
