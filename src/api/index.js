import config from './config'
import axios from 'axios';

const apiKey = config.apiKey
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`
const URLINFO = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=:mib&api_key=${apiKey}&format=json`
// console.log(URL);
export function getArtists(country){
    const url = URL.replace(':country',country)
    return axios.get(url)
    .then(res => res.data.topartists.artist)
    .catch(error => error)
}

export function getArtistInfo(mib){
    const url = URLINFO.replace(':mib',mib)
    console.log(url);
    return axios.get(url)
      .then(res => res.data.artist)
      .catch(error => error)
}
