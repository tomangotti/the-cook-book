import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

const Home = () => {
    const router = useRouter();


    return(
        <View>
            <Text>
                HERE I AM, HELLO WORLD
            </Text>
        </View>
    )
}

export default Home