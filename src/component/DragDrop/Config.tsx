import {scaleWidth, SIZE} from '@util';
import {Dimensions} from 'react-native';
import {Easing} from 'react-native-reanimated';

export interface Positions {
  [id: string]: number;
}

const {width} = Dimensions.get('window');
export const MARGIN = 8;
export const ITEM_SIZE = scaleWidth(70);
export const COL = 3;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (position: number) => {
  'worklet';

  return {
    x:
      position % COL === 0
        ? 0
        : position % COL === 1
        ? ITEM_SIZE
        : ITEM_SIZE * 2,
    y: Math.floor(position / COL) * ITEM_SIZE,
  };
};

export const getOrder = (tx: number, ty: number, max: number) => {
  'worklet';

  const x = Math.round(tx / ITEM_SIZE) * ITEM_SIZE;
  const y = Math.round(ty / ITEM_SIZE) * ITEM_SIZE;
  const row = Math.max(y, 0) / ITEM_SIZE;
  const col = Math.max(x, 0) / ITEM_SIZE;
  return Math.min(row * COL + col, max);
};
