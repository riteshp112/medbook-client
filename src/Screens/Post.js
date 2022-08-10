import { useState } from "react";
import { ActivityIndicator, Button, Image, Modal, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import medFetch from "../Actions/fetch";
import getUser from "../Actions/getUser";
import { createPost } from "../Actions/sendPostAction";
import PostItem from "../Components/PostItem";
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - 50;
};
export const loadPost = (setPostItems, PostItems=[], use) => {
  let posts = [], newPostItems = [];
  medFetch({ type: 'select', table: 'post', condition: {}, limit: 0 +"" + (PostItems && PostItems?.length ||0)+5 }).then(response => response.json()).then(json => {
    posts = json.response
    if (posts.length > PostItems.length) {
      for (let item of posts)
        newPostItems.push([<PostItem key={item?._id} item={item} PostItems={PostItems} setPostItems={setPostItems}  currentUser={use}></PostItem>])
      setPostItems(newPostItems)
    }
  })
}
const Post = (props) => {
  const [PostItems, setPostItems] = useState([])
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [post, setPost] = useState("")
  console.log(props)
  if (PostItems.length == 0)
    loadPost(setPostItems, PostItems, props?.user);
  return (
    <View style={{flexGrow:1,flexDirection: 'column',height:'100%',width:'100%',position:'absolute',top:0,left:0,overflow:'hidden'}}>
      <ScrollView onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          loadPost(setPostItems, PostItems, props?.user)
        }
      }}>
        {PostItems}
          <ActivityIndicator size='large' color='grey'></ActivityIndicator>
      </ScrollView>
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
    </View>
  )
}
export default Post;