import React, { useState} from "react";
import { View, Text, TextInput, SafeAreaView} from 'react-native';
import { Stack } from "expo-router";
import { useRouter, useGlobalSearchParams, } from "expo-router";

import ButtonTemplate from "../../components/buttons/buttonTemplate";
import PostNewPassword from "../../components/hooks/postNewPassword";
import BackImageHeaderButton from "../../components/buttons/BackImageHeaderButton";

const EnterNewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const params = useGlobalSearchParams();

    

    const handlePress = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("User ID: ", params.id);
        console.log("Password: ", password)
        const response = await PostNewPassword(password, params.id);
        if (!response) {
            alert("Password not changed");
            return;
        }
        router.push("/home");
        console.log("Password: ", password);

    };

    return(
        <SafeAreaView>
            <Stack.Screen options={{
                headerShadowVisible: false,
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerTitle: "Enter New Password",
                headerTitleAlign: "center",
                headerLeft: () => (
                    <BackImageHeaderButton handlePress={() => router.back()} />
                )
            }}/>
            <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
                <View style={{margin: 5}}>
                    <Text style={{fontSize: 18}}>New Password</Text>
                    <TextInput  value={password} onChangeText={setPassword} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
                </View>
                <View style={{margin: 5}}>
                    <Text style={{fontSize: 18}}>Confirm New Password</Text>
                    <TextInput  value={confirmPassword} onChangeText={setConfirmPassword} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
                </View>
                <View style={{width: "80%", margin:15}}>
                    <ButtonTemplate title="Submit" color="blue" pressed={handlePress} />
                </View>
            </View>
        </SafeAreaView>
    )
}


export default EnterNewPassword;