import React, {useState, useEffect} from "react";


const postNewMessage = async (message) => {
    
        try{
            const response = await fetch(`http://10.0.0.106:8000/messaging/post-new-message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(message)
            })

            if(response.ok) {
                return true
            } else {
                return false
            }
        } catch(err){
            console.log(err)
        }
}

export default postNewMessage;