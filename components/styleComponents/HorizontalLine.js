import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
    return <View style={styles.horizontalLine} />;
};

const styles = StyleSheet.create({
    horizontalLine: {
        borderBottomColor: 'black', // You can change the color to your preference
        borderBottomWidth: 1,      // You can adjust the width as needed
        height: 20,
        marginVertical: 10,        // Adjust the vertical margin as needed
    },
});

export default HorizontalLine;