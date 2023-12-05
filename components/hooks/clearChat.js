import React from "react";

const ClearChat = async (id) => {
        console.log("id", id)
        const response = await fetch(`http://10.0.0.106:8000/messaging/clear/${id}`, {
            method: 'DELETE'
        })
        
        if(response.ok) {
            return true
        } else {
            return false
        }
}



export default ClearChat;