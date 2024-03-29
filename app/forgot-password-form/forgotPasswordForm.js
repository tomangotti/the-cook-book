import React from "react"
import { useState } from "react"
import { View, Text, TextInput, SafeAreaView} from 'react-native';
import { Stack } from "expo-router";

import ButtonTemplate from "../../components/buttons/buttonTemplate";
import { useRouter } from "expo-router";
import PostEmailForPasswordReset from "../../components/hooks/postEmailForPasswordReset";
import BackImageHeaderButton from "../../components/buttons/BackImageHeaderButton";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("")
    const router = useRouter()

    const handlePress = async () => {
        if(email === ""){
            router.push("/forgot-password-form/enterCodeForm")
            return;
        }
        const response = await PostEmailForPasswordReset(email)
        console.log(response)
        if (!response) {
            alert("Email not found")
            return
        } else{
            router.push("/forgot-password-form/enterCodeForm")
        }
        
    }

    return(
        <SafeAreaView>
        <Stack.Screen options={{
            headerShadowVisible: false,
            headerStyle: {backgroundColor: "#FAFAFC"},
            headerTitle: "Forgot Password",
            headerTitleAlign: "center",
            headerLeft: () => (
                <BackImageHeaderButton handlePress={() => router.back()} />
            )
        }}/>
        <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
            <View style={{margin: 5}}>
                <Text style={{fontSize: 18}}>Email</Text>
                <TextInput  value={email} onChangeText={setEmail} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
            </View>
            <View style={{width: "80%", margin:15}}>
                <ButtonTemplate title="Send Code" color="blue" pressed={handlePress} />
            </View>
        </View>
        </SafeAreaView>
    )
}

export default ForgotPasswordForm;