const axios = require('axios')

const getMovieById = async (id) => {
    // console.log("id is : ", id)
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=66744abfdd015ee6c526f268a8bb5e01&language=en-US`)
    await movieDetails.data

    return movieDetails.data
}

module.exports = getMovieById