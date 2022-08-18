import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewPost from "./PostForms";
import PostItem from "./PostItem";
import PostList from "./PostLists";

const Stack = createNativeStackNavigator();

const PostScreens = () => {

  return (
    <Stack.Group>
      <Stack.Screen name="post-item" component={PostItem} />
      <Stack.Screen
        name="add-new-post"
        component={AddNewPost}
        options={{ presentation: "transparentModal" ,title: "Add new post" , contentStyle:{}, }}
      />
      <Stack.Screen name="post-list" component={PostList} />
    </Stack.Group>
  );
  
};

export default PostScreens;