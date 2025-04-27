import React, { useEffect } from 'react';
import { Modal, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { View } from 'react-native';

const { height } = Dimensions.get('window');

type BottomDrawerProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const BottomDrawer: React.FC<BottomDrawerProps> = ({ visible, onClose, children }) => {
  const translateY = useSharedValue(height);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
    } else {
      translateY.value = withTiming(height, { duration: 200 });
    }
  }, [visible]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 100) {
        runOnJS(onClose)();
      } else {
        translateY.value = withTiming(0, { duration: 200 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/30">
        <GestureDetector gesture={gesture}>
          <Animated.View
            className="bg-white rounded-t-2xl p-5 min-h-[200px] shadow-xl"
            style={animatedStyle}
          >
            <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
};
