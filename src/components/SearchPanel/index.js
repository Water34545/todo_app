import React, {Component} from 'react'
import './style.css'

export default class SearchPanel extends Component {
    state = {
        text: ''
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
        this.props.onSearchPanelChange(e.target.value)
    }

    render() {
        const searchText = 'Type here to search'
        return (
            <input className="form-control ds-input search-panel" 
                value={this.state.text}
                onChange={this.onChange}
                placeholder={searchText}/>
        )
    }
}