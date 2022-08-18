import { Text, TouchableOpacity, View } from "react-native";

const FloatingActionComponent = ({onPress,text}) => {

    return (
      <View style={{ alignItems: "flex-end", marginRight: 10 }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            position: "absolute",
            backgroundColor: "#ffffff",
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            bottom: 10,
            borderWidth: 1,
            borderColor: "lightgray",
          }}
        >
          <Text style={{ fontSize: 20 }}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
    
  };

  export default FloatingActionComponent;