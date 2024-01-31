// import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
// import react, { useEffect, useCallback, useState } from "react";
// import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, FlatList } from "react-native";

// import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
// import RecipeCard from "../../components/RecipeCard";
// import SmallRecipeCard from "../../components/cards/smallRecipeCard";
// import ButtonTemplate from "../../components/buttons/buttonTemplate";

// import getUsersRecipes from "../../components/hooks/getUsersRecipes";


// const YourRecipePage = () => {
//     const params = useGlobalSearchParams();
//     const router = useRouter();
//     const [refreshing, setRefreshing] = useState(false);
//     const {userRecipes, isLoading, error, reFetch} = getUsersRecipes(params.id)

//     const onRefresh = useCallback(() => {
//         setRefreshing(true);
//         reFetch()
//         setRefreshing(false)
//     }, []);

//     const userRecipeCards = () => {
//         if(isLoading) {
//             return(
//                 <ActivityIndicator size="large" color="#0000ff" />
//             )
//         }else if(error) {
//             return(
//                 <Text>{error}</Text>
//             )
//         } else if(userRecipes.length === 0) {
//             return(
//                 <Text>You have no recipes yet!</Text>
//             )
//         } else {
//             return(
//                 <FlatList data={userRecipes} 
//                         keyExtractor={(item) => item.id.toString()} 
//                         numColumns={2}
//                         contentContainerStyle={{padding: 20}}
//                         renderItem={({item}) => (
//                     <SmallRecipeCard item={item} handleNavigate={() => router.push(`/recipe-details/${item.id}`)}/>
//                 )} />
//             )
//         }
//     } 

//     return(
//         <SafeAreaView>
//             <Stack.Screen options={{
//                     headerStyle: {backgroundColor: "#FAFAFC"},
//                     headerShadowVisible: false,
//                     headerBackVisible: false,
//                     headerLeft: () => (
//                         <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
//                     ),
//                     headerTitle: "Recipes",
//                     headerTitleAlign: "center"
//                 }}/>
//             <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
//                 <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
//                         <Text style={{fontSize: 24}}>Your Recipes</Text>
//                 </View>
//                 <View>
//                     {userRecipeCards()}
//                 </View>
//                 <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
//                         <Text style={{fontSize: 24}}>Your Collections</Text>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     )


// }

// export default YourRecipePage

// import React, { useEffect, useCallback, useState } from "react";
// import { SafeAreaView, Text, View, ActivityIndicator, RefreshControl, FlatList } from "react-native";

// import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
// import SmallRecipeCard from "../../components/cards/smallRecipeCard";
// import getUsersRecipes from "../../components/hooks/getUsersRecipes";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect, useCallback, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, FlatList } from "react-native";

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import SmallRecipeCard from "../../components/cards/smallRecipeCard";
import ButtonTemplate from "../../components/buttons/buttonTemplate";
import getUsersRecipes from "../../components/hooks/getUsersRecipes";


const YourRecipePage = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const { userRecipes, isLoading, error, reFetch } = getUsersRecipes(params.id);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetch();
        setRefreshing(false);
    }, []);

    const userRecipeCards = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        } else if (error) {
            return <Text>{error}</Text>;
        } else if (userRecipes.length === 0) {
            return <Text>You have no recipes yet!</Text>;
        } else {
            return (
                <FlatList
                    data={userRecipes}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={({ item }) => (
                        <SmallRecipeCard item={item} handleNavigate={() => router.push(`/recipe-details/${item.id}`)} />
                )}
                />
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
                    ),
                    headerTitle: "Recipes",
                    headerTitleAlign: "center"
                }}/>
        
        <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListHeaderComponent={
            <>
                <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ fontSize: 24 }}>Your Recipes</Text>
                </View>
                {userRecipeCards()}
                <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ fontSize: 24 }}>Your Collections</Text>
                </View>
                <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ fontSize: 24 }}>Favorite Recipes</Text>
                </View>
                <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ fontSize: 24 }}>Favorite Collections</Text>
                </View>
            </>
            }
        />
        </SafeAreaView>
    );
};

export default YourRecipePage;