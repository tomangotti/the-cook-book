import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { Stack, useGlobalSearchParams, router, ActivityIndicator } from 'expo-router';

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getProfileInformation from '../../components/hooks/getProfileInformation';
import getUserInfo from '../../components/hooks/getUserInfo';

const ProfilePage = () => {
    const params = useGlobalSearchParams();
    const {data, isLoading, error, reFetch} = getProfileInformation(params.id)
    const {userInfo} = getUserInfo();
    

    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
                ),
                headerRight: () => {
                    if (data.id && userInfo.id && userInfo.id == data.id) {
                        return (
                            <ScreenHeaderBtn title={"Edit"} dimension="100%" handlePress={() => router.push(`/profile-details/${params.id}`)} />
                        )
                    }
                },
                headerTitle: "Profile Page",
                headerTitleAlign: "center"
            }} />
            <View>
                <View>
                    <Text style={{fontSize: 32, textAlign: "center", margin: 15}}>{data.username}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20}}>
                        <Text style={{fontSize: 18}}>Followers: {data.followers_count}</Text>
                    </View>
                    <View style={{flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20}}>
                        <Text style={{fontSize: 18}}>Following: {data.following_count}</Text>
                    </View>
                    <View style={{flex: 1, padding: 20}}>
                        <Text style={{fontSize: 18}}>Recipes: {data.recipes_count}</Text>
                    </View>
                </View>
                
                <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                        <Text style={{fontSize: 24}}>Recipes</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfilePage;
