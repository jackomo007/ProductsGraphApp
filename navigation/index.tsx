import * as React from 'react';
import { ColorSchemeName, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ProductDetailsModalScreen } from '../screens/ProductDetailsModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { CartScreen } from '../screens/CartScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="ProductDetailsModal" component={ProductDetailsModalScreen} options={({ route }) => ({
        presentation: 'modal',
        title: route.params.name
      })} />
    </Stack.Navigator>
  );
}

const CustomTabBarButton: any = (props: any) => {
  return <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={props.onPress}
  >
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#4630EB'
    }}>
      {props.children}
    </View>
  </TouchableOpacity>
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: 80,
          ...styles.shadow
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'TACTICHOP',
          headerRight: () => (
            <TouchableOpacity >
                <Image style={{width: 40, height: 40, marginTop: 10, marginRight: 10}} source={require('../assets/images/icons/search.png')}/>
            </TouchableOpacity>
        ),
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }} >
              <Image
                source={require('../assets/images/icons/home.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4630EB' : '#748c94'
                }}
              />
              <Text style={{ color: focused ? '#4630EB' : '#748c94', fontSize: 12 }}>HOME</Text>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="ShoppingCart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/icons/cart.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff'
              }}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }: RootTabScreenProps<'Favorites'>) => ({
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }} >
              <Image
                source={require('../assets/images/icons/favorites.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94'
                }}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>FAVORITES</Text>
            </View>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
})