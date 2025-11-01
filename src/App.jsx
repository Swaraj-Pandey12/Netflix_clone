import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './templates/Popular';
import Movie from './templates/Movie';
import Tvshows from './templates/Tvshows';
import People from './templates/People';
import Persondetails from './templates/Persondetails';
import Tvdetails from './templates/Tvdetails';
import Moviedetails from './templates/Moviedetails';
import Trailer from './templates/Trailer';
import Notfound from './templates/Notfound';
import Aboutus from './templates/Aboutus';

const App = () => {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
        <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/trending" element={<Trending/>} />
      <Route path="/popular" element={<Popular/>} />

      <Route path="/movie" element={<Movie/>}/>
      <Route path="/movie/details/:id" 
       element={<Moviedetails />}>
      <Route path="/movie/details/:id/trailer" element={<Trailer/>} />

        </Route>


      <Route path="/tv" element={<Tvshows/>}/>
       <Route path="/tv/details/:id" 
       element={<Tvdetails />}
       >
      <Route path="/tv/details/:id/trailer" element={<Trailer/>} />
       </Route>

      <Route path="/person" element={<People/>} />
       <Route path="/person/details/:id" 
       element={<Persondetails/>}
       />
    {/* <Route path="/aboutus" element={<Aboutus  />} />

      <Route path="*" element={<Notfound  />} /> */}

      
     
    </Routes>
    
</div>

  );
};

export default App