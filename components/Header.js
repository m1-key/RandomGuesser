import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '../constants/colors';

const Header = props => {
    return(
        <View style = {styles.header}>
            <Text style = {styles.textHeader}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:90,
        paddingTop:40,
        backgroundColor:Color.primary,
        alignItems:'center',
        justifyContent:'center'
    },
    textHeader:{
        color:'black',
        fontSize:18
    }
});

export default Header;