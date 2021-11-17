import { colors } from '@util';
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
  Mask,
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

export const CaretRight = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M7.5 3.75L13.75 10 7.5 16.25"
      stroke="#B09E88"
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
      stroke={props.iconFillColor || '#191718'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconEmail = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
      stroke="#B09E88"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.977 19.5A9 9 0 1121 12c0 2.07-.75 3.75-2.625 3.75S15.75 14.07 15.75 12V8.25"
      stroke="#B09E88"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const Key = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M8.735 11.515a6.744 6.744 0 113.75 3.75h0L11.25 16.5H9v2.25H6.75V21H3v-3.75l5.735-5.735h0z"
      stroke="#B09E88"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      opacity={0.5}
      d="M16.875 7.5a.375.375 0 100-.75.375.375 0 000 .75z"
      stroke="#B09E88"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.875 8.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
      fill="#B09E88"
    />
  </Svg>
);

export const IconNext = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M3.125 10h13.75M11.25 4.375L16.875 10l-5.625 5.625"
      stroke="#B09E88"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconPickLocation = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 1.5a8.26 8.26 0 00-8.25 8.25c0 7.059 7.5 12.39 7.819 12.614a.752.752 0 00.861 0c.32-.223 7.82-5.555 7.82-12.614A8.26 8.26 0 0012 1.5zm0 5.25a3 3 0 110 6 3 3 0 010-6z"
      fill={props.iconFillColor || '#805D27'}
    />
  </Svg>
);

export const IconClear = (props: iconProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M15.625 4.375l-11.25 11.25M15.625 15.625L4.375 4.375"
      stroke={props.iconFillColor || '#AAA'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconDola = (props: iconProps) => (
  <Svg width={11} height={18} viewBox="0 0 11 18" fill="none" {...props}>
    <Path
      d="M7.278 8.642L5.568 8.3c-1.314-.252-2.034-.756-2.034-1.728 0-1.188 1.026-1.854 2.592-1.854 1.782 0 2.664.792 2.88 2.088h1.908c-.234-2.376-1.962-3.42-3.852-3.69V.974H5.37v2.088c-2.358.216-3.888 1.602-3.888 3.654 0 1.8 1.062 2.97 3.348 3.402l2.142.414c1.44.252 1.926.918 1.926 1.656 0 1.134-.99 1.8-2.592 1.8-1.944 0-3.168-.918-3.402-2.466H.978c.216 2.376 1.872 3.888 4.392 4.158v2.034h1.692v-2.052c2.322-.27 3.816-1.674 3.816-3.708 0-1.89-1.314-2.862-3.6-3.312z"
      fill={props.iconFillColor || '#AAA'}
    />
  </Svg>
);

export const IconResetMail = (props: iconProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      d="M3 4.375h15V15a.624.624 0 01-.625.625H3.625A.625.625 0 013 15V4.375z"
      stroke="#B09E88"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 4.375l-7.5 6.875L3 4.375"
      stroke="#B09E88"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArrowNext = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M3.125 10h13.75M11.25 4.375L16.875 10l-5.625 5.625"
      stroke={props.iconFillColor || '#B09E88'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconFloorSize = (props: iconProps) => (
  <Svg width={21} height={14} fill="none" {...props}>
    <Path
      d="M4.338 3.906c0-1.098.72-1.782 1.818-1.782.342 0 .846.09 1.296.234l.27-1.584C7.056.594 6.498.504 5.94.504 3.942.504 2.484 1.8 2.484 3.906V5.04H.09v1.566h2.394V13.5h1.854V6.606h3.348V5.04H4.338V3.906zm9.784 7.758c-.432.18-.936.324-1.44.324-1.044 0-1.656-.522-1.656-1.746V6.606h3.132V5.04h-3.132V1.926H9.154V5.04H7.156v1.566h1.998v3.636c0 2.178 1.152 3.474 3.312 3.474.576 0 1.188-.072 1.926-.342l-.27-1.71zm3.95-4.626l1.475-1.584c.954-1.026 1.296-1.674 1.296-2.412 0-1.116-.882-2.106-2.538-2.106-1.602 0-2.52.954-2.556 2.34h1.404c.036-.684.45-1.098 1.206-1.098.648 0 1.08.396 1.08.954 0 .54-.36.936-1.098 1.692l-2.556 2.664v.738h5.166V7.038h-2.88z"
      fill="#AAA"
    />
  </Svg>
);

export const IconUpload = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M8.063 7.686L12 3.75l3.938 3.936M12 14.25V3.753M20.25 14.25v5.25a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-5.25"
      stroke="#2A6B58"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconTakePhoto = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M19.5 19.5h-15A1.5 1.5 0 013 18V7.5A1.5 1.5 0 014.5 6h3L9 3.75h6L16.5 6h3A1.5 1.5 0 0121 7.5V18a1.5 1.5 0 01-1.5 1.5z"
      stroke="#2A6B58"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15.75A3.375 3.375 0 1012 9a3.375 3.375 0 000 6.75z"
      stroke="#2A6B58"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconTick = (props: iconProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      d="M17.375 5.625l-8.75 8.75L4.25 10"
      stroke="#B09E88"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconQuestion = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M12 21a9 9 0 100-18 9 9 0 000 18z"
      stroke="#B09E88"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 18a1.125 1.125 0 100-2.25A1.125 1.125 0 0012 18z"
      fill="#B09E88"
    />
    <Path
      d="M12.001 13.5v-.75a2.625 2.625 0 10-2.625-2.625"
      stroke="#B09E88"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconAddPhotos = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M20.25 4.5H3.75a.75.75 0 00-.75.75v13.5c0 .414.336.75.75.75h16.5a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75z"
      stroke="#2A6B58"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 15.75l4.72-4.72a.75.75 0 011.06 0l4.19 4.19a.75.75 0 001.06 0l1.94-1.94a.75.75 0 011.06 0L21 17.25"
      stroke="#2A6B58"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.625 10.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
      fill="#2A6B58"
    />
  </Svg>
);

export const IconAddVideos = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3z"
      stroke="#2A6B58"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.25 14v-3.031l2.625 1.515L15.5 14l-2.625 1.515-2.625 1.516V14z"
      fill="#fff"
      stroke="#2A6B58"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 7.5h18"
      stroke="#2A6B58"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M16.5 3l-3 4.5 3-4.5z" fill="#2A6B58" />
    <Path
      d="M16.5 3l-3 4.5M10.5 3l-3 4.5"
      stroke="#2A6B58"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconSkip = (props: iconProps) => (
  <Svg width={34} height={16} fill="none" {...props}>
    <Path
      d="M5.328.928c-2.416 0-4.016 1.28-4.016 3.264 0 1.6.944 2.64 2.976 3.024l1.904.368c1.28.224 1.712.816 1.712 1.472 0 1.008-.88 1.6-2.304 1.6-1.728 0-2.816-.816-3.024-2.192H.864c.208 2.336 1.984 3.728 4.64 3.728 2.496 0 4.16-1.312 4.16-3.344 0-1.68-1.168-2.544-3.2-2.944L4.944 5.6c-1.168-.224-1.808-.672-1.808-1.536 0-1.056.912-1.648 2.304-1.648 1.584 0 2.368.704 2.56 1.856h1.696C9.44 1.76 7.328.928 5.328.928zM17.284 12h2.16l-3.568-4.384 3.088-3.136h-2.112l-3.536 3.552V.64h-1.664V12h1.664v-1.776l1.424-1.44L17.284 12zm4.549-9.264c.576 0 1.056-.432 1.056-1.024 0-.592-.48-1.024-1.056-1.024-.592 0-1.056.432-1.056 1.024 0 .592.464 1.024 1.056 1.024zm-.816 1.744V12h1.648V4.48h-1.648zm8.246-.176c-.96 0-1.776.288-2.4.768V4.48h-1.664v11.232h1.664v-4.304c.624.48 1.44.768 2.4.768 2.112 0 3.824-1.744 3.824-3.936s-1.712-3.936-3.824-3.936zm-.24 6.432c-.832 0-1.6-.32-2.16-1.12V6.864c.56-.8 1.328-1.12 2.16-1.12 1.392 0 2.4 1.152 2.4 2.496s-1.008 2.496-2.4 2.496z"
      fill="#AAA"
    />
    <Path d="M0 13.6h33.855v.8H0v-.8z" fill="#AAA" />
  </Svg>
);

export const IconMapPin = (props: iconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M12 12.75a3 3 0 100-6 3 3 0 000 6z"
      stroke="#AAA"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.5 9.75c0 6.75-7.5 12-7.5 12s-7.5-5.25-7.5-12a7.5 7.5 0 0115 0v0z"
      stroke="#AAA"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconHouseLine = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M16.875 16.875V9.027a.625.625 0 00-.205-.463l-6.25-5.682a.625.625 0 00-.84 0L3.33 8.564a.625.625 0 00-.205.463v7.848M1.25 16.875h17.5"
      stroke="#4A4B51"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconUser = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M10 12.5a5 5 0 100-10 5 5 0 000 10z"
      stroke="#4A4B51"
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
    <Path
      d="M2.42 16.874a8.752 8.752 0 0115.159 0"
      stroke="#4A4B51"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconThumbsUp = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M4.27 8.125v8.125M4.27 8.125l3.125-6.25a2.5 2.5 0 012.5 2.5V6.25h4.834a1.25 1.25 0 011.24 1.405l-.938 7.5a1.25 1.25 0 01-1.24 1.095H4.27"
      stroke="#4A4B51"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconSetting = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M10.245 7.512a2.5 2.5 0 10-.491 4.976 2.5 2.5 0 00.491-4.976v0zM16.265 10a6.03 6.03 0 01-.06.812l1.766 1.385a.422.422 0 01.096.537l-1.67 2.891a.422.422 0 01-.514.18l-1.754-.707a.629.629 0 00-.593.068 6.425 6.425 0 01-.841.49.623.623 0 00-.345.475L12.088 18a.433.433 0 01-.418.358H8.33a.434.434 0 01-.418-.346l-.262-1.868a.628.628 0 00-.352-.477 6.069 6.069 0 01-.838-.491.623.623 0 00-.59-.067l-1.754.706a.422.422 0 01-.513-.18l-1.67-2.89a.422.422 0 01.095-.537l1.492-1.172a.627.627 0 00.235-.55 5.324 5.324 0 010-.97.625.625 0 00-.237-.545L2.025 7.8a.422.422 0 01-.093-.534l1.671-2.891a.422.422 0 01.513-.18l1.754.707a.63.63 0 00.593-.068c.268-.185.549-.348.841-.49a.623.623 0 00.345-.474l.263-1.871a.433.433 0 01.417-.358h3.341a.434.434 0 01.418.346l.262 1.868a.628.628 0 00.352.477c.292.141.572.306.838.491a.625.625 0 00.59.067l1.754-.706a.422.422 0 01.513.18l1.67 2.89a.422.422 0 01-.095.537L16.48 8.963a.627.627 0 00-.237.55c.013.162.022.324.022.487z"
      stroke="#4A4B51"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconShieldCheck = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M3.125 8.958V4.375a.625.625 0 01.625-.625h12.5a.625.625 0 01.625.625v4.583c0 6.564-5.57 8.739-6.683 9.107a.59.59 0 01-.384 0c-1.112-.368-6.683-2.543-6.683-9.107z"
      stroke="#2A6B58"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.438 8.125L8.854 12.5l-2.291-2.188"
      stroke="#2A6B58"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconLogOut = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M13.595 6.719L16.875 10l-3.28 3.281M8.125 10h8.748M8.125 16.875H3.75a.625.625 0 01-.625-.625V3.75a.625.625 0 01.625-.625h4.375"
      stroke="#AAA"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconTabActive = (props: iconProps) => (
  <Svg width={17} height={4} fill="none" {...props}>
    <Rect x={0.5} width={16} height={4} rx={2} fill="#DE9236" />
  </Svg>
);

export const IconDot = (props: iconProps) => (
  <Svg width={6} height={7} fill="none" {...props}>
    <Circle cx={3} cy={3.5} r={3} fill="#AAA" />
  </Svg>
);

export const IconEyeCloseFullFill = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M17.726 7.65c-.242-.383-.5-.742-.767-1.075a.834.834 0 00-1.242-.075l-2.5 2.5c.183.55.217 1.183.05 1.842a3.351 3.351 0 01-2.416 2.416 3.269 3.269 0 01-1.842-.05l-2.05 2.05c-.417.417-.283 1.15.275 1.367a7.683 7.683 0 002.767.517c1.483 0 2.925-.434 4.241-1.242 1.342-.833 2.55-2.058 3.525-3.617.792-1.258.75-3.375-.041-4.633z"
      fill="#AAA"
    />
    <Path
      d="M10.494 8.446l-2.047 2.047a1.586 1.586 0 01-.08-.493c0-.896.733-1.633 1.633-1.633.17 0 .336.028.494.08z"
      stroke="#AAA"
      strokeWidth={1.5}
    />
    <Path
      d="M14.06 4.88l-1.724 1.723a4.096 4.096 0 00-2.337-.72A4.113 4.113 0 005.883 10c0 .867.266 1.672.722 2.335l-1.846 1.852a11.505 11.505 0 01-1.836-2.224c-.323-.508-.507-1.218-.507-1.967 0-.75.184-1.46.507-1.968C3.836 6.596 4.941 5.49 6.15 4.74 7.362 4.003 8.67 3.61 10 3.61c1.41 0 2.798.437 4.06 1.27z"
      fill="#AAA"
      stroke="#AAA"
      strokeWidth={1.5}
    />
    <Mask id="prefix__a" fill="#fff">
      <Path d="M12.382 10A2.388 2.388 0 0110 12.383c-.05 0-.092 0-.142-.016l2.509-2.509c.016.05.016.092.016.142z" />
    </Mask>
    <Path
      d="M9.857 12.367l-1.06-1.06-1.716 1.715 2.302.768.474-1.423zm2.509-2.509l1.423-.474-.768-2.302-1.716 1.716 1.06 1.06zM10.882 10a.888.888 0 01-.883.883v3A3.888 3.888 0 0013.882 10h-3zm-.883.883c-.062 0 .124-.009.333.06l-.949 2.847c.309.103.578.093.616.093v-3zm.92 2.544l2.507-2.508-2.12-2.121-2.51 2.508 2.122 2.121zm.024-3.094c-.07-.209-.06-.395-.06-.333h3c0-.038.009-.307-.094-.616l-2.846.949z"
      fill="#AAA"
      mask="url(#prefix__a)"
    />
    <Path
      d="M2.227 17.611s0 0 0 0h0zm.16.161h0s0 0 0 0z"
      stroke="#AAA"
      strokeWidth={1.5}
    />
  </Svg>
);

export const IconEyeOpenFullFill = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M17.708 7.625C15.783 4.6 12.966 2.858 9.999 2.858c-1.483 0-2.925.434-4.241 1.242-1.317.817-2.5 2.008-3.467 3.525-.833 1.308-.833 3.433 0 4.742 1.925 3.033 4.742 4.766 7.708 4.766 1.484 0 2.925-.433 4.242-1.241 1.317-.817 2.5-2.009 3.467-3.525.833-1.3.833-3.434 0-4.742zm-7.709 5.742A3.363 3.363 0 016.633 10c0-1.858 1.5-3.367 3.366-3.367A3.363 3.363 0 0113.366 10c0 1.858-1.5 3.367-3.367 3.367z"
      fill="#2A6B58"
    />
    <Path
      d="M8.375 10c0-.904.733-1.633 1.625-1.633.894 0 1.633.739 1.633 1.633 0 .89-.735 1.625-1.633 1.625A1.63 1.63 0 018.375 10z"
      stroke="#2A6B58"
      strokeWidth={1.5}
    />
  </Svg>
);

export const IconPlus = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M3.125 10h13.75M10 3.125v13.75"
      stroke="#B09E88"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconDelete = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M17.557 4.358a92.78 92.78 0 00-4.033-.308v-.008l-.183-1.084c-.125-.767-.309-1.917-2.259-1.917H8.9c-1.942 0-2.125 1.1-2.258 1.909l-.175 1.066c-.775.05-1.55.1-2.325.175l-1.7.167a.626.626 0 00-.567.684.62.62 0 00.683.558l1.7-.167c4.367-.433 8.767-.266 13.184.175h.066a.631.631 0 00.625-.566.639.639 0 00-.575-.684zM16.024 6.784a1.054 1.054 0 00-.758-.325H4.733A1.04 1.04 0 003.69 7.566l.517 8.55c.091 1.267.208 2.85 3.116 2.85h5.35c2.909 0 3.026-1.575 3.117-2.85l.517-8.542a1.08 1.08 0 00-.284-.792zm-4.641 8.008H8.608a.63.63 0 01-.625-.625.63.63 0 01.625-.625h2.775a.63.63 0 01.625.625.63.63 0 01-.625.625zm.7-3.333H7.916a.63.63 0 01-.625-.625.63.63 0 01.625-.625h4.167a.63.63 0 01.625.625.63.63 0 01-.625.625z"
      fill="#AAA"
    />
  </Svg>
);

export const IconCheckedBox = (props: iconProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Rect
      x={0.5}
      y={0.5}
      width={31}
      height={31}
      rx={7.5}
      fill="#DE9236"
      stroke="#D8D8D8"
    />
    <Path
      d="M24.25 10.75l-10.5 10.5L8.5 16"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconUncheckedBox = (props: iconProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Rect
      x={0.5}
      y={0.5}
      width={31}
      height={31}
      rx={7.5}
      fill="#F4F4F4"
      stroke="#D8D8D8"
    />
  </Svg>
);

export const IconEdit = (props: iconProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M17.5 18.334h-15a.63.63 0 01-.625-.625.63.63 0 01.625-.625h15a.63.63 0 01.625.625.63.63 0 01-.625.625zM15.85 2.9c-1.617-1.616-3.2-1.658-4.858 0L9.983 3.91a.347.347 0 00-.083.333 6.774 6.774 0 004.608 4.608.334.334 0 00.342-.083l1-1.008c.825-.817 1.225-1.609 1.225-2.409.008-.825-.392-1.625-1.225-2.45zM13.008 9.609a9.248 9.248 0 01-.7-.367 7.339 7.339 0 01-.533-.35 5.022 5.022 0 01-.467-.358 1.016 1.016 0 01-.141-.125 7.047 7.047 0 01-.859-.867c-.025-.017-.066-.075-.125-.15-.083-.1-.225-.267-.35-.458a4.576 4.576 0 01-.325-.492c-.133-.225-.25-.45-.366-.683-.153-.328-.584-.426-.84-.17l-4.685 4.686a1.003 1.003 0 00-.234.459l-.45 3.191c-.083.567.075 1.1.425 1.459.3.291.717.45 1.167.45.1 0 .2-.009.3-.025l3.2-.45a.927.927 0 00.458-.234l4.694-4.694c.25-.25.157-.681-.169-.822z"
      fill="#AAA"
    />
  </Svg>
);
