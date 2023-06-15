import React, { useState ,useEffect} from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    onSearch(searchText);
  };

  useEffect(()=>{
    if(searchText===''){ 	//if text is not empty, then call handleSearch function.
      handleSearch(); 		//call handleSearch function.
  }},[searchText]);
  
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 25,
        padding: 5,
        paddingLeft: 15,
        backgroundColor:"#fff",
        borderColor:"#ffce39"
      }}
    >
      <Icon name="search" size={22} color="#ffce39" />
      <TextInput
        style={styles.input}
        placeholder="Search Animes Here"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginLeft: 8,
    fontSize: 16,
    height: 30,
    width: 300,
    paddingHorizontal: 10,
    margin: 4,
    color:"#000"
  },
});
export default SearchBar;
