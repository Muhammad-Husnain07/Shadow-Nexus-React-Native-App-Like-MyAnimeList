import { View, ScrollView, Text, StyleSheet } from "react-native";
import React,{useState} from "react";
import MainCards from "../Components/MainCards";
import TopCards from "../Components/TopCards";

const Home = (props) => {

  return (
    <ScrollView style={{backgroundColor:"#1d0e32",marginTop:28}}>
        <MainCards/>
      <View style={styles.container}>
          <View style={{flexDirection:'row'}}>
          <Text
              style={{
                color:"#fff",
                fontSize: 20,
                fontWeight: "700",
                flex:1
              }}
            >
              Top Animes
            </Text>
          </View>
      </View>
      <TopCards/>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d0e32",
    marginTop: 25,
    padding:5
  }
});
