import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Details from "./Details";

const MainCards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ID, setID] = useState([]);
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    await axios
      .get("https://api.jikan.moe/v4/seasons/now")
      .then((response) => setData(response.data.data.slice(0, 10)))
      .catch((err) => setTimeout(() => getData(),1000));
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
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffce39" />
          <Text style={{ color: "#fff" }}>Loading</Text>
        </View>
      ) : (
        <FlatList
          data={Data}
          horizontal={true}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setID(item.mal_id);
                setModalVisible(!modalVisible);
              }}
              style={{
                width: 220,
                margin: 2,
              }}
            >
              <View>
                <Image
                  source={{
                    uri: item.images.jpg.large_image_url,
                  }}
                  style={{ height: 330, width: 220 }}
                  fadeDuration={800}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#ffce39",
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {" " + (index + 1) + " "}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {!modalVisible ? (
        ""
      ) : (
        // @ts-ignore
        <Details ID={ID} visible={modalVisible} setVisible={setModalVisible} />
      )}
    </>
  );
};
export default MainCards;

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