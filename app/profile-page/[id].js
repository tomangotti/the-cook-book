import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { Stack, useGlobalSearchParams } from 'expo-router';

import getProfileInformation from '../../components/hooks/getProfileInformation';

const ProfilePage = () => {
    const params = useGlobalSearchParams();
    const {data, isLoading, error, reFetch} = getProfileInformation(params.id)

    const userName = () => {
        if (data.profile.name) {
            return user.name;
        } else {
            return "Profile Name";
        }
    }
    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
                ),
                headerTitle: userName(),
                headerTitleAlign: "center"
            }} />
            <View>
            <Text>Followers: {user.followers}</Text>
            <Text>Recipes: {user.recipes.length}</Text>
            <FlatList
                data={user.recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}
            />
        </View>
        </SafeAreaView>
        
    );
};

export default ProfilePage;
