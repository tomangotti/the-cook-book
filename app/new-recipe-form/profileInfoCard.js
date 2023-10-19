import react from "react";
import { Text, View } from "react-native";

const ProfileInfoCard = ({userInfo}) => {
    console.log(userInfo);
    return(
        <View>
            <View>
                <Text>Hello, {userInfo.username}</Text>
            </View>
            <View>
                <Text>User's Infomation</Text>
            </View>
            <View>
                <Text>Name: {userInfo.first_name} {userInfo.last_name} </Text>
                <Text>Email: {userInfo.email}</Text>
                <Text>Username: {userInfo.username} </Text>
            </View>
        </View>
    )
}

export default  ProfileInfoCard