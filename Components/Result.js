import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'

const Result = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Image source={{uri:data.images.jpg.large_image_url}} style={styles.image} fadeDuration={800}/>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle} numberOfLines={2}>{data.title}</Text>
         <Text style={styles.cardText}>Episodes: {data.episodes===null||data.episodes===""?"N/A":data.episodes}</Text>
         <Text style={styles.cardText}>Type: {data.type===null||data.type===""?"N/A":data.type}</Text>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      margin:3,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    card: {
      flexDirection: "row",
      backgroundColor: "#1d0e32",
      height:120,
      width:335,
      padding: 8,
      marginVertical: 5,
      borderRadius: 10,
      shadowColor: "#ffce39",
      borderColor:"#ffce39",
      borderWidth: 0.25,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.85,
      elevation: 5,
    },
    image: {
      width: 80,
      height: 105,
      marginRight: 10,
      borderRadius: 10,
    },
    cardDetails: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10,
      color:"#fff"
    },
    cardText: {
      fontSize: 14,
      marginBottom: 5,
      color:"#fff"
    },
  });

export default Result