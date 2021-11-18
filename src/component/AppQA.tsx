import {AppButton, AppText} from '@component';
import {AppQAProps, mockProps, pickerProps} from '@interfaces';
import {colors, DEVICE, fontFamily, scaleSize, scaleWidth, SIZE} from '@util';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import HighlightText from '@sanar/react-native-highlight-text';

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
    typeTitle,
    error,
    titleHighlight,
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
    marginBottom: SIZE.medium_space,
  };

  const titleStyle =
    typeTitle === 'base'
      ? [styles.baseTitle, customStyleTitle]
      : typeTitle === 'center-mix'
      ? [styles.mixTitle, customStyleTitle]
      : [styles.title, customStyleTitle];

  const selected = value
    ? isMultiChoice
      ? [...value[name]]
      : {...value[name]}
    : null;

  const styleViewButton = [
    customStyleViewButton,
    {
      flex: typeList === 'row' ? 1 : 0,
    },
  ];
  // console.log({selected, value});

  const onChangeValue = (item: mockProps, isActive: boolean) => {
    let nValue: any = {...value};
    console.log({nValue});
    if (isMultiChoice) {
      if (isActive) {
        nValue[name] = value[name].filter(
          (itm: mockProps) => itm.value !== item.value,
        );
      } else {
        const nItem: pickerProps = {...item};
        if (nItem.hasOwnProperty('icon')) {
          delete nItem.icon;
        }
        nValue[name].push(nItem);
      }
    } else {
      const nItem: pickerProps = {...item};
      if (nItem.hasOwnProperty('icon')) {
        delete nItem.icon;
      }
      nValue[name] = item;
    }

    if (setValue) setValue(nValue);
  };

  return (
    <View style={containerView}>
      {typeTitle === 'center-mix' && titleHighlight ? (
        <HighlightText
          style={titleStyle}
          highlightStyle={{color: colors.primary}}
          searchWords={titleHighlight || []}
          textToHighlight={title}
        />
      ) : (
        <>
          <AppText style={titleStyle}>{title}</AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </>
      )}

      {!!error && <AppText style={styles.error}>{error}</AppText>}
      <View style={listStyle}>
        {data.map((item: mockProps) => {
          const isActive =
            isMultiChoice && selected?.length > 0
              ? selected.findIndex(
                  (itm: mockProps) => item.value == itm?.value,
                ) > -1
              : item.value == selected?.value;
          return (
            <View key={item.value} style={styleViewButton}>
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
    marginTop: SIZE.base_space - 4,
  },
  mixTitle: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    color: colors.textThirdPrimary,
    textAlign: 'center',
    marginBottom: SIZE.padding - SIZE.base_space,
    marginTop: SIZE.base_space,
  },
  baseTitle: {
    ...fontFamily.fontCampWeight500,
    fontSize: SIZE.base_size - 1,
    lineHeight: SIZE.base_size - 1,
    color: colors.primary,
  },
  subTitle: {
    lineHeight: SIZE.base_size * 1.6,
    color: colors.textThirdPrimary,
    ...fontFamily.fontCampWeight500,
  },
  error: {
    marginTop: SIZE.base_space,
    color: colors.red,
    fontSize: scaleSize(15),
  },
});

export {AppQA};
