const url = 'http://127.0.0.1:8000/api/v1/tarefas/';

const token = '6aba181c9bcd7539e22d307ff960c07f6d5bf9db'

export default async function getData() {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    });
    const tarefasJson = await response.json();
    return tarefasJson;
}

export async function save(tarefa) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify({ 'descricao': tarefa.descricao, 'usuario': 2 })
    });
    const content = await response.json();
    return content;
}

export async function update(tarefa) {
    console.warn('Chamou o update')
    const response = await fetch(url + tarefa.id + '/', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
        body: JSON.stringify({ 'descricao': tarefa.descricao })
    });
    const content = await response.json();
    return content;
}

export async function remove(tarefa) {
    console.warn('Chamou o remove')
    const response = await fetch(url + tarefa.id + '/', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    });
    const content = await response.json();
    return content;
}