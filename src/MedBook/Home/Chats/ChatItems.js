import { Text, View } from "react-native";
import getUser from "../../../Actions/getUserAction";

const ChatItem=({item})=>{
    const user=getUser()
    
    return(
        <View style={{height:80,backgroundColor:'#ffffff',borderBottomColor:'lightblue',borderBottomWidth:1,paddingTop:16,paddingBottom:16,justifyContent: 'center'}}>
            <Text >{item?.sender?._id==user?._id?item?.receiver?.name:item?.sender?.name}</Text>
        </View>
    )
}
export default ChatItem;