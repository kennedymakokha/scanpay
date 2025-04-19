import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';

const ScanOverlay: React.FC = () => {
  const translateY = useSharedValue(0);
  const pulse = useSharedValue(0.5);

  useEffect(() => {
    translateY.value = withRepeat(withTiming(180, { duration: 2000 }), -1, true);
    pulse.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: pulse.value,
  }));

  return (
    <View className="absolute items-center justify-center w-52 h-52 z-10">
      {/* Optional Blur Line */}
      {Platform.OS === 'ios' && (
        <BlurView
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
          className="absolute top-0 w-full h-1"
        />
      )}
      {/* Animated Scan Line */}
      <Animated.View
        className="w-full h-2 bg-green-500 rounded-full"
        style={[
          animatedStyle,
          {
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 12,
            elevation: 12,
          },
        ]}
      />
    </View>
  );
};

export default ScanOverlay;
