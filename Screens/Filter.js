import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SelectionBox from "../Components/SelectionBox";
import FilterCards from "../Components/FilterCards";

const { height, width } = Dimensions.get("window");

const Filter = (props) => {
  const [list, setList] = useState([]);
  const type_list = [
    { mal_id: "tv", name: "TV" },
    { mal_id: "movie", name: "Movie" },
    { mal_id: "ova", name: "OVA" },
    { mal_id: "special", name: "Special" },
    { mal_id: "ona", name: "ONA" },
    { mal_id: "music", name: "Music" },
  ];
  const status_list = [
    { mal_id: "airing", name: "Airing" },
    { mal_id: "complete", name: "Completed" },
    { mal_id: "upcoming", name: "Upcoming" },
  ];
  const rating_list = [
    { mal_id: "g", name: "G - All Ages" },
    { mal_id: "pg", name: "PG - Children" },
    { mal_id: "pg13", name: "PG-13 - Teens 13 or older" },
    { mal_id: "r17", name: "R - 17+ (violence & profanity)" },
    { mal_id: "r", name: "R+ - Mild Nudity" },
    { mal_id: "rx", name: "Rx - Hentai" },
  ];
  const year_list = [
    { mal_id: 2000, name: 2000 },
    { mal_id: 2001, name: 2001 },
    { mal_id: 2002, name: 2002 },
    { mal_id: 2003, name: 2003 },
    { mal_id: 2004, name: 2004 },
    { mal_id: 2005, name: 2005 },
    { mal_id: 2006, name: 2006 },
    { mal_id: 2007, name: 2007 },
    { mal_id: 2008, name: 2008 },
    { mal_id: 2009, name: 2009 },
    { mal_id: 2010, name: 2010 },
    { mal_id: 2011, name: 2011 },
    { mal_id: 2012, name: 2012 },
    { mal_id: 2013, name: 2013 },
    { mal_id: 2014, name: 2014 },
    { mal_id: 2015, name: 2015 },
    { mal_id: 2016, name: 2016 },
    { mal_id: 2017, name: 2017 },
    { mal_id: 2018, name: 2018 },
    { mal_id: 2019, name: 2019 },
    { mal_id: 2020, name: 2020 },
    { mal_id: 2021, name: 2021 },
    { mal_id: 2022, name: 2022 },
    { mal_id: 2023, name: 2023 },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState("");
  const genreList = async () => {
    await axios
      .get(`https://api.jikan.moe/v4/genres/anime`)
      .then((res) => {
        setList(res.data.data);
        setIsLoading(false);
      })
      // @ts-ignore
      .catch((err) => {
        genreList();
      });
      return true;
  };

  const filterData = async (_genre, _type, _status, _rating, _year, page) => {
    if (page == 1) {
      setData([]);
      setIsFiltering(true);
      setError(false);
    }
    await axios
      .get(
        `https://api.jikan.moe/v4/anime?q&genres=${_genre}&status=${
          _status == "" ? "airing" : _status
        }&type=${_type == "" ? "tv" : _type}&rating=${
          _rating == "" ? "g" : _rating
        }&page=${page}${
          props.isAdult ? "" : "&sfw=true"
        }&order_by=score&sort=desc`
      )
      .then((res) => {
        if (page === 1) {
          // @ts-ignore
          setData([...res.data.data]);
        } else {
          // @ts-ignore
          setData((prevState) => [...prevState, ...res.data.data]);
        }
        // @ts-ignore
        setFilterLoading(false);
        setPageInfo(res.data.pagination);
      })
      // @ts-ignore
      .catch((err) => {
        if (page === 1) {
          setFilterLoading(true);
          setTimeout(() => {
            filterData(
              genre,
              type,
              status,
              rating,
              year == "none" || year == "" ? 2000 : year,
              1
            );
          }, 1000);
        }
      });
      return true;
  };

  const loadMore = () => {
    // @ts-ignore
    let page = pageInfo.current_page;
    // @ts-ignore
    if (pageInfo.has_next_page == true) {
      page++;
      filterData(genre, type, status, rating, year == "none" || year == "" ? 2000 : year, page);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    genreList();
  }, []);
  useEffect(() => {
    if (rating === "rx" && props.isAdult !== true) {
      Alert.alert(
        "Alert",
        "Adult content is not allowed.So RX option won't work.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
            },
          },
        ]
      );
      setRating("none");
    }
  }, [rating, props.isAdult]);
  return (
    <>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffce39" />
          <Text style={{color:"#fff"}}>Loading</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View
            // @ts-ignore
            style={styles.headingBox}
          >
            <Text style={styles.title}>Filter</Text>
          </View>
          <View style={styles.selectionBox}>
            {list.length > 0 ? (
              <>
                <View style={styles.Box}>
                  <Text style={styles.titleBox}>Genre</Text>
                  <SelectionBox
                    items={list}
                    setValue={setGenre}
                    placeholder={"Please Select Genre...."}
                  />
                </View>
                <View style={styles.Box}>
                  <Text style={styles.titleBox}>Type</Text>
                  <SelectionBox
                    items={type_list}
                    setValue={setType}
                    placeholder={"Please Select Type...."}
                  />
                </View>
                <View style={styles.Box}>
                  <Text style={styles.titleBox}>Status</Text>
                  <SelectionBox
                    items={status_list}
                    setValue={setStatus}
                    placeholder={"Please Select Status...."}
                  />
                </View>
                <View style={styles.Box}>
                  <Text style={styles.titleBox}>Rating</Text>
                  <SelectionBox
                    items={rating_list}
                    setValue={setRating}
                    placeholder={"Please Select Rating...."}
                  />
                </View>
                {/* <View style={styles.Box}>
                  <Text style={styles.titleBox}>Year</Text>
                  <SelectionBox
                    items={year_list}
                    setValue={setYear}
                    placeholder={"Please Select Year...."}
                  />
                </View> */}
                <TouchableOpacity
                  onPress={() => {
                    filterData(genre, type, status, rating, year == "none" || year == "" ? 2000 : year, 1);
                    setFilterLoading(true);
                  }}
                  style={styles.buttonBox}
                >
                  <Text style={styles.buttonText}>Click Me</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ffce39" />
                <Text style={{color:"#fff"}}>Loading</Text>
              </View>
            )}
          </View>
        </View>
      )}
      {isFiltering ? (
        <Modal
          transparent={false}
          visible={isFiltering}
          presentationStyle={"fullScreen"}
          onRequestClose={() => {
            setIsFiltering(false);
          }}
        >
          {filterLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#ffce39" />
              <Text style={{color:"#fff"}}>Loading</Text>
            </View>
          ) : error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>Sorry! Data not found.</Text>
            </View>
          ) : data.length == 0 ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>Sorry! Data not found.</Text>
            </View>
          ) : (
            // @ts-ignore
            <FilterCards items={data} loadMore={loadMore} />
          )}
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    backgroundColor:"#1d0e32"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    paddingBottom: 0,
    backgroundColor:"#1d0e32",
  },
  headingBox: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleBox: {
    fontSize: 18,
    fontWeight: "bold",
    left: 10,
    color:"#fff"
  },
  selectionBox: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  buttonBox: {
    backgroundColor: "#ffce39",
    paddingVertical: 17,
    borderRadius: 10,
    width: 300,
    marginTop: 80,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    alignSelf:"center"
  },
  Box: {
    width: 300,
    margin: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color:"#fff"
  },
  errorBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor:"#1d0e32"
  },
  errorText: {
    fontSize: 16,
    color:"#fff",
  },
});
