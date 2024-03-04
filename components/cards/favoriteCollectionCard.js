import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import FavoriteCollectionCheck from '../hooks/favoriteCollectionCheck';
import postFavoriteCollection from '../hooks/postFavoriteCollection';
import deleteFavoriteCollection from '../hooks/deleteFavoriteCollection';

const FavoriteCollectionCard = ({userId, collectionId}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const {data, isLoading, error} = FavoriteCollectionCheck(userId, collectionId);
    
    useEffect(() => {
        if(data){
            setIsFavorite(data);
        }
    },[data])


    const handleFavoriteToggle = async () => {
        console.log('handle fetch')
        if(isFavorite === true){
            const response = await deleteFavoriteCollection(userId, collectionId)
            if(response === true){
                console.log("successfully removed from favorites")
                setIsFavorite(false)
            }
        } 
        else if(isFavorite === false){
            const response = await postFavoriteCollection(userId, collectionId)
            if(response === true){
                console.log("successfully added to favorites")
                setIsFavorite(true)
            }
        }
    };


    return (
        <TouchableOpacity onPress={handleFavoriteToggle} style={{marginTop: 15, alignItems: "center", width: 50}}>
            <Text style={{fontSize: 36, textAlign: "center"}}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
    );
}

export default FavoriteCollectionCard;