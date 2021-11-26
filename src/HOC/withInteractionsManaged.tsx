import _ from "lodash"; // 4.0.8
import React from "react";

export const withPreventDoubleClick = (WrappedComponent: any) => {
  const PreventDoubleClick = (props: any) => {
    const debouncedOnPress = () => {
      props.onPress && props.onPress();
    };

    const onPress = _.debounce(debouncedOnPress, 750, {
      leading: true,
      trailing: false,
    });

    return <WrappedComponent {...props} onPress={onPress} />;
  };

  PreventDoubleClick.displayName = `withPreventDoubleClick(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return PreventDoubleClick;
};
