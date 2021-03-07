import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View, Alert } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';

import getData, { remove } from '../api/providers';

export default function List({ navigation }) {

    const [tarefas, setTarefas] = useState({});
    const [refreshing, setRefreshing] = useState(false);


    function confirmDelete(tarefa) {
        Alert.alert('Excluir tarefa', 'Deseja excluir a tarefa ' + tarefa.id, [
            {
                text: 'Sim', onPress() {
                    AsyncStorage.getItem('token')
                        .then(token => remove(token, tarefa))
                        .then(() => console.warn('Deletou!'))
                }
            },
            { text: "Não" }
        ])
    }


    function actions(tarefa) {
        return (
            <>
                <Button
                    onPress={() => navigation.navigate('New', tarefa)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />}
                />
                <Button
                    onPress={() => confirmDelete(tarefa)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </>
        )
    }


    function renderItem({ item: tarefa }) {
        return (
            <ListItem
                // onPress={() => navigation.navigate('New', tarefa)}
                bottomDivider
            >
                <ListItem.Content>
                    <ListItem.Title>{tarefa.id} - {tarefa.descricao}</ListItem.Title>
                </ListItem.Content>
                <View style={{ flexDirection: "row" }}>{actions(tarefa)}</View>
            </ListItem>
        )
    }

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => getData(token).then(setTarefas))

    }, []);

    function onRefresh() {
        AsyncStorage.getItem('token').then(token => getData(token).then(setTarefas))
    }

    return (
        <SafeAreaView>
            <FlatList
                data={tarefas}
                renderItem={renderItem}
                keyExtractor={tarefa => tarefa.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            />
        </SafeAreaView>
    );
}
