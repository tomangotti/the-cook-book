import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Stack, useGlobalSearchParams, useRouter,} from 'expo-router';


import getProfileInformation from '../../components/hooks/getProfileInformation';
import getUserInfo from '../../components/hooks/getUserInfo';
import SmallRecipeCard from '../../components/cards/smallRecipeCard';
import SmallCollectionCard from '../../components/cards/smallCollectionCard';
import ButtonTemplate from '../../components/buttons/buttonTemplate';
import followingCheck from '../../components/hooks/followingCheck';
import followUser from '../../components/hooks/followUser';
import unFollowUser from '../../components/hooks/unFollowUser';
import ImageHeaderButton from '../../components/buttons/ImageHeaderButton';
import getProfileImageAll from '../../components/hooks/getProfileImageAll';
import LinkCards from '../../components/cards/linkCards';


const ProfilePage = () => {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const {profileData, recipeData, collectionData, isLoading, error, reFetch} = getProfileInformation(params.id)
    const {userInfo} = getUserInfo();
    const {isFollowing, setIsFollowing} = followingCheck(params.id)
    const defaultImage = require('../../assets/images/profile.png');
    const userImage = getProfileImageAll(params.id)
    const [image, setImage] = useState("")

    useEffect(() => {
        if(userImage !== null){
            setImage({uri: userImage.image})
        } else{
            setImage(defaultImage)
        }
    },[userImage])


    const handleFollowPressed = async () => {
        
        
        if(isFollowing === true){
            const response = await unFollowUser(params.id)
            setIsFollowing(false)
        }
        else if(isFollowing === false){
            const response = await followUser(params.id)
            setIsFollowing(true)
        }
    }

    const renderRecipeItem = ({ item }) => (
        <SmallRecipeCard
            item={item}
            key={item.id}
            user_id={userInfo.id}
            handleNavigate={() => router.push(`/recipe-details/${item.id}`)}
            />
    );

    const renderCollectionItem = ({ item }) => (
        <SmallCollectionCard
            item={item}
            key={item.id}
            user_id={userInfo.id}
            handleNavigate={() => router.push(`/collection-detail-page/${item.id}`)}
            />
    );
    

    return (
        <SafeAreaView>

            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ImageHeaderButton imageTitle={"back"} handlePress={() => router.back()} />
                ),
                headerRight: () => {
                    if (profileData.id && userInfo.id && userInfo.id == profileData.id) {
                        return (
                            <ImageHeaderButton imageTitle={"edit"} handlePress={() => router.push(`/profile-details/${params.id}`)} />
                        )
                    }
                },
                headerTitle: "Profile Page",
                headerTitleAlign: "center"
            }} />
            {isLoading ? <ActivityIndicator size="large" /> : 
            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View>
                    <View style={{
                        width: 350,
                        height: 350,
                        backgroundColor: "white",
                        borderRadius: 25,
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        marginTop: 10,
                    }}>
                        <Image source={image} resizeMode="cover" 
                            style={{
                                width: "95%",
                                height: "95%",
                                borderRadius: 25,
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{fontSize: 32, textAlign: "center", margin: 10}}>{profileData.username}</Text>
                    </View>

                    <View style={{alignItems: "center"}}>
                        <LinkCards id={params.id} />
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20}}>
                            <Text style={{fontSize: 16}}>Followers: {profileData.followers_count}</Text>
                        </View>
                        <View style={{flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20}}>
                            <Text style={{fontSize: 16}}>Following: {profileData.following_count}</Text>
                        </View>
                        <View style={{flex: 1, padding: 20}}>
                            <Text style={{fontSize: 16}}>Recipes: {profileData.recipes_count}</Text>
                        </View>
                    </View>
                    
                    {userInfo.id != profileData.id ? (
                        <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                            <ButtonTemplate title={isFollowing ? "Unfollow" : "Follow"} color={isFollowing ? "red" : "green"} pressed={handleFollowPressed} />
                        </View>
                    ) : null}

                    <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                            <Text style={{fontSize: 24}}>Collections</Text>
                    </View>
                    <FlatList
                        data={collectionData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderCollectionItem}
                        numColumns={2} 
                        contentContainerStyle={{ marginTop: 8, gap: 1, alignItems: 'center' }}
                    />

                    <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                            <Text style={{fontSize: 24}}>Recipes</Text>
                    </View>
                    <FlatList
                        data={recipeData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderRecipeItem}
                        numColumns={2} 
                        contentContainerStyle={{ marginTop: 8, gap: 1, alignItems: 'center' }}
                    />
                </View>
                </ScrollView>
    }
        </SafeAreaView>
    );
};

export default ProfilePage;
