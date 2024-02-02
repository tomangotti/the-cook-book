import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import FavoriteRecipeCheck from '../hooks/favoriteRecipeCheck';
import postFavoriteRecipe from '../hooks/postFavoriteRecipe';
import deleteFavoriteRecipe from '../hooks/deleteFavoriteRecipe';


const FavoriteCard = ({userId, recipeId}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const {data, isLoading, error} = FavoriteRecipeCheck(userId, recipeId);
    


    useEffect(() => {
        if(data){
            setIsFavorite(data);
        }
    },[data])

    const handleFavoriteToggle = async () => {
        console.log('handle fetch')
        if(isFavorite === true){
            const response = await deleteFavoriteRecipe(userId, recipeId)
            if(response === true){
                console.log("successfully removed from favorites")
                setIsFavorite(false)
            }
        } 
        else if(isFavorite === false){
            const response = await postFavoriteRecipe(userId, recipeId)
            if(response === true){
                console.log("successfully added to favorites")
                setIsFavorite(true)
            }
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <TouchableOpacity onPress={handleFavoriteToggle} style={{marginTop: 15, alignItems: "center", width: 50}}>
            <Text style={{fontSize: 36, textAlign: "center"}}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
    );
};

export default FavoriteCard;
