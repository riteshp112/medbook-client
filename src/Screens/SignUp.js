import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Button } from 'react-native';
import medFetch from '../Actions/fetch';
const SignUp = (props) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setdob] = useState("");
  const saveUser = ({signsuccess})=> {
    medFetch({ type: 'insert', table: 'testcol', data: { name, username, password, gender, dob }});
    alert("SignUp Sucessfull");
    signsuccess(false);
  }
  return (
    <View>
      <Text>Name:</Text>
      <TextInput style={{ borderWidth: 2, marginTop: 2, height: 25 }} onChangeText={(value) => setName(value)}>
      </TextInput>
      <Text>Username</Text>
      <TextInput style={{ borderWidth: 2, marginTop: 2, height: 25 }} onChangeText={(value) => setUserName(value)}>
      </TextInput>
      <Text>Password</Text>
      <TextInput style={{ borderWidth: 2, marginTop: 2, height: 25 }} onChangeText={(value) => setPassword(value)}>
      </TextInput>
      <Text>Gender</Text>
      <Picker onValueChange={(itemValue, itemIndex) => setGender(itemValue)} >
        <Picker.Item value="" label="Select Your Gender"></Picker.Item>
        <Picker.Item value="M" label="M"></Picker.Item>
        <Picker.Item value="F" label="F"></Picker.Item>
      </Picker >
      <Text>Dob</Text>
      <TextInput value={dob} 
      keyboardType={'numbers-and-punctuation'}
      maxLength={10}
      style={{ borderWidth: 2, marginTop: 2, height: 25 }} onChangeText={(value)=>{
        if(value.length==2 || value.length==5)
          value=value+'/'
        setdob(value)}} placeholder={"DD/MM/YYYY"} ></TextInput>
      <Button title={"Sign UP"} onPress={()=>{
        if(password.length>=8)
          saveUser({signsuccess:props.signsuccess});
        else
          alert("Password length must be greater than 8 characters.")
        }}></Button>
      <View style={{flexDirection:'row',marginTop:16,justifyContent:'center'}}>
        <Text style={{marginTop:10}}>Already have a Account? </Text>
        <Button title={'Login'} onPress={()=>props.signsuccess(false)}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 export default SignUp;