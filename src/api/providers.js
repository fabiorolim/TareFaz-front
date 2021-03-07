const url = 'http://127.0.0.1:8000/api/v1/tarefas/';
const urlLogin = 'http://127.0.0.1:8000/api/v1/auth/login/';

export default async function getData(token) {
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

export async function save(token, tarefa) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify({ 'descricao': tarefa.descricao })
    });
    const content = await response.json();
    return content;
}

export async function update(token, tarefa) {
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

export async function remove(token, tarefa) {
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

export async function login(usuario, senha) {
    const response = await fetch(urlLogin, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ 'username': usuario, 'password': senha })
    })

    const content = await response.json()
    // console.warn('Provider: ' + content.token)
    return content.token;
}