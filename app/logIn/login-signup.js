import { Stack } from "expo-router";
import react, { useState } from "react";
import { TouchableOpacity, View, Text, FlatList, ScrollView, SafeAreaView } from "react-native";

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import SignUp from "../../components/SignUp";
import Login from "../../components/LogIn";

const logInSignUp = () => {
    const [activeTab, setActiveTab] = useState("log-in");
    const tabs = ["log-in", "sign-up"]



    const displayTabContent = () => {
        switch (activeTab) {
            case "sign-up":
                return (<SignUp />)
            case "log-in":
                return (<Login />)
        }
    }



    function TabButton({name, onHandleSearchType}) {
        return (
            <TouchableOpacity  onPress={onHandleSearchType} style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                backgroundColor: name === activeTab ? "#312651" : "#F3F4F8",
                borderRadius: 16,
                marginLeft: 2,
                shadowColor: "#000",
                shadowOffset: {
                width: 0,
                height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 5.84,
                elevation: 5,
                shadowColor: "#F3F4F8",
            }}>
                <Text style={{
                    fontSize: 12,
                    color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
                }}
                    >{name}</Text>
            </TouchableOpacity>
        )
    }





    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn title={"back"} dimension="100%" handlePress={() => router.back()} />
                ),
                headerTitle: "Sign Up or Login",
                headerTitleAlign: "center"
            }}/>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    <FlatList 
                        data={tabs}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                            <TabButton name={item} onHandleSearchType={() => setActiveTab(item)} />
                        )}
                    />
                </View>
                <View>
                    {displayTabContent()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default logInSignUp