import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Switch,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
const About = ({ isAdult, setIsAdult }) => {
  const toggleSwitch = () => {
    setIsAdult(!isAdult);
  };
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>App Details</Text>
        <Text style={styles.sectionDescription}>
          <Text style={{ fontWeight: "700" }}>Version:</Text> 1.0.0
        </Text>
        <Text style={styles.sectionDescription}>
          <Text style={{ fontWeight: "700" }}>Description:</Text> A mobile app
          version of MyAnimeList website.
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Technologies Used</Text>
        <Text style={styles.sectionDescription}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"\u2022" + "  "}
          </Text>
          React Native{" "}
        </Text>
        <Text style={styles.sectionDescription}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"\u2022" + "  "}
          </Text>
          Jikan API ( UNOFFICIAL MYANIMELIST API )
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Creator Details</Text>
        <Text style={styles.sectionDescription}>
          <Text style={{ fontWeight: "700" }}>Name: </Text>Muhammad Husnain
        </Text>
        <Text style={styles.sectionDescription}>
          <Text style={{ fontWeight: "700" }}>Skills:</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"\n" + "\u2022" + "  "}
          </Text>
          React or NEXT JS for Front-End Development
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"\n" + "\u2022" + "  "}
          </Text>
          Node JS and Express JS for Building APIs
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"\n" + "\u2022" + "  "}
          </Text>
          DataBases such as MongoDB, MySQL etc.
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"\n" + "\u2022" + "  "}
          </Text>
          React Native for App Development.
        </Text>
        <View style={styles.iconsContainer}>
          <View style={styles.Icon}>
            <TouchableOpacity
              style={styles.buttonMail}
              onPress={() =>
                Linking.openURL(
                  "mailto:khanking.1220@gmail.com?subject=SendMail&body=Description"
                )
              }
            >
              <Text style={styles.buttonText}>
                <Icon name="mail" size={30} color="#fff" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Mail</Text>
          </View>
          <View style={styles.Icon}>
            <TouchableOpacity style={styles.buttonLinkedin}>
              <Text style={styles.buttonText}>
                <Icon
                  name="linkedin-square"
                  size={30}
                  color="#fff"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/muhammad-husnain-255070248/"
                    )
                  }
                />
              </Text>
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>LinkedIn</Text>
          </View>
          <View style={styles.Icon}>
            <TouchableOpacity
              style={styles.buttonWhatsapp}
              onPress={() =>
                Linking.openURL(
                  "whatsapp://send?text=Hello Muhammad Husnain&phone=+923104801531"
                )
              }
            >
              <Text style={styles.buttonText}>
                <IconFA5 name="whatsapp-square" size={30} color="#fff" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>WhatsApp</Text>
          </View>
          <View style={styles.Icon}>
            <TouchableOpacity
              style={styles.buttonGithub}
              onPress={() =>
                Linking.openURL("https://github.com/Muhammad-Husnain07")
              }
            >
              <Text style={styles.buttonText}>
                <Icon name="github" size={30} color="#fff" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Github</Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Extra Feature</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.sectionDescription}>Filter Content:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#ffce39" }}
          thumbColor={isAdult ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={!isAdult}
        />
      </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#fff",
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ffce39",
  },
  sectionDescription: {
    color: "#fff",
    fontSize: 15,
  },
  iconsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  Icon: {
    padding: 10,
  },
  buttonMail: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
  },
  buttonLinkedin: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#0077B5",
    width: 50,
    height: 50,
  },
  buttonWhatsapp: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#25D366",
    width: 50,
    height: 50,
  },
  buttonGithub: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#F7DF1E ",
    width: 50,
    height: 50,
  },
  buttonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonLabel: {
    color: "#fff",
    alignSelf: "center",
    paddingVertical: 5,
  },
});
export default About;
