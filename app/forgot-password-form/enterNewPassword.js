import React, { useState} from "react";
import { View, Text, TextInput, SafeAreaView} from 'react-native';
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

import ButtonTemplate from "../../components/buttons/buttonTemplate";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import PostNewPassword from "../../components/hooks/PostNewPassword";


const EnterNewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const user_id = router.params.user_id;
    const handlePress = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const response = await PostNewPassword(password, user_id);
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
                    <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
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