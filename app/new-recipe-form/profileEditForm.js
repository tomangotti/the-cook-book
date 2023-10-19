import react, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ButtonTemplate from '../../components/buttons/buttonTemplate';

const ProfileEditForm = ({userInfo}) => {
    console.log(userInfo)
    const [firstName, setFirstName] = useState(userInfo.first_name)
    const [lastName, setLastName] = useState(userInfo.last_name)
    const [email, setEmail] = useState(userInfo.email)
    const [username, setUsername] = useState(userInfo.username)
    

    const handleSave = async () => {
        const updatedProfileInfo = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username
        }

        console.log(updatedProfileInfo)
    }

    return (
        <View  style={{alignItems: "center", width: "100%", marginTop: 25}}>
            <View>
                <Text>First Name</Text>
                <TextInput value={firstName} onChange={setFirstName} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>Last Name</Text>
                <TextInput value={lastName} onChange={setLastName} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>Email</Text>
                <TextInput value={email} onChange={setEmail} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>UserName</Text>
                <TextInput value={username} onChange={setUsername} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <ButtonTemplate pressed={handleSave} title="Save" color="green" />
        </View>
    )
}

export default ProfileEditForm