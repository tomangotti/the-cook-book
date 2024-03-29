import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Text, FlatList, ScrollView, SafeAreaView } from "react-native";


import SignUp from "../../components/SignUp";
import Login from "../../components/LogIn";

const LogInSignUp = ({loggedIn, setLoggedIn}) => {
    const [activeTab, setActiveTab] = useState("Log-In");
    const tabs = ["Log-In", "Sign-Up"]
    const router = useRouter();




    const displayTabContent = () => {
        switch (activeTab) {
            case "Sign-Up":
                return (<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)
            case "Log-In":
                return (<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)
        }
    }


    

    function TabButton({name, onHandleSearchType}) {
        return (
            <TouchableOpacity  onPress={onHandleSearchType} style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                backgroundColor: name === activeTab ? "#312651" : "#F3F4F8",
                borderRadius: 16,
                marginLeft: 10,
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
                    fontSize: 18,
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
                headerTitle: "Sign Up or Login",
                headerTitleAlign: "center"
            }}/>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{alignItems: "center", margin: 15}}>
                    <Text style={{fontSize: 18}}>Welcome to The Cook Book</Text>
                    <Text style={{fontSize: 16}}>Please Log in OR Sign Up</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 25}}>
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

export default LogInSignUp