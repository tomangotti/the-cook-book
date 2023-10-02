import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";


import Feed from "../components/Feed";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";



const Home = () => {
    const router = useRouter();


    return(
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen 
                options={{
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerLeft: () => (
                        <ScreenHeaderBtn title={"Saved Recipes"} dimension='75%' />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn title={"Cart"} dimension='100%' />
                    ),
                    headerTitle: "The Good Cook Book",
                    headerTitleAlign: "center"
                }}
            />
            <Feed />
        </SafeAreaView>
    )
}

export default Home