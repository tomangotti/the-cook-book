import { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import ButtonTemplate from '../../components/buttons/buttonTemplate';
import EditUserInfo from '../../components/hooks/editUserInfo';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import postProfileImage from '../../components/hooks/postProfileImage';

const ProfileEditForm = ({userInfo}) => {
    console.log(userInfo)
    const [firstName, setFirstName] = useState(`${userInfo.first_name}`)
    const [lastName, setLastName] = useState(`${userInfo.last_name}`)
    const [email, setEmail] = useState(`${userInfo.email}`)
    const [username, setUsername] = useState(`${userInfo.username}`)
    const [twitterLink, setTwitterLink] = useState('')
    const [isntagramLink, setInstagramLink] = useState('')
    const [facebookLink, setFacebookLink] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    
    const [image, setImage] = useState(null);
    const router = useRouter()


    const handleSave = async () => {
        saveImage();
    }

    const saveProfile = async () => {
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

    const saveImage = async () => {
        const formData = new FormData();

        if (image) {
            const imageUri = image; 
            const uriParts = imageUri.split(".");
            const fileType = uriParts[uriParts.length - 1];
            formData.append("image", {
                uri: imageUri,
                name: `image.${fileType}`,
                type: `image/${fileType}`,
            });
        }
        

        const response = await postProfileImage(formData)
        if(response) {
            router.back()
        } else {
            alert('failed to upload image. try again later')
        }
    }

    const saveLinks = async () => {

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result.assets[0].uri);
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View  style={{alignItems: "center", width: "100%", marginTop: 25}}>
            <View style={{margin: 5}}>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
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
            <View>
                <Text>Twitter</Text>
                <TextInput value={twitterLink} onChangeText={setTwitterLink} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>Instagram</Text>
                <TextInput value={isntagramLink} onChangeText={setInstagramLink} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>Facebook</Text>
                <TextInput value={facebookLink} onChangeText={setFacebookLink} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <View>
                <Text>YouTube</Text>
                <TextInput value={youtubeLink} onChangeText={setYoutubeLink} style={{backgroundColor: "lightgrey", width: 200}} ></TextInput>
            </View>
            <ButtonTemplate pressed={handleSave} title="Save" color="green" />
        </View>
    )
}

export default ProfileEditForm