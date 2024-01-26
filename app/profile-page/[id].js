import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Stack, useGlobalSearchParams, useRouter, ActivityIndicator } from 'expo-router';

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getProfileInformation from '../../components/hooks/getProfileInformation';
import getUserInfo from '../../components/hooks/getUserInfo';
import RecipeCard from '../../components/RecipeCard';

const ProfilePage = () => {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const {profileData, recipeData, isLoading, error, reFetch} = getProfileInformation(params.id)
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
                    if (profileData.id && userInfo.id && userInfo.id == profileData.id) {
                        return (
                            <ScreenHeaderBtn title={"Edit"} dimension="100%" handlePress={() => router.push(`/profile-details/${params.id}`)} />
                        )
                    }
                },
                headerTitle: "Profile Page",
                headerTitleAlign: "center"
            }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View>
                        <Text style={{fontSize: 32, textAlign: "center", margin: 15}}>{profileData.username}</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20}}>
                            <Text style={{fontSize: 16}}>Followers: {profileData.followers_count}</Text>
                        </View>
                        <View style={{flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20}}>
                            <Text style={{fontSize: 16}}>Following: {profileData.following_count}</Text>
                        </View>
                        <View style={{flex: 1, padding: 20}}>
                            <Text style={{fontSize: 16}}>Recipes: {profileData.recipes_count}</Text>
                        </View>
                    </View>
                    
                    <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                            <Text style={{fontSize: 24}}>Groups</Text>
                    </View>
                    
                    <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                            <Text style={{fontSize: 24}}>Recipes</Text>
                    </View>
                    
                    <View style={{marginTop: 8, gap: 1, alignItems: "center",}}>
                        {recipeData?.map((item) => (  
                            <RecipeCard item={item} key={item.id} user_id={userInfo.id} handleNavigate={() => router.push(`/recipe-details/${item.id}`)} />
                        ))}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfilePage;
