import { View, Text } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
export const RecordItem = (props) => {
  const d = new Date(props.date)
  const {deleteRecords,index,setRecords}=props;
  return (
    
    <View style={{backgroundColor:'yellow', borderWidth:10, borderColor:'cyan',marginTop: 4 ,marginBottom:4,padding:10,borderRadius:20,}}>
     <View style={{position:'absolute',right:10}}>
       <TouchableOpacity onPress={()=>{
         deleteRecords(index,setRecords)
       }}><Text>X</Text>
      </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 25 }}>{props.type}</Text>
      <Text style={{ fontSize: 25 }}>{props.val}</Text>
      <Text style={{ fontSize: 15 }}>{moment(d).format("DD-MMM-YYYY hh:mm:ss A")}</Text>
    
    
  </View>
  )
}