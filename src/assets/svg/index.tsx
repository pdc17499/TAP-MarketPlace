import {colors} from '@util';
import React from 'react';
import Svg, {
  Path,
  Circle,
  Rect,
  G,
  Defs,
  ClipPath,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';

type iconProps = {
  width?: number;
  height?: number;
  iconFillColor?: string;
  style?: any;
};

export const EyeIconOpen = () => (
  <Svg width={24} height={16} viewBox="0 0 24 16" fill="none">
    <Path
      d="M12 1.25C4.5 1.25 1.5 8 1.5 8s3 6.75 10.5 6.75S22.5 8 22.5 8s-3-6.75-10.5-6.75z"
      stroke={colors.primary}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11a3 3 0 100-6 3 3 0 000 6z"
      stroke={colors.primary}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EyeIconClose = () => (
  <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
    <Path
      d="M4.5 4.593l15 16.5M14.523 15.618a3.75 3.75 0 01-5.046-5.55"
      stroke={colors.primary}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.937 7.274C3.115 9.209 1.5 12.843 1.5 12.843s3 6.75 10.5 6.75c1.757.013 3.493-.392 5.062-1.181M19.557 16.696c2.044-1.83 2.943-3.853 2.943-3.853s-3-6.75-10.5-6.75a11.75 11.75 0 00-1.939.157M12.706 9.16a3.752 3.752 0 013.028 3.33"
      stroke={colors.primary}
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const DownIcon = (props: iconProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      d="M11.375 5.25L7 9.625 2.625 5.25"
      stroke="#808190"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconBack = (props: iconProps) => (
  <Svg width={29} height={20} fill="none" {...props}>
    <Path
      d="M28 9.655H2.979M8.34 4.224L2.98 9.655l5.361 5.431"
      stroke="#191718"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
