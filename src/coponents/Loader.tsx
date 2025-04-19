import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';



const OverlayLoader = () => {
  return (
    <View
      className="absolute top-0 left-0 w-full h-full bg-black-50 justify-center items-center z-50"
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
    >
      <ActivityIndicator size="large" color="#d4af37" />
    </View>
  );
};

export default OverlayLoader;
