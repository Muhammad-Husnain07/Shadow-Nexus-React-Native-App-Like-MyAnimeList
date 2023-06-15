import React, { useEffect, useReducer, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { View, StyleSheet } from "react-native";
import Details from "./Details";

const FilterCards = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ID, setID] = useState();
  const [Data, setData] = useState([...props.items]);
  useEffect(() => {
    setData([...props.items]);
  }, [props.items]);
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={Data}
            scrollEnabled
            numColumns={2}
            extraData={Data}
            onEndReachedThreshold={100}
            showsVerticalScrollIndicator={true}            
            onEndReached={() => {props.loadMore()}}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  // @ts-ignore
                  setID(item.mal_id);
                  setModalVisible(true);
                  return true;
                }}
                style={{
                  margin: 5,
                  width: 165,
                }}
              >
                <View style={styles.card}>
                  <Image
                    source={{
                      // @ts-ignore
                      uri: item.images.jpg.large_image_url,
                    }}
                    style={styles.image}
                    fadeDuration={800}
                  />
                  <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={2}>
                      {
                        // @ts-ignore
                        item.title
                      }
                    </Text>
                    <Text style={styles.subtitle}>
                      <Text style={{ fontWeight: "bold" }}>Episode: </Text>
                      {`${
                        // @ts-ignore
                        item.episodes == null || item.episodes == ""
                          ? "N/A"
                          : item.episodes
                      }`}
                    </Text>
                    <Text style={styles.subtitle}>
                      <Text style={{ fontWeight: "bold" }}>Status: </Text>
                      {`${
                        // @ts-ignore
                        item.status
                      }`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
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

export default FilterCards;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#1d0e32",
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
    paddingVertical: 20,
    backgroundColor: "red",
    height: 100,
    width: 100,
  },
});
