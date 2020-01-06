import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import Color from "../constants/colors";
import Card from '../Cards/Card'
import Input from "../components/Input";
import NumberContainer from '../components/NumberContainer';



const StartGameScreen = props => {
    const [enteredNumber, setEnteredNumber] = useState("");
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }
    
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);   
        }

    })

    const onResetHandler = () => {
        setEnteredNumber('');
        setHasConfirmed(false);
    };

    const onConfirmHandler = () => {
        const choosenNumber = parseInt(enteredNumber);
        if(isNaN(choosenNumber) || choosenNumber <=0 || choosenNumber > 99){
            Alert.alert("Invalid number !",
                'Number has to be between 1-99',
                [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: onResetHandler
                }])
            return;
        }
        setHasConfirmed(true);
        setSelectedNumber(parseInt(enteredNumber));
        setEnteredNumber('');
        Keyboard.dismiss();
        
    };

    const inputNumberHandler = inputText => {
        setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
    };

    let confirmedOutput ;
    if(hasConfirmed){
        confirmedOutput = <Card style = {styles.summaryContainer}>
            <Text> Selected Number is </Text>
            <NumberContainer> {selectedNumber} </NumberContainer>
            <Button title = 'Start Game'
                onPress = {() => props.onPressStartGame(selectedNumber)}
            />
        </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior = 'padding' keyboardVerticalOffset = {30}>
                <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss()}}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game !!</Text>
                        <Card style = {styles.inputContainer}>
                            <Text>Select a number</Text>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={inputNumberHandler}
                                value={enteredNumber}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button
                                        title="Reset"
                                        onPress={onResetHandler}
                                        color={Color.secondary}
                                    />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button
                                        title="Confirm"
                                        onPress={onConfirmHandler}
                                        color={Color.primary}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
    };

    const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    button: {
        width: Dimensions.get('window').width / 4
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: Dimensions.get('window').width,
        maxWidth: "90%",
        alignItems: "center"
    },
    input: {
        width: 40,
        textAlign: "center"
    },
    summaryContainer:{
        marginTop: 20,
        alignItems: 'center'
    }
    });

export default StartGameScreen;
