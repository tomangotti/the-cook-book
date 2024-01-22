import React from 'react';
import { View, Text, FlatList } from 'react-native';

const ProfilePage = ({ route }) => {
    const { id } = route.params;
    const user = getUserById(id); // Replace with your own logic to fetch user data

    return (
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
    );
};

export default ProfilePage;
