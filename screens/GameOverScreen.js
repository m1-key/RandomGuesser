import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const GameOverScreen = props => {
    return (
            <View style = {styles.screen}>
                <Text>Game is Over</Text>
                <Button title = 'Restart' onPress = {props.onRestartGame}/>
            </View>

    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default GameOverScreen;

