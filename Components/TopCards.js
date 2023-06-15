import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { View, StyleSheet, ScrollView } from "react-native";
import Details from "./Details";

const TopCards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ID, setID] = useState();
  const [Data, setData] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const getData = async () => {
    await axios
      .get("https://api.jikan.moe/v4/top/anime")
      .then((response) => setData(response.data.data.slice(0, 10)))
      .catch((err) => setTimeout(() => getData(), 1000));
      if (Data !== []) {
        setIsLoading(false);
      }
      return true
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {isLoading?(
          <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffce39" />
          <Text style={{ color: "#fff" }}>Loading</Text>
        </View>
        ):
        Data.map((data, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              // @ts-ignore
              setID(data.mal_id);
              setModalVisible(true);
            }}
            style={{
              margin: 2,
              width: 165,
            }}
          >
            <View style={styles.card}>
              <Image
                source={{
                  // @ts-ignore
                  uri: data.images.jpg.large_image_url,
                }}
                style={styles.image}
                fadeDuration={800}
              />
              <View style={styles.details}>
                <Text style={styles.title} numberOfLines={2}>
                  {
                    // @ts-ignore
                    data.title
                  }
                </Text>
                <Text style={styles.subtitle}>
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>
                    Episode:{" "}
                  </Text>
                  {`${
                    // @ts-ignore
                    data.episodes
                  }`}
                </Text>
                <Text style={styles.subtitle}>
                  <Text style={{ fontWeight: "bold" }}>Status: </Text>
                  {`${
                    // @ts-ignore
                    data.status
                  }`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
        }
      </ScrollView>
      <View>
        {!modalVisible ? (
          ""
        ) : (
          // @ts-ignore
          <Details
            ID={ID}
            visible={modalVisible}
            setVisible={setModalVisible}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
  },
  card: {
    width: "100%",
    height: 335,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#1d0e32",
    shadowColor: "#ffce39",
    borderColor: "#ffce39",
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
    resizeMode: "cover",
    width: "100%",
    height: 230,
    borderRadius: 14,
  },
  details: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  subtitle: {
    fontSize: 13,
    color: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingBottom: 0,
  }
});

export default TopCards;
