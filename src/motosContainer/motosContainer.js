import React, { Component } from 'react'

import { Container } from './styles'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete'
import Moto from './../moto/moto'
import Loading from './../loading/loading'
import motosServices from './motosContainer.services'
import FormDialog from '../saveFilters/saveFilters'

const style = {
  margin: 12,
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: 15,
    padding: 8,

  },
  searchInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  searchButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttons: {
    margin: 5
  }
};

const Brand = ["Aprilia","Arc","Bajaj","Benelli ","BMW","Buell","Cagiva","Can-Am","Confederate ","Derbi","Ducati","Gas Gas","Genuine Scooter Company",
"Harley-Davidson","Hero Motocorp","Honda","Husqvarna","Hyosung","Indian","Kawasaki","KTM","Moto-Guzzi","MV-Agusta","MZ","Peugeot","Piaggio","Royal Enfield",
"Suzuki","Triumph","TVS","Vespa","Victory","Yamaha","Zero"]

const Province = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

class motosContainer extends Component {

  constructor() {
    super()
    this.state = {
      motos: [],
      model: '',
      location: '',
      brand:'',
      loading: false,
    }
  }

  componentDidMount(){
    if(this.props.location.state){
      const { model, brand, location } = this.props.location.state
      this.setState({
        model,
        brand,
        location
      }, () => {
        this.search()
      })
    }
  }

  handleModelChange = event => {
    this.setState({
      model: event.target.value
    });
  }

  handleLocationChange = value => {
    this.setState({
      location: value
    });
  }

  handleBrandChange = value => {
    this.setState({
      brand: value
    });
  }
  
  search = () => {
    console.log(this.state)
    this.setState({motos:[]})
    this.setState({loading: true})
    
    motosServices.getMotos({ model: this.state.model, location: this.state.location, brand: this.state.brand }).then(response => {
      this.setState({ motos: response.data.results })
      this.setState({loading: false})
    })
  }

  render() {
    return(
      <div>
        <Paper style={style.card}>
          <div style={style.searchInputs}>
            <AutoComplete
              hintText = "Brand"
              floatingLabelText = "Brand"
              filter = { AutoComplete.fuzzyFilter }
              dataSource = { Brand }
              maxSearchResults = { 5 }
              onNewRequest = { this.handleBrandChange }
              style = { style }
              searchText = { this.state.brand }
              onUpdateInput={this.handleBrandChange}
            />
            <TextField hintText = "Model" floatingLabelText = "Model" style = { style } value = { this.state.model } onChange = { this.handleModelChange } />
            <AutoComplete
              hintText="Location"
              floatingLabelText="Location"
              filter={AutoComplete.fuzzyFilter}
              dataSource = { Province } 
              maxSearchResults = {5}
              onNewRequest = { this.handleLocationChange }
              style = { style }
              searchText = { this.state.location }
              onUpdateInput = { this.handleLocationChange }

            />
          </div>
          <div style= { style.searchButton } >
            <RaisedButton label="Buscar" primary={true} onClick={this.search} style={style.buttons}/>
            {
              this.state.motos.length > 0 ? <FormDialog search={
                {
                  model: this.state.model,
                  brand: this.state.brand,
                  location: this.state.location
                }
              }/> : ''
            }
          </div>
        </Paper >
        <Container>
          { this.state.loading ?
            <Loading/>
            : false }
          {this.state.motos.map((item, index) => (
            item.ads.map( (moto, index) => {
              return (<Moto
                key={index}
                Info={moto}
            />)
            })
          ))}
        </Container>
      </div>
    )
  }
}

export default motosContainer