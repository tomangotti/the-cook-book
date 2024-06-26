import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView} from 'react-native';
import { Stack } from "expo-router";
import { useRouter} from "expo-router";

import ButtonTemplate from "../../components/buttons/buttonTemplate";
import PostCodeCheck from "../../components/hooks/PostCodeCheck";
import ImageHeaderButton from "../../components/buttons/ImageHeaderButton";

const EnterCodeForm = () => {
    const [code, setCode] = useState("");
    const [countdown, setCountdown] = useState(300); 
    const router = useRouter();
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handlePress = async () => {
        if (countdown <= 0) {
            alert("Code Expired");
            router.back();
            return;
        }
        
        const response = await PostCodeCheck(code);
        console.log(response);
        if (!response) {
            alert("Invalid Code");
            return;
        }
        router.push(`/forgot-password-form/${response}`);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return(
        <SafeAreaView>
            <Stack.Screen options={{
                headerShadowVisible: false,
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerTitle: "Enter Code",
                headerTitleAlign: "center",
                headerLeft: () => (
                    <ImageHeaderButton imageTitle={"back"} handlePress={() => router.back()} />
                )
            }}/>
            <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
                <View style={{margin: 5}}>
                    <Text style={{fontSize: 18}}>Code</Text>
                    <TextInput  value={code} onChangeText={setCode} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
                </View>
                <View style={{width: "80%", margin:15}}>
                    <ButtonTemplate title="Submit" color="blue" pressed={handlePress} />
                </View>
                <Text style={{fontSize: 18, marginTop: 20}}>Countdown: {formatTime(countdown)}</Text>
            </View>
        </SafeAreaView>
    )
}


export default EnterCodeForm;