import React from 'react';
import { View, Text, FlatList, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useGlobalSearchParams, useRouter,} from 'expo-router';


import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getProfileInformation from '../../components/hooks/getProfileInformation';
import getUserInfo from '../../components/hooks/getUserInfo';
import SmallRecipeCard from '../../components/cards/smallRecipeCard';
import SmallCollectionCard from '../../components/cards/smallCollectionCard';
import ButtonTemplate from '../../components/buttons/buttonTemplate';
import followingCheck from '../../components/hooks/followingCheck';
import followUser from '../../components/hooks/followUser';
import unFollowUser from '../../components/hooks/unFollowUser';
import BackImageHeaderButton from '../../components/buttons/BackImageHeaderButton';
import EditButton from '../../components/buttons/EditButton';
import ImageHeaderButton from '../../components/buttons/ImageHeaderButton';

const ProfilePage = () => {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const {profileData, recipeData, collectionData, isLoading, error, reFetch} = getProfileInformation(params.id)
    const {userInfo} = getUserInfo();
    const {isFollowing, setIsFollowing} = followingCheck(params.id)

    const handleFollowPressed = async () => {
        console.log(isFollowing)
        
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
                    <View>
                        <Text style={{fontSize: 32, textAlign: "center", margin: 15}}>{profileData.username}</Text>
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
