import { createStore } from 'redux'
const store = createStore(reducer, ['Use Redux'])

function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text
    }
}

store.dispatch(addTodo('Read the docs'))
store.dispatch(addTodo('Read about the middleware'))