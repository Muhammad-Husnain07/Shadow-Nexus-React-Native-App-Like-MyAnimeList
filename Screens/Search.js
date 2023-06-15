import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import SearchBar from "../Components/SearchBar";
import React, { useEffect, useState } from "react";
import CardList from "../Components/CardList";
import axios from "axios";
import Result from "../Components/Result";
import Details from "../Components/Details";

const { height, width } = Dimensions.get("window");
const Search = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ID, setID] = useState([]);
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const [isloading, setIsLoading] = useState(!modalVisible);
  const URL = [
    {
      season: `Spring ${new Date().getFullYear() - 1}`,
      uri: `https://api.jikan.moe/v4/seasons/${
        new Date().getFullYear() - 1
      }/Spring`,
    },
    {
      season: `Summer ${new Date().getFullYear() - 1}`,
      uri: `https://api.jikan.moe/v4/seasons/${
        new Date().getFullYear() - 1
      }/Summer`,
    },
    {
      season: `Fall ${new Date().getFullYear() - 1}`,
      uri: `https://api.jikan.moe/v4/seasons/${
        new Date().getFullYear() - 1
      }/Fall`,
    },
    {
      season: `Winter ${new Date().getFullYear() - 1}`,
      uri: `https://api.jikan.moe/v4/seasons/${
        new Date().getFullYear() - 1
      }/Winter`,
    },
  ];
  const delay=[1000,2000,3000,4000]

  const onSearch = async (text) => {
    setData([]);
    let page = 1;
    let hasNextPage = true;
    setIsLoading(true);
    if (text !== "") {
      while (hasNextPage) {
        setIsSearching(false);
        await axios
          .get(
            `https://api.jikan.moe/v4/anime?q=${text}${
              props.isAdult ? "" : "&sfw=true"
            }&order_by=rank&sort=asc&page=${page}`
          )
          .then((res) => {
            // @ts-ignore
            setTimeout(() => {
              if (res.data.pagination.has_next_page == true) {
                page++;
              } else {
                hasNextPage = false;
              }
            }, 1000);
            if (page == 1) {
              setData(res.data.data);
              setIsLoading(false);
            } else {
              // @ts-ignore
              setData((prevState) => [...prevState, ...res.data.data]);
              setIsLoading(false);
            }
          });
      }
    } else {
      setIsSearching(true);
    }
    console.log(data);
    return true;
  };
  return (
    <>
      <View style={styles.container}>
        <SearchBar onSearch={onSearch} />
        <ScrollView style={styles.cardContainer}>
          {isSearching ? (
            <FlatList
              data={URL}
              horizontal={true}
              scrollEnabled={true}
              renderItem={({ item, index }) => (
                <View>
                  <Text style={styles.title}>{item.season}</Text>
                  <CardList URI={item} key={index} delay={delay} />
                </View>
              )}
            />
          ) : isloading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#ffce39" />
              <Text style={{ color: "#fff" }}>Loading</Text>
            </View>
          ) : data.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No Searches Found.</Text>
            </View>
          ) : (
            data.map((item, index) => (
              <Pressable
                onPress={() => {
                  // @ts-ignore
                  setID(item.mal_id);
                  setModalVisible(!modalVisible);
                }}
                key={index}
              >
                <Result data={item} key={index} />
              </Pressable>
            ))
          )}
        </ScrollView>
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

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d0e32",
    marginTop: 30,
    padding: 5,
    marginBottom: 40,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height / 1.3,
    paddingBottom: 0,
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height / 1.3,
    backgroundColor: "#1d0e32",
  },
  emptyText: {
    fontSize: 16,
    color: "#fff",
  },
  cardContainer: {
    width: "100%",
    margin: 5,
  },
  title: {
    fontSize: 16,
    left: 12,
    color: "#ffce39",
    fontWeight: "bold",
  },
});
