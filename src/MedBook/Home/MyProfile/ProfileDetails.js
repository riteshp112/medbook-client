import { ActivityIndicator, Image, Text, View } from "react-native";
import { deleteIcon } from "../../../Images";
import React, { useEffect, useState } from "react";
import medFetch from "../../../Actions/medFetchAction";
import { useIsFocused } from "@react-navigation/native";
import { getUser } from "../../Authentication/Authenticator";

const ProfileDetail = ({ route, navigation }) => {
  const { username } = route?.params || {};
  const [user, setUser] = useState();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState();
  console.log(route);
  useEffect(() => {
    if (username) {
      setLoading(true);
      medFetch({
        type: "select",
        table: "testcol",
        condition: { username: username },
        limit: 1,
      }).then(({ response }) => {
        setUser(response[0]);
        setLoading(false)
      });
    }
    setUser(getUser());
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {loading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <View style={{ alignSelf: "center", padding: 20 }}>
          <Image
            source={deleteIcon}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              alignSelf: "center",
              backgroundColor: "lightgray",
            }}
          ></Image>
          <Text style={{ fontSize: 18, paddingTop: 8, paddingLeft: 16 }}>
            Name: {user?.name}
          </Text>
          <Text style={{ fontSize: 18, paddingTop: 8, paddingLeft: 16 }}>
            Username: {user?.username}
          </Text>
          <Text style={{ fontSize: 18, paddingTop: 8, paddingLeft: 16 }}>
            Gender: {user?.gender}
          </Text>
          <Text style={{ fontSize: 18, paddingTop: 8, paddingLeft: 16 }}>
            DOB: {user?.dob}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileDetail;
