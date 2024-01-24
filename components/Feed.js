import React, {useCallback, useState} from 'react';
import {  SafeAreaView, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView, RefreshControl } from 'react-native';
import {Stack, useRouter } from 'expo-router';

import getRecipes from './hooks/getRecipes';
import RecipeCard from './RecipeCard';
import PopularRecipeCard from './cards/popularRecipeCard';
import ScreenHeaderBtn from './ScreenHeaderBtn';
import ButtonTemplate from './buttons/buttonTemplate';


const Feed = ({userId, loggedIn, setLoggedIn}) => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const { data, isLoading, error, reFetch} = getRecipes('recipes/all');

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetch()
        setRefreshing(false)
    }, []);

    function handleAskBot() {
        router.push(`/chat-bot/${userId}`)
    }

    
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen 
                options={{
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerLeft: () => (
                        loggedIn ? 
                        <ScreenHeaderBtn title={"Your Recipes"} dimension='75%' handlePress={() => router.push(`/saved-recipes/${userId}`)} /> :
                        null
                    ),
                    headerRight: () => (
                        loggedIn ? 
                            <ScreenHeaderBtn title={"Profile Page"} dimension='100%' handlePress={() => router.push(`/profile-page/${userId}`)} /> :
                            <ScreenHeaderBtn title={"Log in"} dimension='100%' handlePress={() => router.push('logIn/login-signup')}/>
                    ),
                    headerTitle: "The Good Cook Book",
                    headerTitleAlign: "center",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <ButtonTemplate title="Ask Chef" color="blue" pressed={handleAskBot} />
                <View style={{margin: 0}}>
                    <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                        <Text style={{fontSize: 24}}>Popular Recipes</Text>
                    </View>

                    <View style={{
                        margin: 5,
                        gap: 0
                    }}>
                        {isLoading ? (
                            <ActivityIndicator size="large" />
                        ) : error ? (
                            <View>
                                <Text>Something Went Wrong:</Text>
                                <Text>{error}</Text>
                                <TouchableOpacity onPress={reFetch}>
                                    <Text>Retry</Text>
                                </TouchableOpacity>
                            </View>
                        ) : ( <FlatList data={data.most_saved_recipes} renderItem={({item}) => (
                                <PopularRecipeCard item={item} key={item.id} user_id={userId} handleNavigate={() => router.push(`/recipe-details/${item.id}`)} />
                        )} 
                        keyExtractor={item => item?.id}
                        contentContainerStyle={{columnGap: 8}}
                        horizontal
                        />
                        )}
                    </View>

                    <View style={{alignItems: "center", marginTop: 15, backgroundColor: "lightgrey"}}>
                        <Text style={{fontSize: 24}}>New Recipes</Text>
                    </View>
                    <View style={{
                        marginTop: 8,
                        gap: 1,
                        alignItems: "center",
                    }}>
                        {isLoading ? (
                            <ActivityIndicator size="large" />
                        ) : error ? (
                            <View>
                                <Text>Something Went Wrong:</Text>
                                <Text>{error}</Text>
                                <TouchableOpacity onPress={reFetch}>
                                    <Text>Retry</Text>
                                </TouchableOpacity>
                            </View>
                        ) : ( data.most_recent_recipes?.map((item) => (
                                <RecipeCard item={item} key={item.id} user_id={userId} handleNavigate={() => router.push(`/recipe-details/${item.id}`)} />
                            ))
                        )}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Feed;