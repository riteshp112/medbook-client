import { useState } from "react";
import { View, Modal, Text } from "react-native"
import { ScrollView } from "react-native";
import medFetch from "../Actions/fetch";
//import PostItem from "./PostItem"
import PostItem from "../Components/PostItem";
import { fetchURL } from "../config";
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - 50;
};
export const loadPost = (setPostItems,setModalVisible,PostItems,use) => {
  let posts=[],newPostItems=[];
  medFetch({type:'select',table:'post',condition:{} ,limit: "" + (PostItems.length+5)}).then(response=>response.json()).then(json=>{posts=json.response
    if (posts.length > PostItems.length){
      for (let item of posts)     
        newPostItems.push([<PostItem key={item?._id} item={item} PostItems={PostItems} setPostItems={setPostItems} setModalVisible={setModalVisible} currentUser={use}></PostItem>])
      setPostItems(newPostItems)
    }
  setModalVisible(false)})
  }
const Post = (props) => {
  const [PostItems, setPostItems] = useState([])
  const [modalVisible, setModalVisible] = useState(true);
  console.log(props)
  if (PostItems.length == 0)
    loadPost(setPostItems, setModalVisible, PostItems,props?.user);
  return (
    <ScrollView onScroll={({ nativeEvent }) => {
      if (isCloseToBottom(nativeEvent)) {
        loadPost(setPostItems, setModalVisible, PostItems,props?.user)
      }
    }} style={{flexGrow:1}}>
      {PostItems}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ position: "absolute" }}
      >
        <Text style={{
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          top: 200,
          color: 'blue',
          textAlign: 'center',
          alignItems: "center",
          shadowColor: "#000",
          fontSize: 45,
          shadowOffset: {
            width: 0,
            height: 2
          }
        }}> Loading</Text>
      </Modal>
    </ScrollView>

  )
}
export default Post;