import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity,  ScrollView, SafeAreaView } from 'react-native';
import WebSocket from 'react-native-websockets';

const chatBot = () => {
    const params = useGlobalSearchParams();
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('');
    const [time, setTime] = useState('');
    const [messages, setMessages] = useState([]);
    const router = useRouter();

    useEffect(() => {
        console.log('hello')
        const ws = new WebSocket('ws://localhost:3000');

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (e) => {
            const receivedMessage = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            ws.close();
        };
    }, []);


    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerTitle: "Ask Chief",
                headerTitleAlign: "center",
            }} />
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View >
                    <Text>Chat Bot</Text>
                </View>
            </ScrollView>   
        </SafeAreaView>
    );
};

export default chatBot;
