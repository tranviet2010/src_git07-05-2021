import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import {useSelector} from 'react-redux'

const StartOne = (props) => {
    const { navigation } = props

    const authUser = useSelector((state) => state);

    console.log({ authUser });
    // console.log('Props from startOne', props);
    return (
        <ImageBackground
            source={require('../../../../assets/images/stackone.png')}
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('StartTwo')}
            >

                <Text style={{ color: 'white' }}>Bắt đầu</Text>

            </TouchableOpacity>
        </ImageBackground>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: 700,
        alignItems: "center",
        width: 395,
    },
    button: {
        borderRadius: 50,
        top: '25%',
        width: '40%',
        alignItems: "center",
        backgroundColor: "#149CC6",
        padding: 10
    },
    button2: {
        borderRadius: 50,
        top: '15%',
        width: '25%',
        alignItems: "center",
        backgroundColor: "#149CC6",
        padding: 10
    }
})

export default StartOne;