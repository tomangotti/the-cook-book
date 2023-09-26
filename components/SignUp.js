import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';



const SignUp = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [about, setAbout] = useState("")

    return (
        <View>
            <View>
                <Text>Email</Text>
                <TextInput  value={email} onChangeText={setEmail}></TextInput>
            </View>
            <View>
                <Text>Name</Text>
                <TextInput  value={name} onChangeText={setName}></TextInput>
            </View>
            <View>
                <Text>Password</Text>
                <TextInput  value={password} onChangeText={setPassword}></TextInput>
            </View>
            <View>
                <Text>Password Confirmation</Text>
                <TextInput  value={passwordConfirm} onChangeText={setPasswordConfirm}></TextInput>
            </View>
            <View>
                <TouchableOpacity onPress={() => setAbout(`${email} ${name} ${password} ${passwordConfirm}`)}>
                    <Text>SignUp</Text>
                </TouchableOpacity>
            </View>
            {about ? <Text>{about}</Text> : null}
        </View>
    )
}


export default SignUp