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

const Brand = [
  "Adler","AEON","AERMACCHI","AJP","AJS","ALTA MOTORS","AMAZONAS","APRILIA","ARCTIC CAT","ARIEL","ATK","BAJAJ","BARIGO","BENELLI","BETA","BFG","Big Bear Choppers","Big Dog","BIMOTA","BMW","BORILE","BOSS HOSS","BRITTEN","BROUGH SUPERIOR","BSA","BUELL","CAGIVA","CAN-AM/ BRP","CANNONDALE","CARVER","CCM","CEMEC","CFMOTO","CHAK MOTORS","Christini","CONDOR","CONFEDERATE","CPI","CRS","DAELIM","Dafra Motos","DERBI","DNEPR","DUCATI","EBR Motorcycles","ECOSSE","ENERGICA","EXCELSIOR","FISCHER","GAS GAS","GEELY","GG MOTORRAD","GHEZZI-BRIAN","GILERA","HARLEY DAVIDSON","HARTFORD","HENDERSON","HERCULES","HERO","HESKETH","HIGHLAND","HODAKA","HONDA","HOREX","HUSABERG","HUSQVARNA","HYOSUNG","INDIAN","ITALJET","IZH","JAWA","JUNAK","KANUNI","KASINSKI","KAWASAKI","KTM","KYMCO","LAVERDA","LEHMAN TRIKES","LIFAN","LINHAI","MAGNI","MAICO","MALAGUTI","MARUSHO-LILAC","MASH","MATCHLESS","MBK","MEGELLI","MIDUAL","MIKILON","MODENAS","MONDIAL","MOTO GUZZI","MOTO MORINI","MOTOCZYSZ","MOTORHISPANIA","MOTUS","MTT","MUNCH","MV AGUSTA","MZ","NCR","NORTON","Orange County Choppers","OSSA","PETRONAS","PEUGEOT","PGO","PIAGGIO","POLARIS","PUCH","RIEJU MOTORS","ROYAL ENFIELD","SACHS","SCORPA","SHERCO","SIMSON","Super SOCO","SUZUKI","SWM","SYM","TGB","TRIUMPH","URAL","VELOCETTE","VENTO","VERUCCI","VESPA","VICTORY","VINCENT HRD","VOR","VOXAN","VYRUS","WAKAN","WHIZZER","WRM","YAMAHA","ZERO","ZUNDAPP"
]

const models = {}

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