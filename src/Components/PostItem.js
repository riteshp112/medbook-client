import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import medFetch from '../Actions/fetch';
import { loadPost } from '../Screens/Post';
 const PostItem = (props) => {
  const {item,PostItems,setPostItems,setModalVisible}=props;
  const [newComment,setNewComment]=useState("")
  const [showComments,setShowComments]=useState(false)
  let commentComponent=item.comments && item?.comments?.map((item)=><Text>{item}</Text>) ||[]
  return (
    <View style={{backgroundColor:'yellow', borderWidth:10, borderColor:'cyan',marginTop: 4 ,marginBottom:4,padding:10,borderRadius:20,}}>
      <Text style={{ fontSize: 20, color: 'blue',paddingBottom:16 }}>
        {item?.use}
      </Text>
      <Text style={{ fontSize: 15 ,paddingBottom:16 }}>
        {item?.post}
      </Text>
      <Image source={{uri:"https://raw.githubusercontent.com/riteshp112/Responsive-Resume/master/assets/img/logo.png"}} style={{height:75,width:'100%',resizeMode:'contain'}}>
      </Image>
      <View style={{flexDirection:'row',flex:1,alignItems:'center',}}>
      <TouchableOpacity onPress={()=>{medFetch({
        type:'update',
        table:'post',
        id:item?._id,
        changes:{likes:item?.likes+1}
      })
      setTimeout(() => {
        loadPost(setPostItems, setModalVisible, PostItems)        
      }, 500); 
      }}>
      <Text style={{flex:1,marginLeft:15}}>Likes {item?.likes}</Text>
      </TouchableOpacity> 
      <TouchableOpacity onPress={()=>{
        setShowComments(!showComments)
      }} >
     <Text style={{flex:1,marginLeft:15}}>Comments {item?.comments.length}</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>{medFetch({
        type:'update',
        table:'post',
        id:item?._id,
        changes:{dislikes:item?.dislikes+1}
      })
      setTimeout(() => {
        loadPost(setPostItems, setModalVisible, PostItems)        
      }, 500); 
      }}>
     <Text style={{flex:1,marginLeft:15}}>Dislikes {item?.dislikes}</Text>
     </TouchableOpacity>   
       </View>
      {showComments?
      <View>
        <View style={{maxHeight:80}}>
        <ScrollView style={{flexGrow:0}}>
        {commentComponent}
        </ScrollView>
        </View>
      <View style={{flexDirection:'row',flex:1}}>
        <TextInput multiline={true} value={newComment} style={{borderWidth:2,flex:1,minHeight:30}} onChangeText={(value)=>{setNewComment(value)}}>
      </TextInput>
      <TouchableOpacity onPress={()=>{medFetch({
        type:'update',
        table:'post',
        id:item?._id,
        changes:{comments:[...item?.comments,newComment]}
      })
      setNewComment("")
      setTimeout(() => {
        loadPost(setPostItems, setModalVisible, PostItems)        
      }, 500); 
      }}>
      <Text style={{paddingLeft:10}}>{'>>'}</Text>
      </TouchableOpacity>
      </View>
      </View>:void 0}
    </View>

  )
}
export default PostItem;