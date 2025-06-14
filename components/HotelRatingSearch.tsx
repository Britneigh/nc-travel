import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HotelRatingSearch({ rating, setRating }: any) {

    const handleStarPress = (index: number) => {
        setRating([index + 1]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.starRow}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => handleStarPress(i)}
                        style={styles.starButton}
                    >
                        <Text style={[styles.star, { color: i < rating ? '#FFD700' : '#ccc' }]}>
                            ★
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starButton: {
        padding: 8,
    },
    star: {
        fontSize: 32,
    },
});
