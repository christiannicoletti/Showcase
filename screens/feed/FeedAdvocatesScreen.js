import { EvilIcons, Feather } from "@expo/vector-icons";
import algoliasearch from "algoliasearch";
import React, { useEffect, useState } from "react";
import {
    FlatList, Keyboard,


    RefreshControl, SafeAreaView, StyleSheet,

    Text,
    TouchableWithoutFeedback, View
} from "react-native";
import { SearchBar } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import ExploreAdvocatesCard from "../../components/explore/ExploreAdvocatesCard";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";


const FeedAdvocatesScreen = (props) => {
  const client = algoliasearch(
    "EXC8LH5MAX",
    "2d8cedcaab4cb2b351e90679963fbd92"
  );
  const index = client.initIndex("users");

  const [returnedIndex, setReturnedIndex] = useState([]);
  const [projects, setProjects] = useState({});
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const ExhibitUId = props.navigation.getParam("ExhibitUId");

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    index.search("").then((responses) => {
      const advocates = responses.hits.find(
        (object) => object.objectID === ExhibitUId
      ).advocates;
      const projects = responses.hits.find(
        (object) => object.objectID === ExhibitUId
      ).profileProjects;
      setProjects(projects);
      const filteredIndex = responses.hits.filter((object) =>
        advocates.includes(object.objectID)
      );
      setReturnedIndex(filteredIndex);
    });
  }, []);

  const returnIndex = (text) => {
    index.search(text).then((responses) => {
      const advocates = responses.hits.find(
        (object) => object.objectID === ExhibitUId
      ).advocates;
      const projects = responses.hits.find(
        (object) => object.objectID === ExhibitUId
      ).profileProjects;
      setProjects(projects);
      const filteredIndex = responses.hits.filter((object) =>
        advocates.includes(object.objectID)
      );
      setReturnedIndex(filteredIndex);
    });
  };

  const searchFilterFunction = (text) => {
    setSearch(text);
    returnIndex(text);
  };

  const refreshSearchIndex = (text) => {
    setIsRefreshing(true);
    returnIndex(text);
    setIsRefreshing(false);
  };

  const viewProjectHandler = (
    ExhibitUId,
    fullname,
    username,
    jobTitle,
    profileBiography,
    profileProjects,
    profilePictureUrl,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    hideFollowing,
    hideFollowers,
    hideAdvocates,
    profileLinks,
    profileColumns
  ) => {
    props.navigation.push("ViewProfile", {
      userData: {
        ExhibitUId,
        fullname,
        username,
        jobTitle,
        profileBiography,
        profileProjects,
        profilePictureUrl,
        numberOfFollowers,
        numberOfFollowing,
        numberOfAdvocates,
        hideFollowing,
        hideFollowers,
        hideAdvocates,
        profileLinks,
        profileColumns,
      },
    });
  };

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ alignItems: "center" }}>
          <SearchBar
            containerStyle={{
              backgroundColor: 'darkModeValue ? "black" : "white"',
              margin: 5,
              borderBottomWidth: 0,
              borderTopWidth: 0,
              width: "80%",
            }}
            inputContainerStyle={{
              height: 30,
              backgroundColor: darkModeValue ? "black" : "white",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
            searchIcon={<EvilIcons name="search" size={24} color={darkModeValue ? "white" : "black"} />}
            clearIcon={
              search ? (
                <Feather
                  name="x"
                  size={24}
                  color={darkModeValue ? "white" : "black"}
                  onPress={() => {
                    searchFilterFunction("");
                  }}
                />
              ) : null
            }
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={() => {
              searchFilterFunction("");
            }}
            placeholder="Search..."
            value={search}
          />
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={returnedIndex}
        onRefresh={() => refreshSearchIndex(search)}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshSearchIndex(search)}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        refreshing={isRefreshing}
        keyExtractor={(item) => item.objectID}
        renderItem={(itemData) => (
          <ExploreAdvocatesCard
            image={itemData.item.profilePictureUrl}
            fullname={itemData.item.fullname}
            jobTitle={itemData.item.jobTitle}
            username={itemData.item.username}
            projects={projects}
            projectsAdvocating={itemData.item.projectsAdvocating}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            fullNameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            jobTitleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            advocatingTitleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewProjectHandler(
                itemData.item.objectID,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.profileProjects,
                itemData.item.profilePictureUrl,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideAdvocates,
                itemData.item.profileLinks,
                itemData.item.profileColumns
              );
            }}
          />
        )}
      />
    </View>
  );
};

FeedAdvocatesScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <SafeAreaView
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.logo}
      >
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Advocates
        </Text>
      </SafeAreaView>
    ),
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Add"
          iconName={"ios-arrow-back"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    padding: 10,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 26,
  },
});

export default FeedAdvocatesScreen;
