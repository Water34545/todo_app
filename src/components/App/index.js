import React, {Component} from 'react'
import AppHeader from '../AppHeader'
import SearchPanel from '../SearchPanel'
import TodoList from '../TodoList'
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm'
import "./style.css"

export default class App extends Component {
    maxId = 100

    state = {
        todoData: [
            this.createTodoItem('drink coffee'),
            this.createTodoItem('earn react'),
            this.createTodoItem('make awesome app'),
        ],
        term: '',
        filter: 'all'
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deliteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id) 
            const newArray = [
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx+1)
            ]

            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text)
        this.setState(({todoData}) => {
            const newArr = [
                    ...todoData,
                    newItem
                ]
            return {
                todoData: newArr
            }
        })
    }

    toddleProperty (arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id) 

        const oldItem = arr[idx]
        const newItem = {...oldItem, [propName]: !oldItem[propName]}

        return [
            ...arr.slice(0, idx), 
            newItem,
            ...arr.slice(idx+1)
        ]
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toddleProperty(todoData, id, 'important')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toddleProperty(todoData, id, 'done')
            }
        })
    }

    onSearchPanelChange = (text) => {
        this.setState({
            term: text
        })
    }

    onFilterChange = (text) => {
        this.setState({
            filter: text
        })
    }

    search(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1
        })
    }

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items
            case 'active':
                return items.filter((item) => !item.done)
            case 'done':
                return items.filter((item) => item.done)
            default:
                return items
        }
    }

    render() {
        const {todoData, filter, term} = this.state
        const doneCount = todoData.filter((el)=> el.done).length
        const todoCount = todoData.length - doneCount

        const filtretedData = this.filter(
            this.search(todoData, term), filter)

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchPanelChange={this.onSearchPanelChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={filtretedData}
                    onDelited={this.deliteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }
}