import { View, Text,Image } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { deleteIcon } from '../Icons';
// import CrossPlatformIcon from 'react-native-cross-platform-icons';
export const RecordItem = (props) => {
  const d = new Date(props.date)
  const {deleteRecords,index,setRecords}=props;
  return (
    
    <View style={{backgroundColor:'yellow', borderWidth:10, borderColor:'cyan',marginTop: 4 ,marginBottom:4,padding:10,borderRadius:20,}}>
     <View style={{position:'absolute',right:10}}>
       <TouchableOpacity style={{paddingTop:5}} onPress={()=>{
         deleteRecords(index,setRecords)
       }}>
        <Image source={deleteIcon} style={{height:24,width:24}}></Image>
        {/* <CrossPlatformIcon name='trash' size={20}></CrossPlatformIcon> */}
       </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 25 }}>{props.type}</Text>
      <Text style={{ fontSize: 25 }}>{props.val}</Text>
      <Text style={{ fontSize: 15 }}>{moment(d).format("DD-MMM-YYYY hh:mm:ss A")}</Text>
    
    
  </View>
  )
}