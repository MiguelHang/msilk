import React,  { Component } from 'react'

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import defaultImage from './../images/defaultImage.png'
import { Divider } from 'material-ui';

class MyFilter extends Component {
    state = {
        searchs: []
    }

    componentDidMount() {
        
        if(localStorage.getItem('searchs')) this.setState({searchs: JSON.parse(localStorage.getItem('searchs'))})
        // this.setState({ search });

    }

    getLocalstorage(){
        console.log(JSON.parse(localStorage.getItem('searchs')))
    }

    render() {
    return(
        <div>
            {
                this.state.searchs.length > 0 ?
                    this.state.searchs.map((item, index)=>{
                        return <h1 key = {index}  onClick = {this.getLocalstorage}>{item.name}</h1>
                    })
                :
                <h1 onClick = {this.getLocalstorage}>No results</h1>
            }
        </div>
    )}
}

export default MyFilter

   