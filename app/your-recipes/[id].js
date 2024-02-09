import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect, useCallback, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, FlatList } from "react-native";

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import SmallRecipeCard from "../../components/cards/smallRecipeCard";
import ButtonTemplate from "../../components/buttons/buttonTemplate";
import getUsersRecipes from "../../components/hooks/getUsersRecipes";
import getUsersCollections from "../../components/hooks/getUsersCollections";
import getFavoriteRecipes from "../../components/hooks/getFavoriteRecipes";
import getFavoriteCollections from "../../components/hooks/getFavoriteCollections";
import SmallCollectionCard from "../../components/cards/smallCollectionCard";

const YourRecipePage = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const { userRecipes, recipesIsLoading, recipeError, reFetchRecipes } = getUsersRecipes(params.id);
    const { usersCollections, collectionIsLoading, collectionError, reFetchCollection } = getUsersCollections(params.id);
    const { favoriteRecipes, favRecipesIsLoading, favRecipesError, reFetchFavRecipes} = getFavoriteRecipes(params.id);
    const { favoriteCollections, favCollectionsIsLoading, favCollectionsError, reFetchFavCollections } = getFavoriteCollections(params.id);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetchRecipes();
        reFetchCollection();
        reFetchFavRecipes();
        reFetchFavCollections();
        setRefreshing(false);
    }, []);

    const userRecipeCards = () => {
        if (recipesIsLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        } else if (recipeError) {
            return <Text>{recipeError}</Text>;
        } else if (userRecipes.length === 0) {
            return <Text style={{textAlign: 'center', margin: 10}}>You have no recipes yet!</Text>;
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

    const userCollectionsCards = () => {
        if (collectionIsLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        } else if (collectionError) {
            return <Text>{collectionError}</Text>;
        } else if (usersCollections.length === 0) {
            return <Text style={{textAlign: 'center', margin: 10}}>You have no collections yet!</Text>;
        } else {
            return (
                <FlatList
                    data={usersCollections}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={({ item }) => (
                        <SmallCollectionCard item={item} handleNavigate={() => router.push(`/collection-detail-page/${item.id}`)} />
                )}
                />
            );
        }
    }

    const usersFavoriteRecipesCards = () => {
        if (favRecipesIsLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        } else if (favRecipesError) {
            return <Text>{favRecipesError}</Text>;
        } else if (favoriteRecipes.length === 0) {
            return <Text style={{textAlign: 'center', margin: 10}}>You have no favorite recipes yet!</Text>;
        } else {
            return (
                <FlatList
                    data={favoriteRecipes}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={({ item }) => (
                        <SmallRecipeCard item={item.recipe} handleNavigate={() => router.push(`/recipe-details/${item.recipe.id}`)} />
                )}
                />
            );
        }
    }

    const usersFavoriteCollectionsCards = () => {
        if (favCollectionsIsLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        } else if (favCollectionsError) {
            return <Text>{favCollectionsError}</Text>;
        } else if (favoriteCollections.length === 0) {
            return <Text style={{textAlign: 'center', margin: 10}}>You have no favorite collections yet!</Text>;
        } else {
            return (
                <FlatList
                    data={favoriteCollections}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={({ item }) => (
                        <SmallCollectionCard item={item} handleNavigate={() => router.push(`/collection-detail-page/${item.id}`)} />
                )}
                />
            );
        }
    }

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
                <View style={{ marginVertical: 10, alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ fontSize: 24 }}>Your Recipes</Text>
                </View>
                <ButtonTemplate title="Add New Recipe" color="blue" pressed={()=>{router.push(`/new-recipe-form/${params.id}`, {userId: params.id})}} />
                {userRecipeCards()}
                <View style={{ marginVertical: 10, alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ fontSize: 24 }}>Your Collections</Text>
                </View>
                <ButtonTemplate title="Add New Collection" color="blue" pressed={()=>{router.push(`/collection-form/${params.id}`, {userId: params.id})}} />
                {userCollectionsCards()}
                <View style={{ marginVertical: 10, alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ fontSize: 24 }}>Favorite Recipes</Text>
                </View>
                {usersFavoriteRecipesCards()}
                <View style={{ marginVertical: 10, alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ fontSize: 24 }}>Favorite Collections</Text>
                </View>
                {usersFavoriteCollectionsCards()}
            </>
            }
        />
        </SafeAreaView>
    );
};

export default YourRecipePage;