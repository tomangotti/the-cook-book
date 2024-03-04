import React from "react";

const deleteFavoriteCollection = async (user_id, collection_id) => {
    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/favorites/collections/remove/${user_id}/${collection_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.log('delete favorite recipe failed')
            return false;
        }

        // const data = await response.json();
        // console.log(data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


export default deleteFavoriteCollection;