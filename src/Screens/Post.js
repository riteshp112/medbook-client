import { useState } from "react";
import { Button, Modal, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import medFetch from "../Actions/fetch";
import getUser from "../Actions/getUser";
import { createPost } from "../Actions/sendPostAction";
//import PostItem from "./PostItem"
import PostItem from "../Components/PostItem";
import { fetchURL } from "../config";
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - 50;
};
export const loadPost = (setPostItems, setModalVisible, PostItems, use) => {
  let posts = [], newPostItems = [];
  medFetch({ type: 'select', table: 'post', condition: {}, limit: "" + (PostItems.length + 5) }).then(response => response.json()).then(json => {
    posts = json.response
    if (posts.length > PostItems.length) {
      for (let item of posts)
        newPostItems.push([<PostItem key={item?._id} item={item} PostItems={PostItems} setPostItems={setPostItems} setModalVisible={setModalVisible} currentUser={use}></PostItem>])
      setPostItems(newPostItems)
    }
    setModalVisible(false)
  })
}
const Post = (props) => {
  const [PostItems, setPostItems] = useState([])
  const [modalVisible, setModalVisible] = useState(true);
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [post, setPost] = useState("")
  console.log(props)
  if (PostItems.length == 0)
    loadPost(setPostItems, setModalVisible, PostItems, props?.user);
  return (
    <View>
      <ScrollView onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          loadPost(setPostItems, setModalVisible, PostItems, props?.user)
        }
      }} style={{ flexGrow: 1,}}>
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
            color: 'cyan',
            textAlign: 'center',
            alignItems: "center",
            shadowColor: "#000",
            fontSize: 45,
            shadowOffset: {
              width: 0,
              height: 2
            }
          }}> Loading...</Text>
        </Modal>
        </ScrollView>
        {!modalVisible ?
          <View>
            <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
              <TouchableOpacity onPress={() => {
                getUser().then((data) => console.log(data))
                setCreatePostVisible(true)
              }}
                style={{ position: 'absolute', backgroundColor: 'skyblue', width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25, bottom: 10, }}>

                <Text style={{ fontSize: 20 }}>+</Text>
              </TouchableOpacity>
            </View>
            <Modal visible={createPostVisible} animationType='slide' transparent={true}>
              <View style={{ borderWidth: 5, borderRadius: 10, backgroundColor: '#fff', bottom: 100, position: 'absolute', height: 220, width: '100%' }}>

                <TextInput multiline={true} style={{ minHeight: 150 }} onChangeText={(value) => { setPost(value) }}>
                </TextInput>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, padding: 10 }}>
                    <Button title='Post' onPress={() => {
                      createPost({ use: props?.user?.username || "1234", post: post }),
                        setCreatePostVisible(false)
                    }}>
                    </Button>
                  </View>
                  <View style={{ flex: 1, padding: 10 }}>
                    <Button title='Cancel' onPress={() => { setCreatePostVisible(false) }}>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </View> : void 0}
      
      </View>
  )
}
export default Post;