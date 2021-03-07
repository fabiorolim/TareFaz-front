import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Loading extends Component {

    async componentDidMount() {
        console.warn('DidMount')
        let token = null

        try {
            token = await AsyncStorage.getItem('token')
        } catch (e) {
            console.warn('Exceção no Loadning' + e)
        }

        if (token) {
            console.warn('Tem token')
            //self
            this.props.navigation.navigate('List')
        } else {

            console.warn('Não tem token')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#f00"
    },
});