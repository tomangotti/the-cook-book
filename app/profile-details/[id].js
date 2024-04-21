import React, { useEffect, useState } from "react";
import { Stack, useGlobalSearchParams, router } from "expo-router";

import { TouchableOpacity, SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getUserInfo from "../../components/hooks/getUserInfo";
import ProfileInfoCard from "./profileInfoCard";
import ButtonTemplate from "../../components/buttons/buttonTemplate";
import ProfileEditForm from "./profileEditForm";
import storeToken from "../../components/tokens/storeToken";
import removeToken from "../../components/tokens/removeToken";
import BackImageHeaderButton from "../../components/buttons/BackImageHeaderButton";


const profileHome = () => {
    // const router = useRouter();
    const params = useGlobalSearchParams();
    const { userInfo, isLoading, error, reFetch } = getUserInfo()
    const [editFormActive, setEditFormActive] = useState(false)
    const [deleteFormActive, setDeleteFormActive] = useState(false)


    const buttonOptions = () => {
        if (editFormActive) {
            return (
                <View>
                    <ButtonTemplate title="Cancel" pressed={handleCancel} color="grey"/>
                    <ButtonTemplate title={deleteFormActive ? 'Cancel' : 'Delete Account'} pressed={handleDeleteForm} color={deleteFormActive ? 'grey' : 'red'} />
                    {deleteFormActive ? (<ButtonTemplate title='Confirm Delete' pressed={handleDelete} color='red' />) : null}
                </View>
            )
        } else {
            return (
            <View>
                <ButtonTemplate title="Edit" pressed={handleEdit} color="grey" />
                <ButtonTemplate title="Log Out" pressed={handleLogOut} color="grey" />
            </View>
            )
        }
    }

    async function handleLogOut() {
        try{
            const att = await removeToken();
            router.replace('/home')
        } catch (e) {
            console.error(e)
            alert('Log Out failed! Please try again later')
        }   
    }


    function handleEdit() {
        setEditFormActive(!editFormActive)
    }

    function handleCancel() {
        setEditFormActive(!editFormActive)
    }

    function handleDelete() {
    }

    function handleDeleteForm() {
        setDeleteFormActive(!deleteFormActive)
    }


    return (
        <SafeAreaView>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <BackImageHeaderButton handlePress={() => router.back()} />
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