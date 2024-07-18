import React, { useState, useCallback } from "react";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { KeyboardAvoidingView, Platform } from 'react-native';



import getUserMessages from "../../components/hooks/getUserMessages";
import postNewMessage from "../../components/hooks/postNewMessage";
import ClearChat from "../../components/hooks/clearChat";
import ImageHeaderButton from "../../components/buttons/ImageHeaderButton";

const ChatBot = () => {
    const [inputMessage, setInputMessage] = useState("");
    const router = useRouter();
    const params = useGlobalSearchParams();
    const [refreshing, setRefreshing] = useState(false);
    const {data, isLoading, error, reFetch} = getUserMessages(params.id);
    const [sending, setSending] = useState(false);
    console.log("hello world")
    

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetch();
        setRefreshing(false);
    },[])


    async function handleClearChat() {
        const res = await ClearChat(params.id);
        if(res) {
            reFetch();
        } else{
            alert("Something went wrong. Try again")
        }
    }

    async function handleSendMessage() {
        if (inputMessage.trim() !== "") {

            const newMessage = { 
                content: inputMessage, 
                role: 'user', 
                user: params.id 
            }

            setInputMessage("Sending...");
            data.push(newMessage);
            setSending(true);

            const response = await postNewMessage(newMessage);
            if(response) {
                data.push(response);
                setInputMessage("");
                setSending(false);
            } else{
                setInputMessage("");
                setSending(false);
                alert("Message failed to send. Try again")
            }

        }
    }

    const renderMessages = () => {
        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#312651" />
                </View>
            );
        }

        if(error) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Something went wrong</Text>
                    <Text>{error}</Text>
                </View>
            )
        }

        if (!data || data.length === 0) {
            return <Text>No messages yet.</Text>;
        }

        return data.map((message, index) => (
            <View
                key={index}
                style={{
                    alignSelf: message.role === 'user' ? "flex-end" : "flex-start",
                    backgroundColor: message.role === 'user' ? "#312651" : "white",
                    borderRadius: 10,
                    padding: 10,
                    margin: 5,
                    maxWidth: "80%"
                }}
            >
                <Text style={{ color: message.role === 'user' ? "white" : "black" }}>{message.content}</Text>
            </View>
        ));
    };


    const styles = {
        container: {
            flex: 1,
            flexDirection: "column",
        },
        chatWindow: {
            flex: 1,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            margin: 10,
            shadowColor: "rgba(0,0,0,0.2)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 2,
        },
        chatHeader: {
            height: 50,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            padding: 10,
            margin: 10,
            alignItems: "center",
        },
        chatBody: {
            flex: 1,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            padding: 10,
            margin: 10,
        },
        chatFooter: {
            flexDirection: "row", 
            alignItems: "center", 
            height: 50,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            padding: 10,
            margin: 10,
        },
        textInput: {
            flex: 1, 
        },
        sendButton: {
            marginLeft: 10, 
            backgroundColor: "#312651",
            padding: 10,
            borderRadius: 5,
        },
        sendButtonText: {
            color: "white",
            height: 20,
        },
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : undefined} 
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                >
                <Stack.Screen options={{
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerLeft: () => (
                        <ImageHeaderButton imageTitle={"back"} handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        <ImageHeaderButton imageTitle={"trash"} handlePress={() => handleClearChat()} />
                    ),
                    headerTitle: "Chef Bot",
                    headerTitleAlign: "center",
                
                }}/>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.chatWindow} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    <View>
                        <View style={styles.chatHeader}>
                            <Text style={{fontSize: 24}}>Live Chat</Text>
                        </View>
                        <View style={styles.chatBody}>{renderMessages()}</View>
                    </View> 
                </ScrollView>
                <View style={styles.chatFooter}>
                    <TextInput
                        editable={!sending}
                        style={styles.textInput}
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChangeText={(text) => setInputMessage(text)}
                    />
                    <TouchableOpacity
                        disabled={sending}
                        style={styles.sendButton}
                        onPress={() => handleSendMessage()}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatBot;