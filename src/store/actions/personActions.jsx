import axios from '../../utils/axios';
import { loadperson } from '../reducers/personSlice'; 
export { removeperson } from '../reducers/personSlice';

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedcredits = await axios.get(`/person/${id}/combined_credits`);
    const tvcredits = await axios.get(`/person/${id}/tv_credits`);
    const moviecredits = await axios.get(`/person/${id}/movie_credits`);
    
   
    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedcredits:combinedcredits.data,
      moviecredits:moviecredits.data,
      tvcredits:tvcredits.data,

    };  
   dispatch(loadperson(theultimatedetails)); // don't forget this if you're using Redux
  console.log(videos.data);
  } catch (error) {
    console.log('Error: ', error);
  }
 

};
