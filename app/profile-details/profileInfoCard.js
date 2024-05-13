import react from "react";
import { Text, View } from "react-native";

const ProfileInfoCard = ({userInfo}) => {
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
            <View>
                <Text>Twitter: </Text>
                <Text>Facebook: </Text>
                <Text>Instagram: </Text>
                <Text>YouTube: </Text>
            </View>
        </View>
    )
}

export default  ProfileInfoCard