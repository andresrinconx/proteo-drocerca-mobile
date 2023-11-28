import { useState, useEffect } from 'react';
import { View, Pressable, Image, Animated, Easing } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { blue } from '../utils/theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TabIcon } from '../components';

const TabNavigator = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [scaleValue] = useState(new Animated.Value(1));
  
  // Animation
  useEffect(() => {
    const startAnimationWithDelay = () => {
      setTimeout(() => {
        animateImage();
      }, 1000);
    };

    const animateImage = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start();
    };

    startAnimationWithDelay();
  }, []);

  return (
    <View className='relative' style={{ backgroundColor: blue, height: wp(15) }}>
      {/* dog */}
      <View className='absolute -bottom-7'>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Image style={{ width: wp(38), height: wp(38) }} resizeMode='contain'
            source={require('../assets/proteo-transparent.png')}
          />
        </Animated.View>
      </View>

      {/* items */}
      <View className='flex flex-row items-center justify-between h-full pl-36' style={{ width: wp(100) }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;
          const isLast = state.routes.length - 1 === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={route.name}
            >
              <TabIcon 
                route={route.name} 
                isFocused={isFocused} 
                isLast={isLast} 
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabNavigator;