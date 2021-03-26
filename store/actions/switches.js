import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const SET_DARKMODE = "SET_DARKMODE";
export const SET_SHOWCASELOCALMODE = "SET_SHOWCASELOCALMODE";
export const SHOW_RESUME = "SHOW_RESUME";
export const SHOW_CHEERING = "SHOW_CHEERING";
export const HIDE_FOLLOWING = "HIDE_FOLLOWING";
export const HIDE_FOLLOWERS = "HIDE_FOLLOWERS";
export const HIDE_ADVOCATES = "HIDE_ADVOCATES";

export const setDarkMode = (localId, showcaseId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId: localId,
      showcaseId: showcaseId,
      value: value,
      switchName: "darkMode",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.darkMode = value;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: SET_DARKMODE, darkMode: value });
  };
};

export const setShowResume = (localId, showcaseId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId: localId,
      showcaseId: showcaseId,
      value: value,
      switchName: "showResume",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.showResume = value;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: SHOW_RESUME, showResumeValue: value });
  };
};

export const setShowCheering = (localId, showcaseId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId: localId,
      showcaseId: showcaseId,
      value: value,
      switchName: "showCheering",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.showCheering = value;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: SHOW_CHEERING, showCheering: value });
  };
};

export const setHideFollowing = (localId, showcaseId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId: localId,
      showcaseId: showcaseId,
      value: value,
      switchName: "hideFollowing",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.hideFollowing = value;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: HIDE_FOLLOWING, hideFollowingValue: value });
  };
};

export const setHideFollowers = (localId, showcaseId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId: localId,
      showcaseId: showcaseId,
      value: value,
      switchName: "hideFollowers",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.hideFollowers = value;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: HIDE_FOLLOWERS, hideFollowersValue: value });
  };
};

export const setHideAdvocates = (localId, showcaseId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId: localId,
      showcaseId: showcaseId,
      value: value,
      switchName: "hideAdvocates",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.hideAdvocates = value;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: HIDE_ADVOCATES, hideAdvocatesValue: value });
  };
};
