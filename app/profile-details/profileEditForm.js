import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ButtonTemplate from '../../components/buttons/buttonTemplate';
import EditUserInfo from '../../components/hooks/editUserInfo';
import { useRouter } from 'expo-router';

const ProfileEditForm = ({userInfo}) => {
    console.log(userInfo)
    const [firstName, setFirstName] = useState(`${userInfo.first_name}`)
    const [lastName, setLastName] = useState(`${userInfo.last_name}`)
    const [email, setEmail] = useState(`${userInfo.email}`)
    const [username, setUsername] = useState(`${userInfo.username}`)
    const router = useRouter()


    const handleSave = async () => {
        const updatedProfileInfo = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username,
            id: userInfo.id,
        }

        const fetchRequest = await EditUserInfo(updatedProfileInfo)
        if(fetchRequest) {
            router.back()
        } else {
            alert('failed to updated information. try again later')
        }
    }

    return (
        <View  style={{alignItems: "center", width: "100%", marginTop: 25}}>
            <View>
                <Text>First Name</Text>
                <TextInput value={firstName} onChangeText={setFirstName} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>Last Name</Text>
                <TextInput value={lastName} onChangeText={setLastName} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>Email</Text>
                <TextInput value={email} onChangeText={setEmail} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>UserName</Text>
                <TextInput value={username} onChangeText={setUsername} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <ButtonTemplate pressed={handleSave} title="Save" color="green" />
        </View>
    )
}

export default ProfileEditForm