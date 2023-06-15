import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
// @ts-ignore
import React, { useEffect, useRef, useState } from "react";

function SelectionBox({ items, setValue,placeholder }) {
  // @ts-ignore
  const [data, setData] = useState([{ mal_id: "none", name: "None" }, ...items]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  function handleValueChange(value) {
    if (value !== "") {
      setValue(value.mal_id);
      setSelectedValue(value);
      setShow(false);
      // @ts-ignore
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <Pressable onPress={() => setShow(!show)}>
        <View style={styles.selectionBox}>
          <Text style={styles.labelTitle}>{selected ? selectedValue.
// @ts-ignore
          name : placeholder}</Text>
        </View>
      </Pressable>
      {show && (
        <Modal
          transparent={false}
          visible={show}
          presentationStyle={"fullScreen"}
          onRequestClose={() => setShow(!show)}          
        >
          <ScrollView style={styles.dropDownBox}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.selectItems}
                onPress={() => {
                  handleValueChange(item)
                    ? setSelected(true)
                    : setSelected(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.itemTitle}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      )}
    </>
  );
}
export default SelectionBox;
const styles = StyleSheet.create({
  selectionBox: {
    borderWidth: 0.4,
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius:10,
    borderColor:"#ffce39",
  },
  dropDownBox: {
    backgroundColor:'#1d0e32'
  },
  selectItems: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 8,
    borderBottomWidth: 1,
    borderColor:"#ffce39",
    backgroundColor: "#1d0e32",
  },
  itemTitle:{
    fontSize:18,
    fontWeight:'400',
    color:"#fff"
  },
  labelTitle:{
    fontSize:18,
    color:"#fff",
    fontWeight:"300"
  }
});
