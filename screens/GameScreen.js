import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../Cards/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
const generateRandomNumberBetweenGivenRange = (start, end, exclude) => {
    start = Math.ceil(start);
    end = Math.floor(end);
    const randomNumber = Math.floor(Math.random() * (end - start) + start);
    if (randomNumber === exclude) {
        return generateRandomNumberBetweenGivenRange(start, end, exclude);
    } else {
        return randomNumber;
    }
};

const renderList = (value, totalRounds) => (
    <View key={(value, totalRounds)} style={styles.listItem}>
        <Text>#{totalRounds}</Text>
        <Text>{value}</Text>
    </View>
);

const GameScreen = props => {
    const intialGuess = generateRandomNumberBetweenGivenRange(
        1,
        100,
        props.userChoice
    );
    const [currGuess, setCurrGuess] = useState(intialGuess);
    const [rounds, setRounds] = useState(0);
    const [pastGuess, setPastGuess] = useState([intialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currGuess === userChoice) {
        onGameOver(rounds);
        }
    }, [currGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
        (direction === "lower" && currGuess < props.userChoice) ||
        (direction === "greater" && currGuess > props.userChoice)
        ) {
        Alert.alert("Don't lie", "Ayeee , bewkoof nhi banane ka , smjha kya", [
            {
            text: "Press Here",
            style: "cancel"
            }
        ]);
        return;
        }

        if (direction === "lower") {
        currentHigh.current = currGuess;
        } else {
        currentLow.current = currGuess + 1;
        }
        const nextNumber = generateRandomNumberBetweenGivenRange(
        currentLow.current,
        currentHigh.current,
        currGuess
        );
        setCurrGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
        setPastGuess(currPastGuesses => [nextNumber, ...currPastGuesses]);
    };

    return (
        <View style={styles.screen}>
        <Text>Opponent's Guess : </Text>
        <NumberContainer>{currGuess}</NumberContainer>
        <Card style={styles.buttonContainerStyle}>
            <MainButton onPressHandler={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
            <MainButton onPressHandler={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
        </Card>
        <View style={styles.list}>
            <ScrollView contentContainerStyle={styles.listContent}>
            {pastGuess.map((guess, index) =>
                renderList(guess, pastGuess.length - index)
            )}
            </ScrollView>
        </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainerStyle: {
        flexDirection: "row",
        marginTop: Dimensions.get('window').height > 600 ? 15 : 10,
        justifyContent: "space-around",
        width: 400,
        maxWidth: "90%"
    },
    list: {
        flex: 1,
        width: "80%"
    },
    listContent: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    listItem: {
        flexDirection: "row",
        borderColor: "#ccc",
        borderWidth: 3,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        justifyContent: "space-between",
        borderRadius: 10,
        elevation: 5,
        width: "60%"
    }
    });

export default GameScreen;
