import react, { useState } from "react";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { TouchableOpacity, SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getUserInfo from "../../components/hooks/getUserInfo";
import ProfileInfoCard from "../new-recipe-form/profileInfoCard";
import ButtonTemplate from "../../components/buttons/buttonTemplate";
import ProfileEditForm from "../new-recipe-form/profileEditForm";


const profileHome = () => {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const { userInfo, isLoading, error, reFetch } = getUserInfo()
    const [editFormActive, setEditFormActive] = useState(false)

    const buttonOptions = () => {
        if (editFormActive) {
            return (
                <View>
                    <ButtonTemplate title="Cancel" pressed={handleCancel} color="grey"/>
                </View>
            )
        } else {
            return (
            <View>
                <ButtonTemplate title="Edit" pressed={handleEdit} color="grey" />
            </View>
            )
        }
    }

    function handleEdit() {
        setEditFormActive(!editFormActive)
    }

    function handleCancel() {
        setEditFormActive(!editFormActive)
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
                    headerTitle: "Profile Details",
                    headerTitleAlign: "center"
                }}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <ActivityIndicator size="large" />) : 
                        error ? (
                            <View>
                                <Text>Something Went Wrong:</Text>
                                <Text>{error}</Text>
                                <TouchableOpacity onPress={reFetch}>
                                    <Text>Retry</Text>
                                </TouchableOpacity>
                            </View> ) : editFormActive ? (<ProfileEditForm userInfo={userInfo} />) :
                            (<ProfileInfoCard userInfo={userInfo}/>)
                }
                {buttonOptions()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default profileHome