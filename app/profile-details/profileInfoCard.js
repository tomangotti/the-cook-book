import react from "react";
import { Text, View } from "react-native";

const ProfileInfoCard = ({userInfo, userLinks}) => {
    console.log(userInfo);
    return(
        <View style={{margin: 25}}>
            <View style={{marginBottom: 15}}>
                <Text style={{fontSize: 24}}>Hello, {userInfo.username}</Text>
            </View>
            <View style={{marginBottom: 15}}>
                <Text style={{fontSize: 18}}>User's Infomation</Text>
            </View>
            <View>
                <Text>Name: {userInfo.first_name} {userInfo.last_name} </Text>
                <Text>Email: {userInfo.email}</Text>
                <Text>Username: {userInfo.username} </Text>
            </View>
                {userLinks ? (
                    <View style={{marginTop: 25}}>
                        <Text style={{fontSize: 18, marginBottom: 15}}>User's Links</Text>
                        <Text style={{marginVertical: 3}}>Twitter: {userLinks.link_twitter}</Text>
                        <Text style={{marginVertical: 3}}>Facebook: {userLinks.link_facebook}</Text>
                        <Text style={{marginVertical: 3}}>Instagram: {userLinks.link_instagram}</Text>
                        <Text style={{marginVertical: 3}}>YouTube: {userLinks.link_youtube}</Text>
                    </View>
                ) : null}
        </View>
    )
}


export default  ProfileInfoCard