import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


const MainMenu = ({userId}) => {
    const router = useRouter();

    

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.listItem} onPress={() => router.push(`/profile-page/${userId}`)}>
                    <Text style={styles.text}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} onPress={() => router.push(`/your-recipes/${userId}`)}>
                    <Text style={styles.text}>Your Recipes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} onPress={() => router.push(`/chat-bot/${userId}`)}>
                    <Text style={styles.text} >Ask Chef</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} onPress={() => router.push(`/search-page/${userId}`)}>
                    <Text style={styles.text}>Search All</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            alignItems: 'Left',
            width: "50%",
            padding: 10,
        },
        listItem: {
            padding: 2,
            marginVertical: 2,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
        },
        text : {
            fontSize: 20,
            marginLeft: 5
        }
    });



    

   



export default MainMenu;