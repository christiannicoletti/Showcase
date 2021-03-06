import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../UI/Card";

const UpdateCard = (props) => {
  let Component = null;
  switch (props.iconFamily) {
    case "Entypo":
      const { Entypo } = require("@expo/vector-icons");
      Component = Entypo;
      break;
    case "EvilIcons":
      const { EvilIcons } = require("@expo/vector-icons");
      Component = EvilIcons;
      break;
    case "FontAwesome":
      const { FontAwesome } = require("@expo/vector-icons");
      Component = FontAwesome;
      break;
    case "MaterialIcons":
      const { MaterialIcons } = require("@expo/vector-icons");
      Component = MaterialIcons;
      break;
    case "Foundation":
      const { Foundation } = require("@expo/vector-icons");
      Component = Foundation;
      break;
    default:
      break;
  }

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...styles.project, ...props.projectContainer }}>
      {!props.iconFamily || !props.iconName || Component == null ? null : (
        <Component
          name={props.iconName}
          size={24}
          color={props.darkModeValue ? "white" : "black"}
        />
      )}
      <View style={styles.touchable}>
        <Text style={{ ...styles.title, ...props.titleStyle }}>
          {props.updateTitle}
        </Text>
        <Text style={{ ...styles.body, ...props.bodyStyle }}>
          {props.updateBody}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 100,
    width: "80%",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    overflow: "hidden",
  },
  title: {
    fontWeight: "500",
    fontSize: 12,
    margin: 20,
    marginBottom: 10,
  },
  body: {
    fontWeight: "300",
    fontSize: 12,
    marginHorizontal: 20,
  },
  touchable: {
    overflow: "hidden",
  },
});

export default UpdateCard;
