import {AppInput, AppText} from '@component';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  colors,
  DEVICE,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  SLIDER,
} from '@util';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface AppSliderProps {
  onValuesChangeFinish: (values: any) => void;
  min_range_value: number;
  max_range_value: number;
  min_range?: number;
  max_range?: number;
  iconLeft?: 'dolar' | 'floor_size';
  sliderLength?: number;
}

const AppSlider = React.memo((props: AppSliderProps) => {
  const {onValuesChangeFinish, min_range, max_range, iconLeft, sliderLength} =
    props;
  const min_range_value = props.min_range_value || 0;
  const max_range_value = props.max_range_value || 0;
  const min_default = min_range || SLIDER.MIN_PRICE;
  const max_default = max_range || SLIDER.MAX_PRICE;
  const [slideValue, setSlideValue] = useState({
    min: 0,
    max: 1,
  });

  useEffect(() => {
    const nValue = {
      min: min_range_value,
      max: max_range_value,
    };

    setSlideValue({...nValue});
  }, [min_range_value, max_range_value]);

  const onValuesChange = (values: any) => {
    const nValue = {
      min: values[0],
      max: values[1],
    };
    setSlideValue({...nValue});
  };

  return (
    <Pressable>
      <View style={styles.container}>
        <AppInput
          label={'Min'}
          value={slideValue.min.toString()}
          // name={'min_range_value'}
          iconLeft={iconLeft}
          editable={false}
          containerStyle={{flex: 1}}
          inputStyle={styles.inputStyle}
          typeInput={'price'}
          customStyleLabel={{color: colors.textSecondPrimary}}
        />
        <View style={styles.line} />
        <AppInput
          label={'Max'}
          value={slideValue.max.toString()}
          // name={'max_range_value'}
          iconLeft={iconLeft}
          editable={false}
          containerStyle={{flex: 1}}
          inputStyle={styles.inputStyle}
          typeInput={'price'}
          customStyleLabel={{color: colors.textSecondPrimary}}
        />
      </View>
      <MultiSlider
        values={[slideValue.min, slideValue.max]}
        sliderLength={sliderLength || DEVICE.width - 2 * SIZE.padding}
        onValuesChange={onValuesChange}
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
        <AppText style={styles.textBottom} isPrice>{`${min_default}`}</AppText>
        <AppText style={styles.textBottom} isPrice>{`${max_default}`}</AppText>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: SIZE.base_space,
    marginTop: SIZE.base_space / 2,
  },
  line: {
    height: 1.5,
    width: 8,
    backgroundColor: '#D8D8D8',
    marginBottom: SIZE.input_height / 2,
    marginHorizontal: 5,
  },
  trackStyle: {
    marginTop: -3,
    height: 6,
    backgroundColor: colors.borderPrimary,
  },
  markerStyle: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.white,
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBottom: {
    color: colors.textSecondPrimary,
    ...fontFamily.fontWeight500,
  },
  inputStyle: {
    fontSize: scaleSize(18),
    paddingTop: DEVICE.isIos ? 2 : SIZE.base_space - scaleWidth(5),
  },
});

export {AppSlider};
