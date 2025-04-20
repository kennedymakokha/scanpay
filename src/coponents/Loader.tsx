import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';



const OverlayLoader = () => {
  return (
    <View
      className="absolute z-40 top-0 left-0 w-full h-full opacity-40 bg-black-50 justify-center items-center z-50"
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
    >
      <View className='absolute flex items-center justify-center -z-10 bg-red-400 h-20 w-20'>
   <ActivityIndicator size="large" color="#d4af37" />
      </View>
   
    </View>
  );
};

export default OverlayLoader;
