import React, { useState} from "react";
import { View, Text, TextInput, SafeAreaView} from 'react-native';
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

import ButtonTemplate from "../../components/buttons/buttonTemplate";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";



const EnterNewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handlePress = () => {
        // Handle submit button press
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
                    <Text style={{fontSize: 18}}>Password</Text>
                    <TextInput  value={password} onChangeText={setPassword} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
                </View>
                <View style={{margin: 5}}>
                    <Text style={{fontSize: 18}}>Confirm Password</Text>
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