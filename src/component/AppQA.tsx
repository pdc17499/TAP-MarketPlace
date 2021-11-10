import {AppButton, AppText} from '@component';
import {AppQAProps, mockProps} from '@interfaces';
import {colors, fontFamily, SIZE} from '@util';
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
  const listStyle = typeList === 'row' ? styles.listRow : {};
  const itemStyle = typeList === 'row' ? styles.itemRow : styles.itemColumn;
  const containerView = {
    flex: isFlex ? 1 : 0,
    marginBottom: SIZE.big_space - SIZE.medium_space,
  };
  const selected = isMultiChoice ? [...value[name]] : {...value[name]};
  console.log({selected});

  const onChangeValue = (item: mockProps, isActive: boolean) => {
    let nValue: any = {...value};
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
                customStyleButton={[itemStyle]}
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
    paddingHorizontal: SIZE.padding - 2,
    marginRight: SIZE.base_space,
    marginTop: SIZE.base_space,
  },
  itemColumn: {
    marginTop: SIZE.base_space,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding - SIZE.base_space,
    marginTop: SIZE.padding,
  },
  subTitle: {
    lineHeight: SIZE.base_size * 1.6,
    color: colors.textThirdPrimary,
    ...fontFamily.fontCampWeight500,
  },
});

export {AppQA};
