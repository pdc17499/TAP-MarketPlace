import {AppButton, AppText} from '@component';
import {AppQAProps, mockProps} from '@interfaces';
import {colors, DEVICE, fontFamily, scaleWidth, SIZE} from '@util';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const AppQA = React.memo((props: AppQAProps) => {
  const {
    data,
    title,
    value,
    typeList,
    children,
    isMultiChoice,
    customStyleTitle,
    customStyleViewButton,
    setValue,
    name,
    subTitle,
    isFlex,
  } = props;
  const listStyle = typeList === 'column' ? {} : styles.listRow;
  const itemStyle =
    typeList === 'row'
      ? styles.itemRow
      : typeList === 'wrap'
      ? styles.itemWrap
      : typeList === 'even'
      ? styles.itemRowEven
      : styles.itemColumn;

  const containerView = {
    flex: isFlex ? 1 : 0,
    marginBottom: SIZE.base_space * 2,
  };

  const selected = value
    ? isMultiChoice
      ? [...value[name]]
      : {...value[name]}
    : null;
  console.log({selected, value});

  const onChangeValue = (item: mockProps, isActive: boolean) => {
    let nValue: any = {...value};
    console.log({nValue});
    if (isMultiChoice) {
      if (isActive) {
        nValue[name] = value[name].filter(
          (itm: mockProps) => itm.value !== item.value,
        );
      } else {
        nValue[name].push(item);
      }
    } else {
      nValue[name] = item;
    }

    if (setValue) setValue(nValue);
  };

  return (
    <View style={containerView}>
      <AppText style={[styles.title, customStyleTitle]}>{title}</AppText>
      {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}

      <View style={listStyle}>
        {data.map((item: mockProps) => {
          const isActive =
            isMultiChoice && selected?.length > 0
              ? selected.findIndex(
                  (itm: mockProps) => item.value == itm?.value,
                ) > -1
              : item.value == selected?.value;
          return (
            <View key={item.id} style={customStyleViewButton}>
              <AppButton
                onPress={() => onChangeValue(item, isActive)}
                isActive={isActive}
                typeButton={'linear'}
                title={item.value}
                customStyleButton={itemStyle}
              />
              {isActive && children}
            </View>
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  listRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: -SIZE.base_space,
  },
  itemRow: {
    marginRight: SIZE.base_space,
    minWidth: scaleWidth(52),
  },
  itemWrap: {
    paddingHorizontal: SIZE.padding - 2,
    marginRight: SIZE.base_space,
  },
  itemRowEven: {
    marginRight: SIZE.base_space,
    width:
      (DEVICE.width - SIZE.padding * 2 - SIZE.base_space) / 2 - scaleWidth(1),
  },
  itemColumn: {},
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding - SIZE.base_space,
    marginTop: SIZE.base_space,
  },
  subTitle: {
    lineHeight: SIZE.base_size * 1.6,
    color: colors.textThirdPrimary,
    ...fontFamily.fontCampWeight500,
  },
});

export {AppQA};
