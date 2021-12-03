import {AppButton, AppQA, AppText} from '@component';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  colors,
  fontFamily,
  mergeArrayServer,
  scaleSize,
  scaleWidth,
  SIZE,
} from '@util';
import {ROOM_UNIT_HOWNER, TENANT_PROPERTY} from '@mocks';
import {avatar_default, IconHandShake} from '@assets';

interface HomeownerProp {
  homeower: any;
}

export const MatchesHomeowner = (props: HomeownerProp) => {
  const {homeower} = props;

  const listSample = [
    ...ROOM_UNIT_HOWNER.life_style,
    ...ROOM_UNIT_HOWNER.preferences,
  ];

  const listLifeStyle = mergeArrayServer(homeower.life_style, listSample);

  console.log({listLifeStyle});

  return (
    <View>
      <View style={styles.nameView}>
        <Image
          source={homeower?.image ? {uri: homeower?.image} : avatar_default}
          style={styles.avatar}
        />
        <AppText style={styles.name}>{homeower.user_name}</AppText>
      </View>
      <View style={styles.tableView}>
        <View style={styles.genderView}>
          <View>
            <AppText style={styles.genderTitle}>{'Age'}</AppText>
            <AppText style={styles.genderValue}>{homeower.age_group}</AppText>
          </View>
          <View style={styles.line} />
          <View>
            <AppText style={styles.genderTitle}>{'Gender'}</AppText>
            <AppText style={styles.genderValue}>{homeower.gender}</AppText>
          </View>
          <View style={styles.line} />
          <View>
            <AppText style={styles.genderTitle}>{'From'}</AppText>
            <AppText style={styles.genderValue}>{homeower.nationality}</AppText>
          </View>
        </View>
        {listLifeStyle?.length > 0 ? (
          <View style={styles.lifeStyleView}>
            <IconHandShake />
            <AppText style={styles.subTitleLifeStyle}>{'Similarity'}</AppText>
            <AppQA
              title={'You’re both...'}
              data={listLifeStyle || []}
              showIconLeft
              typeList={'wrap'}
              widthLeftIcon={22}
              heightLeftIcon={22}
              fillColorIcon={colors.greenIcon}
              customStyleTitle={styles.titleLifestyle}
              customStyleTitleButton={styles.titleButtonLifestyle}
              customStyleButton={styles.buttonLifestyle}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameView: {
    backgroundColor: colors.bgInput,
    padding: SIZE.padding / 2,
    marginVertical: SIZE.base_space,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: 8,
  },
  name: {
    marginLeft: SIZE.padding / 2,
    ...fontFamily.fontCampWeight500,
  },
  tableView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderProfileList,
    borderTopColor: colors.borderProfileList,
    borderTopWidth: 1,
  },
  line: {
    width: 1,
    height: 26,
    backgroundColor: colors.borderPrimary,
  },
  genderTitle: {
    fontSize: scaleSize(13),
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
    textAlign: 'center',
    marginBottom: SIZE.base_space / 2,
  },
  genderValue: {
    ...fontFamily.fontCampWeight500,
    color: colors.textFouthPrimary,
    textAlign: 'center',
  },
  genderView: {
    padding: scaleWidth(20),
    paddingVertical: SIZE.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftColor: colors.borderProfileList,
    borderRightColor: colors.borderProfileList,
    borderBottomColor: colors.borderProfileList,
    borderWidth: 1,
    borderTopWidth: 0,
  },
  subTitleLifeStyle: {
    ...fontFamily.fontCampWeight500,
    fontSize: scaleSize(14),
    color: colors.textSecondPrimary,
    marginTop: 4,
  },
  lifeStyleView: {
    padding: scaleWidth(20),
    paddingRight: 0,
    paddingBottom: 0,
    borderLeftColor: colors.borderProfileList,
    borderRightColor: colors.borderProfileList,
    borderTopColor: colors.borderProfileList,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  titleLifestyle: {
    color: colors.orange,
    fontSize: scaleSize(18),
    ...fontFamily.fontWeight600,
    marginBottom: -SIZE.base_space / 2,
    marginTop: 0,
  },
  titleButtonLifestyle: {
    marginLeft: 10,
    color: colors.textFouthPrimary,
    fontSize: scaleSize(14),
  },
  buttonLifestyle: {
    borderRadius: 20,
    minHeight: scaleWidth(40),
    paddingHorizontal: SIZE.base_space,
    marginBottom: -SIZE.base_space / 4,
  },
});
