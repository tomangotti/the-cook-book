import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import { useRouter } from "expo-router";

import ButtonTemplate from "./buttons/buttonTemplate";
import postNewUser from "./hooks/postNewUser";



const SignUp = () => {
    const [email, setEmail] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [username, setUsername] = useState("")
    const router = useRouter()

    const handleSignUp = async () => {

        if(password !== passwordConfirm) {
            alert("Your password does not match")
        } else {
            const userInfo = {
                email: email,
                first_name: fName,
                last_name: lName,
                password: password,
                username: username,
            }
            const post = await postNewUser(userInfo)
            if(post === true) {
                router.replace("/home")
            } else if(post === false) {
                alert("Sign up failed, please try again later")
                
            }
        }
        
    }

    return (
        <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
            <View style={{margin: 5}}>
                <Text style={{fontSize: 18}}>Email</Text>
                <TextInput  value={email} onChangeText={setEmail} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
            </View>
            <View style={{margin: 5}}>
                <Text style={{fontSize: 18}}>Username</Text>
                <TextInput  value={username} onChangeText={setUsername} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
            </View>
            <View style={{margin: 5}}>
                <Text style={{fontSize: 18}}>First Name</Text>
                <TextInput  value={fName} onChangeText={setFName} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
            </View>
            <View style={{margin: 5}}>
                <Text style={{fontSize: 18}}>Last Name</Text>
                <TextInput  value={lName} onChangeText={setLName} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
            </View>
            <View style={{margin: 5}}>
                <Text style={{fontSize: 18}}>Password</Text>
                <TextInput  value={password} onChangeText={setPassword} secureTextEntry={true} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
            </View>
            <View style={{margin: 5}}>
                <Text style={{fontSize: 18}}>Password Confirmation</Text>
                <TextInput  value={passwordConfirm} onChangeText={setPasswordConfirm} secureTextEntry={true} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
            </View>
            <View style={{width: "80%", margin:15}}>
                <ButtonTemplate title="Sign Up" color="blue" pressed={handleSignUp} />
            </View>
        </View>
    )
}


export default SignUp