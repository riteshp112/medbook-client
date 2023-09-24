import { Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  loadingAnimation,
  loadingIcon,
  profileBlue,
} from "../../../Images/index";
import medFetch from "../../../Actions/medFetchAction";
import { useIsFocused } from "@react-navigation/native";
import { getUser } from "../../Authentication/Authenticator";
import ActivityIndicator from "../../../Components/ActivityIndicator";

const ProfileDetail = ({ route }) => {
  const { username } = route?.params || {};
  const [user, setUser] = useState();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (username) {
      setLoading(true);
      medFetch({
        type: "select",
        table: "testcol",
        condition: { username: username },
        limit: 1,
        skip: 0,
      }).then((result) => {
        setUser(result[0]);
        setLoading(false);
      });
    }
    setUser(getUser());
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ActivityIndicator
        containerStyle={{ height: "100%", backgroundColor: "rgba(1,1,0,0.1)" }}
        modalVisible={loading}
        loadingIcon={loadingIcon}
      />
      <View style={{ padding: 20, flexDirection: "row", width: "100%" }}>
        <Image
          source={profileBlue}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "lightblue",
          }}
        />
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={{ fontSize: 18, paddingTop: 8, paddingLeft: 16 }}>
            {user?.name}
          </Text>
          <Text style={{ fontSize: 18, paddingTop: 8, paddingLeft: 16 }}>
            {user?.username}
          </Text>
          <Text style={{ fontSize: 18, paddingTop: 8, paddingLeft: 16 }}>
            {user?.gender}
          </Text>
          <Text style={{ fontSize: 18, paddingTop: 8, paddingLeft: 16 }}>
            {user?.dob}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetail;
