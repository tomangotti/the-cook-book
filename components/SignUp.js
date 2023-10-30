import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button} from 'react-native';


import ButtonTemplate from "./buttons/buttonTemplate";
import postNewUser from "./hooks/postNewUser";


const SignUp = ({loggedIn, setLoggedIn}) => {
    const [email, setEmail] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [username, setUsername] = useState("")

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
                setLoggedIn(post)
            } else if(post === false) {
                alert("Sign up failed")
                setLoggedIn(post)
            }
        }
        
    }

    return (
        <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
            <View >
                <Text>Email</Text>
                <TextInput  value={email} onChangeText={setEmail} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
            </View>
            <View >
                <Text>Username</Text>
                <TextInput  value={username} onChangeText={setUsername} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
            </View>
            <View>
                <Text>First Name</Text>
                <TextInput  value={fName} onChangeText={setFName} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
            </View>
            <View>
                <Text>Last Name</Text>
                <TextInput  value={lName} onChangeText={setLName} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
            </View>
            <View>
                <Text>Password</Text>
                <TextInput  value={password} onChangeText={setPassword} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
            </View>
            <View>
                <Text>Password Confirmation</Text>
                <TextInput  value={passwordConfirm} onChangeText={setPasswordConfirm} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
            </View>
            <View style={{width: "80%", margin:15}}>
                <ButtonTemplate title="Sign Up" color="blue" pressed={handleSignUp} />
            </View>
        </View>
    )
}


export default SignUp