import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';

import getData, { remove } from '../api/providers';

export default function List({ navigation }) {

    const [tarefas, setTarefas] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    function del(tarefa) {
        remove(tarefa)
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
                    onPress={() => del(tarefa)}
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
        getData().then(setTarefas)
        // console.warn(tarefas.data)
    }, []);

    function onRefresh() {
        getData().then(setTarefas)
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
