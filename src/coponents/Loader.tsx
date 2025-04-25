import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';



const OverlayLoader = () => {
  const { user } = useSelector((state: any) => state.auth)
  // console.log(user)
  return (
    <View
      className={`absolute z-40 top-0 left-0 w-full h-full${user !== null ? "opacity-10 bg-black-50" : "bg-primary"} justify-center items-center z-50`}
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
    >
      <View className='absolute flex items-center justify-center -z-10  h-20 w-20'>
        <ActivityIndicator size="large" color="#d4af37" />
      </View>

    </View>
  );
};

export default OverlayLoader;
