import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Image, Text, View } from "react-native";
import getUser from "../../../Actions/getUserAction";
import { deleteIcon } from "../../../Images";

const ProfileDetail = ({navigation}) => {
  const user = getUser();
  
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", padding: 20 }}>
      <View style={{ alignSelf: "center" }}>
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
        <View style={{width:80,alignSelf: 'center',paddingTop:8}}>
          <Button title="Log Out" onPress={async ()=>{
            await AsyncStorage.removeItem("locuser");
            navigation.navigate("login")
          }}></Button>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetail;
