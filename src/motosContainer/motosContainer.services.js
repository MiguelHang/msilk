import Axios from 'axios'
import data from '../mockData.js'

const MotoService = {
  
  getMotos: (params) =>{

  return Promise.resolve({data});

  //   return Axios.post('http://nodescraper.miguelhang.es/api/scan',
  //   {
  //     "model": params.model,
  //     "location": params.location,
  //     "brand": params.brand
  //   },{
  //     headers: {
  //            'Content-Type': 'application/json'
  //     }
  //   }).then((response) => {
  //    return response
  //  })
 }
};

export default MotoService