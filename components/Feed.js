import React, {useCallback, useState} from 'react';
import {  SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import {Stack, useRouter } from 'expo-router';

import getFeed from './hooks/getFeed';
import ScreenHeaderBtn from './ScreenHeaderBtn';
import FeedCardType from './cards/feedCardType';
import SmallButtonTemplate from './buttons/smallButtonTemplate';




const Feed = ({userId}) => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const { data, isLoading, error, reFetch} = getFeed(userId);
    let n = 0;

    const backgroundColorChooser = () => {
        options = ["#FAFAFC", ""]
        if(n === 0){
            n = 1
            return options[0]
        } else if(n === 1){
            n = 0
            return options[1]
        }
    }


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
                        <ScreenHeaderBtn title={"Your Recipes"} dimension='75%' handlePress={() => router.push(`/your-recipes/${userId}`)} /> 
                    ),
                    headerRight: () => ( 
                            <ScreenHeaderBtn title={"Profile Page"} dimension='100%' handlePress={() => router.push(`/profile-page/${userId}`)} />
                    ),
                    headerTitle: "The Good Cook Book",
                    headerTitleAlign: "center",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 5}}>
                    <SmallButtonTemplate title="Ask Chef" color="blue" pressed={handleAskBot} />
                    <SmallButtonTemplate title="Search All" color="blue" pressed={handleSearch} />
                </View>
                

                <View style={{margin: 0}}>
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
                        return <FeedCardType data={list} key={list} userId={userId} backgroundColor={backgroundColorChooser()} />
                    })}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Feed;