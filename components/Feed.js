import React from 'react';
import {  SafeAreaView, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView } from 'react-native';
import {Stack, useRouter } from 'expo-router';

import getRecipes from './hooks/getRecipes';
import RecipeCard from './RecipeCard';
import PopularRecipeCard from './cards/popularRecipeCard';
import ScreenHeaderBtn from './ScreenHeaderBtn';


const Feed = ({userId, loggedIn, setLoggedIn}) => {
    const router = useRouter();
    
    const { data, isLoading, error, reFetch} = getRecipes('recipes/all');

    return (
        <SafeAreaView style={{flex: 1}}>
                <Stack.Screen 
                    options={{
                        headerShadowVisible: false,
                        headerStyle: {backgroundColor: "#FAFAFC"},
                        headerLeft: () => (
                            loggedIn ? 
                            <ScreenHeaderBtn title={"Saved Recipes"} dimension='75%' handlePress={() => router.push(`/saved-recipes/${userId}`)} /> :
                            null
                        ),
                        headerRight: () => (
                            loggedIn ? 
                                <ScreenHeaderBtn title={"Profile Info"} dimension='100%' handlePress={() => router.push('profile-details/profile-home')} /> :
                                <ScreenHeaderBtn title={"Log in"} dimension='100%' handlePress={() => router.push('logIn/login-signup')}/>
                        ),
                        headerTitle: "The Good Cook Book",
                        headerTitleAlign: "center",
                    }}
                />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{margin: 24}}>
                    <View style={{ margin: 6}}>
                        <Text style={{fontSize: 16}}>Popular Recipes</Text>
                    </View>

                    <View style={{
                        margin: 8,
                        gap: 12
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

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 8
                    }}>
                        <Text style={{fontSize: 16}}>New Recipes</Text>
                    </View>
                    <View style={{
                        marginTop: 8,
                        gap: 1
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