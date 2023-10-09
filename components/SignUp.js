import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button} from 'react-native';



const SignUp = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")


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
                <TouchableOpacity onPress={() => null} style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 15,
                    marginBottom: 15,
                    borderRadius: 15,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                    shadowOpacity: 0.25,
                    shadowRadius: 5.84,
                    elevation: 5,
                }}>
                    <Button title="Sign Up" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default SignUp