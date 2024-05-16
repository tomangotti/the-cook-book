import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';

import getUserLinks from '../hooks/getUserLinks';

const LinkCards = ({id}) => {
    const {userLinks, isLoading} = getUserLinks(id);
    console.log(userLinks)


    
    const twitterLink = () => {
        function navFunction() {
            Linking.openURL(userLinks.link_twitter)
        } 
        if(userLinks.link_twitter){
            return (<TouchableOpacity style={{paddingHorizontal: 5}} onPress={navFunction}>
                        <Text>Twitter</Text>
                    </TouchableOpacity>)
        } else {
            return null
        }
    }


    const facebookLink = () => {
        function navFunction() {
            Linking.openURL(userLinks.link_facebook)
        }
        if(userLinks.link_facebook){
            return (<TouchableOpacity style={{paddingHorizontal: 5}} onPress={navFunction} >
                        <Text>Facebook</Text>
                    </TouchableOpacity>)
        } else {
            return null
        }
    }


    const isntagramLink = () => {
        function navFunction() {
            Linking.openURL(userLinks.link_instagram)
        }
        if(userLinks.link_instagram){
            return (<TouchableOpacity style={{paddingHorizontal: 5}} onPress={navFunction}>
                        <Text>Instagram</Text>
                    </TouchableOpacity>)
        } else {
            return null
        }
    }


    const youtubeLink = () => {
        function navFunction() {
            Linking.openURL(userLinks.link_youtube)
        }
        if(userLinks.link_youtube){
            return (<TouchableOpacity style={{paddingHorizontal: 5}} onPress={navFunction}>
                        <Text>Youtube</Text>
                    </TouchableOpacity>)
        } else {
            return null
        }
    }


    return (
        <>
        {isLoading ? (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        ) : (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                    {twitterLink()}
                    {facebookLink()}
                    {isntagramLink()}
                    {youtubeLink()}
                </View>
            </View>
        )}
        </>
    )
}


export default LinkCards;