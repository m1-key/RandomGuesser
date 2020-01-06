import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Color from '../constants/colors'

const NumberContainer = props => {
    return (
        <View style = {styles.numberContainerStyle}>
            <Text style = {styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    numberContainerStyle : {
        borderWidth: 2,
        borderColor: Color.secondary,
        padding: 10,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
        marginBottom:15,
    },
    number:{ 
        color: Color.secondary,
        fontSize: 22
    }

});

export default NumberContainer;