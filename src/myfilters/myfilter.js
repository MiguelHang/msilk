import React,  { Component } from 'react'

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {List, ListItem} from 'material-ui/List'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import { Link } from "react-router-dom";



const iconButtonElement = (
    <IconButton
      touch={true}
    >
      <MoreVertIcon color={grey400}/>
    </IconButton>
)

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>Delete</MenuItem>
    </IconMenu>
);


class MyFilter extends Component {
    state = {
        searches: []
    }
    
    componentDidMount() {
        
        if(localStorage.getItem('searches')) this.setState({searches: JSON.parse(localStorage.getItem('searches'))})
        // this.setState({ search });
        
    }
    
    handleSearch = (index) => {
        console.log(JSON.parse(localStorage.getItem('searches')))
    }
    
    handleDelete = (index) => {
        this.state.searches.splice(index, 1)
        this.setState({
            searches: this.state.searches
        })
        localStorage.setItem('searches', JSON.stringify(this.state.searches))
    }
    
    render() {
    return(
        <div>
            {
                this.state.searches.length > 0 ?
                    this.state.searches.map((item, index)=>{
                        return  <div key = {index}>
                                    <List>
                                        <Card onClick = {this.getLocalstorage} >
                                            <ListItem
                                                rightIconButton={
                                                    <IconMenu iconButtonElement={iconButtonElement}>
                                                      <MenuItem onClick = { ()=> this.handleDelete(index) } >Delete</MenuItem>
                                                    </IconMenu>
                                                }
                                                primaryText = {<Link to={{
                                                    pathname:`/search`,
                                                    state:{
                                                        model: item.params.model,
                                                        brand: item.params.brand,
                                                        location: item.params.location
                                                    }
                                                }} style= { {textDecoration: 'none'} }>{item.name}</Link>}
                                                secondaryText={
                                                    <p>
                                                        <span style={{color: darkBlack}}>{`${item.params.model} ${item.params.location}`}</span><br />
                                                    </p>
                                                }
                                                // secondaryTextLines={2}
                                            />
                                        </Card>
                                    </List>
                                </div>
                    })
                :
                <h1 onClick = {this.getLocalstorage}>No results</h1>
            }
        </div>
    )}
}

export default MyFilter

   