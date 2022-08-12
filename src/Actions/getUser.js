import AsyncStorage from "@react-native-async-storage/async-storage";
const getUserHelper =  () => {
   return  AsyncStorage.getItem("locuser").then(res=>{return res});
};
const getUser =  () =>{
    return getUserHelper();
}
export default getUser;
