import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const FavoriteCard = ({userId, recipeId}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <TouchableOpacity onPress={handleFavoriteToggle} style={{marginTop: 15, alignItems: "center", width: 50}}>
            <Text style={{fontSize: 36, textAlign: "center"}}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
    );
};

export default FavoriteCard;
