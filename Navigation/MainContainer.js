import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Home from "../Screens/Home";
import Search from "../Screens/Search";
import Icon from "react-native-vector-icons/Ionicons";
import Filter from "../Screens/Filter";
import About from "../Screens/About";
import NetInfo from "@react-native-community/netinfo";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
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
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const myIcon = () => {
          if (route.name === "Home") {
            return "home-outline";
          } else if (route.name === "Search") {
            return "search-outline";
          } else if (route.name === "About") {
            return "information-circle-outline";
          } else if (route.name === "Filter") {
            return "filter-outline";
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{
              flex: 1,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1d0e32",
              borderTopWidth: 0.2,
              borderColor: "#ffce39",
            }}
            activeOpacity={0.9}
          >
            <Icon
              // @ts-ignore
              name={myIcon()}
              color={isFocused ? "#ffce39" : "#fff"}
              size={25}
            />
            <Text style={{ color: isFocused ? "#ffce39" : "#fff" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function MainContainer() {
  const [isAdult, setIsAdult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const path = "../assets/No-Internet.gif";
  useEffect(() => {
    setTimeout(() => {
      NetInfo.fetch().then((state) => {
        // @ts-ignore
        setIsConnected(state.isConnected);
        setIsLoading(false);
      });
    }, 1000);
  }, [isConnected]);
  return (
    <View style={{width: '100%', height: '100%',backgroundColor: "#1d0e32" }}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffce39" />
          <Text style={{ color: "#fff" }}>Loading</Text>
        </View>
      ) : isConnected ? (
        <NavigationContainer
          theme={{
            // @ts-ignore
            colors: { background: "#1d0e32" },
          }}
        >
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <MyTabBar {...props} />}
          >
            <Tab.Screen name="Home" children={() => <Home />}
            />
            <Tab.Screen
              name="Search"
              children={() => <Search isAdult={isAdult} />}
            />
            <Tab.Screen
              name="Filter"
              children={() => <Filter isAdult={isAdult} />}
            />
            <Tab.Screen
              name="About"
              children={() => (
                <About isAdult={isAdult} setIsAdult={setIsAdult} />
              )}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <View style={{ backgroundColor: "#1d0e32" }}>
          <Image
            source={require(path)}
            style={{ width: "100%", height: "100%" }}
          />
          <Text
            style={{
              color: "white",
              position: "absolute",
              top: "60%",
              left: "30%",
            }}
          >
            No Internet Connection
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingBottom: 0,
  },
});
