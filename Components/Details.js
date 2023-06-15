import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { Modal } from "react-native";

const { height, width } = Dimensions.get("window");

const Details = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [more, setMore] = useState(false);
  const [isModalVisible, setModalVisible] = useState(props.visible);
  const [error, setError] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    props.setVisible(!props.visible);
  };

  const getDetail = async () => {
    if (props.ID !== undefined) {
      await axios
        .get(`https://api.jikan.moe/v4/anime/${props.ID}/full`)
        .then((res) => {
          setData(res.data.data);
          setIsLoading(false);
        })
        // @ts-ignore
        .catch((err) => {
          setError(true);
          setIsLoading(false);
        });
    }
    return true
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible === undefined ? false : true}
      presentationStyle={"fullScreen"}
      onRequestClose={toggleModal}
    >
      <ScrollView style={{ backgroundColor: "#1d0e32" }}>
        <View style={styles.containerContent}>
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#ffce39" />
              <Text style={{color:"#fff"}}>Loading</Text>
            </View>
          ) : error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>Sorry! Data not found.</Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <YoutubePlayer
                height={height * 0.28}
                play={false}
                // @ts-ignore
                videoId={`${Data.trailer.youtube_id}`}
              />
              <View style={{ paddingLeft: 20, paddingBottom: 5 }}>
                <Text style={{ fontSize: 19, fontWeight: "bold", color: "#fff" }}>
                  {
                    // @ts-ignore
                    Data.title
                  }
                </Text>
              </View>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <View style={{ marginLeft: 20 }}>
                  <Image
                    // @ts-ignore
                    source={{ uri: Data.images.jpg.image_url }}
                    style={{ height: 150, width: 110,borderRadius:5 }}
                    fadeDuration={800}
                  />
                </View>
                <View style={{ flex: 2, paddingLeft: 16 }}>
                  <View style={{ flexDirection: "row" }}>
                    <AwesomeIcon name="star" color="yellow" size={20} />
                    <Text
                      style={{ fontSize: 17, fontWeight: "700", bottom: 2,color:"#fff" }}
                    >
                      {"  " +
                        // @ts-ignore
                        (Data.score == null || Data.score == ""
                          ? "N/A"
                          // @ts-ignore
                          : Data.score)}
                    </Text>
                    <Text style={{ color:"#ffce39", fontSize: 12, top: 2 }}>
                      {"   (" +
                        // @ts-ignore
                        (Data.members == null || Data.members == ""
                          ? "N/A"
                          // @ts-ignore
                          : Data.members) +
                        " Members)"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{ fontSize: 12, fontWeight: "500", bottom: 1,color:"#fff" }}
                    >
                      {"Ranked #" +
                        // @ts-ignore
                        (Data.rank == null || Data.rank == ""
                          ? "N/A"
                          // @ts-ignore
                          : Data.rank)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", top: 10 }}>
                    <Text
                      style={{ fontSize: 14, fontWeight: "500", bottom: 2,color:"#fff" }}
                    >
                      {"TV(" +
                        // @ts-ignore
                        (Data.episodes == null || Data.episodes == ""
                          ? "N/A"
                          // @ts-ignore
                          : Data.episodes) +
                        " Episodes)"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color:"#ffce39",
                        fontSize: 12,
                        fontWeight: "500",
                        top: 12,
                      }}
                    >
                      Status
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", top: 13 }}>
                    <Text
                      style={{ fontSize: 14, fontWeight: "500", bottom: 2,color:"#fff" }}
                    >
                      {
                        // @ts-ignore
                        Data.status == null || Data.status == ""
                          ? "N/A"
                          // @ts-ignore
                          : Data.status
                      }
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        top: 12,
                        color:"#ffce39"
                      }}
                    >
                      Genres
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", top: 13 }}>
                    <Text
                      style={{ fontSize: 14, fontWeight: "500", bottom: 2,color:"#fff" }}
                    >
                      {
                        // @ts-ignore
                        Data.genres.length == 0
                          ? "N/A"
                          : // @ts-ignore
                            Data.genres.map((item) => {
                              return item.name + " ";
                            })
                      }
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.detail}>Duration</Text>
                <Text style={styles.detailSubtitle}>
                  {
                    // @ts-ignore
                    Data.duration == null || Data.duration == ""
                      ? "N/A"
                      // @ts-ignore
                      : Data.duration
                  }
                </Text>
                <Text style={styles.detail}>Aired Date</Text>
                <Text style={styles.detailSubtitle}>
                  {
                    // @ts-ignore
                    Data.aired.string == null || Data.aired.string == ""
                      ? "N/A"
                      // @ts-ignore
                      : Data.aired.string
                  }
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    paddingLeft: 16,
                    paddingTop: 16,
                    paddingBottom: 7,
                    color:"#ffce39"
                  }}
                >
                  Synopsis
                </Text>
                {!more ? (
                  <Text
                    numberOfLines={5}
                    style={{
                      width: width - 15,
                      fontStyle: "normal",
                      paddingLeft: 16,
                      color:"#fff"
                    }}
                  >
                    {
                      // @ts-ignore
                      Data.synopsis == null || Data.synopsis == ""
                        ? "No Synopsis"
                        : // @ts-ignore
                          Data.synopsis
                    }
                  </Text>
                ) : (
                  <Text style={{ width: width - 15, paddingLeft: 16,color:"#fff" }}>
                    {
                      // @ts-ignore
                      Data.synopsis
                    }
                  </Text>
                )}
                <TouchableOpacity onPress={() => setMore(!more)}>
                  <Text
                    style={{
                      fontWeight: "600",
                      paddingTop:8,
                      paddingLeft: 16,
                      paddingBottom: 16,
                      color:"#ffce39"
                    }}
                  >
                    {more ? "Show Less" : "Show More"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    marginTop: 0,
    backgroundColor:"#1d0e32",
  },
  containerHeader: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "1d0e32",
    borderBottomWidth: 0.5,
  },
  headerContent: {
    marginTop: 0,
  },
  Modal: {
    backgroundColor: "1d0e32",
    marginTop: 0,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    paddingBottom: 0,
  },
  errorBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
  },
  errorText: {
    fontSize: 16,
    color:"#fff"
  },
  detail: {
    fontSize: 17,
    fontWeight: "600",
    paddingLeft: 16,
    paddingTop: 10,
    color:"#ffce39"
  },
  detailSubtitle: {
    width: width - 15,
    paddingLeft: 16,
    color:"#fff"
  },
});

export default Details;
