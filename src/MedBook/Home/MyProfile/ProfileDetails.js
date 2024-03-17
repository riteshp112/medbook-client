import { useIsFocused, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import medFetch from "../../../Actions/medFetchAction";
import ActivityIndicator from "../../../Components/ActivityIndicator";
import { loadingIcon, profileBlue } from "../../../Images/index";
import { getUser } from "../../Authentication/Authenticator";

const ProfileDetail = (props) => {
  const { route = {} } = props;
  const { params = {} } = route;
  const { username } = params;
  const [user, setUser] = useState();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
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
    <View
      style={{
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: colors.background,
        marginRight:10,
        borderRadius: 4,
        marginLeft:10,
      }}
    >
      <ActivityIndicator
        containerStyle={{
          height: "100%",
          backgroundColor: "rgba(1,1,0,0.1)",
        }}
        modalVisible={loading}
        loadingIcon={loadingIcon}
      />
      <Image
        source={profileBlue}
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "lightblue",
        }}
      />
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 18,
            color: colors.primary,
          }}
        >
          {user?.name}
        </Text>
        <Text
          dataDetectorType="email"
          style={{
            fontSize: 14,
            color: "gray",
          }}
        >
          {user?.email}
        </Text>
      </View>
    </View>
  );
};

export default ProfileDetail;
