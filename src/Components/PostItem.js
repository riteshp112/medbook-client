import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import medFetch from '../Actions/fetch';
// import CrossPlatformIcon from 'react-native-cross-platform-icons';
import { loadPost } from '../Screens/Post';
import { comment, dislike, like, logo, send } from '../Icons';
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
      <Image source={logo}
      //{{uri:"https://raw.githubusercontent.com/riteshp112/Responsive-Resume/master/assets/img/logo.png"}} 
      style={{height:75,width:'100%',resizeMode:'contain'}}>
      </Image>
      <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center',marginTop:10}}>
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
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',}}>
        <Image source={like} style={{height:15,width:15}}></Image>
      {/* <CrossPlatformIcon name='thumbs-up'size={15}></CrossPlatformIcon> */}
      <Text style={{marginLeft:10,}}>{item?.likes}</Text>
      </View>
      </TouchableOpacity> 
      <TouchableOpacity onPress={()=>{
        setShowComments(!showComments)
      }} >
      <View style={{paddingLeft:20,flex:1,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',}}>
        {/* <CrossPlatformIcon name='chatbubbles'size={15}></CrossPlatformIcon> */}
        <Image source={comment} style={{height:20,width:20}}></Image>
        <Text style={{marginLeft:10,}}>{item?.comments.length}</Text>
      </View>     
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
      <View style={{flex:1,flexDirection:'row',marginLeft:20, justifyContent:'center',alignContent:'center',alignItems:'center',}}>
      <Image source={dislike} style={{width:15,height:15}}></Image>
      {/* <CrossPlatformIcon name='thumbs-down' size={15}></CrossPlatformIcon> */}
      <Text style={{marginLeft:10}}>{item?.dislikes}</Text>
      </View>     
      </TouchableOpacity>   
       </View>
      {showComments?
      <View>
        <View style={{maxHeight:80}}>
        <ScrollView style={{flexGrow:0}} nestedScrollEnabled={true}>
        {commentComponent}
        </ScrollView>
        </View>
      <View style={{flexDirection:'row',flex:1}}>
        <TextInput multiline={true} value={newComment} style={{borderWidth:2,flex:1,minHeight:30,borderColor:'#3867d6'}} onChangeText={(value)=>{setNewComment(value)}}>
      </TextInput>
      <TouchableOpacity onPress={()=>{newComment && medFetch({
        type:'update',
        table:'post',
        id:item?._id,
        changes:{comments:[...item?.comments,newComment]}
      })
      setNewComment("")
      setTimeout(() => {
        loadPost(setPostItems, setModalVisible, PostItems)        
      }, 500); 
      }}
      style={{alignSelf:'center'}}>
      <View style={{paddingLeft:10}}>
      <Image source={send} style={{height:25,width:25}}></Image>
        {/* <CrossPlatformIcon name='send' size={30} outline></CrossPlatformIcon> */}
      </View>
      </TouchableOpacity>
      </View>
      </View>:void 0}
    </View>

  )
}
export default PostItem;