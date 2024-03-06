import React, {useCallback, useState} from 'react';
import {  SafeAreaView, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView, RefreshControl } from 'react-native';
import {Stack, useRouter } from 'expo-router';

import getFeed from './hooks/getFeed';
import RecipeCard from './RecipeCard';
import PopularRecipeCard from './cards/popularRecipeCard';
import ScreenHeaderBtn from './ScreenHeaderBtn';
import ButtonTemplate from './buttons/buttonTemplate';
import FeedCardType from './cards/feedCardType';



const Feed = ({userId, loggedIn, setLoggedIn}) => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const { data, isLoading, error, reFetch} = getFeed(userId);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetch()
        setRefreshing(false)
    }, []);

    function handleAskBot() {
        router.push(`/chat-bot/${userId}`)
    }

    function handleSearch() {
        router.push(`/search-page/${userId}`)
    }

    
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen 
                options={{
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerLeft: () => (
                        loggedIn ? 
                        <ScreenHeaderBtn title={"Your Recipes"} dimension='75%' handlePress={() => router.push(`/your-recipes/${userId}`)} /> :
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
                <ButtonTemplate title="Search All" color="blue" pressed={handleSearch} />

                <View style={{margin: 0}}>
                    {/* <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                        <Text style={{fontSize: 24}}>Popular Cool Recipes</Text>
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
                        ) : ( <FlatList data={data.most_favorited_recipes} renderItem={({item}) => (
                                <PopularRecipeCard item={item} key={item.id} user_id={userId} handleNavigate={() => router.push(`/recipe-details/${item.id}`)} />
                        )} 
                        keyExtractor={item => item?.id}
                        contentContainerStyle={{columnGap: 8}}
                        horizontal
                        />
                        )}
                    </View> */}
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
                    ) : data.map((list) => {
                        return <FeedCardType data={list} key={list} userId={userId} />
                    })}

                    {/* <View style={{alignItems: "center", marginTop: 15, backgroundColor: "lightgrey"}}>
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
                    </View> */}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Feed;