import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Details from "./Details";

const { height } = Dimensions.get("window");

const Card = ({ item, index, fetchID }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        fetchID(item.mal_id);
      }}
    >
      <View style={styles.card}>
        <Text style={styles.cardNumber}>{index + 1}</Text>
        <Image
          source={{ uri: item.images.jpg.large_image_url }}
          style={styles.image}
          fadeDuration={800}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.cardText} numberOfLines={2}>
            Rating: {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const CardList = ({ URI }, props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ID, setID] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = () => {
    axios
      .get(URI.uri)
      .then((response) => {
        setData(response.data.data.slice(0, 10));
      })
      .finally(() => {
        if (data !== []) {
          setIsLoading(false);
          return true;
        }
        fetchApi();
      });
    return true;
  };

  const fetchID = (value) => {
    setID(value);
    setModalVisible(true);
  };

  useEffect(() => {
    setTimeout(fetchApi, Math.floor(Math.random() * 4000) + 1000);
  }, [URI]);
  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#ffce39" />
          </View>
        ) : (
          data.map((item, index) => (
            <View key={index}>
              <Card index={index} item={item} fetchID={fetchID} />
            </View>
          ))
        )}
      </View>
      {!modalVisible ? (
        ""
      ) : (
        // @ts-ignore
        <Details ID={ID} visible={modalVisible} setVisible={setModalVisible} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1d0e32",
    height: 80,
    width: 250,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
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
    width: 45,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  cardNumber: {
    paddingRight: 5,
    alignSelf: "center",
    color: "#ffce39",
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  cardText: {
    fontSize: 11,
    marginBottom: 2,
    color: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: height / 3,
    height: height,
    paddingBottom: 100,
  },
});
export default CardList;
