import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import SignUp from "../components/SignUp";



const Home = () => {
    const router = useRouter();


    return(
        <SafeAreaView>
            <SignUp />
        </SafeAreaView>
    )
}

export default Home