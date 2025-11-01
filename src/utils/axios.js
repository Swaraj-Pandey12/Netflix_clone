import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjg4Y2UwZGNkMDNmNTQxYjNmMDAwNDQzMDY2MmVjMiIsIm5iZiI6MTc1MzcwNTM0Mi41ODQsInN1YiI6IjY4ODc2YjdlODA5YjI0OWZjNjI0NmU1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WahhFpuaY_MY45cR-MZjg2Ed_XHlwLPk9EonkRRUysU",
  },
});

export default instance;


