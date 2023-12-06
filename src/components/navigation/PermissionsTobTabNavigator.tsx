import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PermissionsTobTabNavigator = ({ state, descriptors, navigation }: MaterialTopTabBarProps) => {
  return (
    <View className='flex-row mt-12 ml-8'>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

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
          <TouchableOpacity
            className='flex-row items-center justify-center mx-1 py-0.5 rounded-t-lg bg-blue'
            style={{ width: wp(35), opacity: isFocused ? 1 : 0.8 }}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.name}
          >
            <Text className='text-white' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }} numberOfLines={1}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PermissionsTobTabNavigator;