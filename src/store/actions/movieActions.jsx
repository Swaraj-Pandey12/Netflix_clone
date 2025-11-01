import axios from '../../utils/axios';
import { loadmovie } from '../reducers/movieSlice'; 
export { removemovie } from '../reducers/movieSlice';

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations=await axios.get(`/movie/${id}/translations`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t)=>t.name),
      videos:videos.data.results.find(m => m.type === "Trailer" && m.site === "YouTube"),
      watchproviders: watchproviders.data.results.IN,
    };  
   dispatch(loadmovie(theultimatedetails)); // don't forget this if you're using Redux
  console.log(videos.data);
  } catch (error) {
    console.log('Error: ', error);
  }
 

};
