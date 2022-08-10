import { Image, Modal } from "react-native";

const ActivityIndicator=(props)=>{
    const {animationType='slide',transparent=true,modalVisible,loadingIcon}=props;
    return(
        <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <Image source={loadingIcon} style={{top:250,height:50,width:50,left:150}}></Image>
        </Modal>
    )
}
export default ActivityIndicator;