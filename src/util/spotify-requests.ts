import axios from 'axios';

import { parseSpotifyPlaylist, parseSpotifySong } from './spotify-helper';
import { SpotifySongProps } from '../commonTypes';


const getConfig = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getCurrentlyPlayingTrack = async (token: string) => {
    const url = 'https://api.spotify.com/v1/me/player/currently-playing';
    return axios.get(url, getConfig(token))
        .then(function (response: any) {
            return {
                isPlaying: response.data.is_playing,
                song: parseSpotifySong(response.data.item)
            };
        })
        .catch(function (error: any) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

export const getPlaylists = async (token: string, page: number) => {
    const limit = 50;
    const offset = page * limit;
    const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`;
    return axios.get(url, getConfig(token))
        .then(function (response: any) {
            return {
                playlists: response.data.items.map((playlist: any)=> 
                    parseSpotifyPlaylist(playlist)
                ),
                totalPlaylists: response.data.total
            };
        })
        .catch(function (error: any) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

export const searchSong = async (token: string, search: string) => {
    const url = `https://api.spotify.com/v1/search?q=${search}&limit=10&type=track`;
    return axios.get(url, getConfig(token))
        .then(function (response: any) {
            if (response.data.tracks.items) {
                return response.data.tracks.items.map((song:any)=>parseSpotifySong(song));
            }
            else return [];
        })
        .catch(function (error: any) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

type getSongsFromPlaylistResponse = {
    songs: SpotifySongProps[];
    totalSongs: number;
}
export const getSongsFromPlaylist = async (token: string, playlistId: string, offset: number) => {
    const limit = 100;
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`;
    return axios.get(url, getConfig(token))
        .then(function (response: any) {
            const result: getSongsFromPlaylistResponse = {
                songs: response.data.items
                    .filter((item: any) => item.track !== null)
                    .map((item: any) => parseSpotifySong(item.track)),
                totalSongs: response.data.total,
            };
            return result;
        })
        .catch(function (error: any) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

export const getPlaylistDetails = async (token: string, playlistId: string) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}?fields=images%2Cname%2Cexternal_urls`;
    return axios.get(url, getConfig(token))
        .then(function (response: any) {
            const result = {
                name: response.data.name,
                thumbnail: response.data.images.length > 0 ? response.data.images[0].url : '',
                url: response.data.external_urls.spotify,
            };
            return result;
        })
        .catch(function (error: any) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

export const deletePlaylistSongs = async (token: string, playlistId: string, songIds: string[]) => {
    const tracksFormatted = songIds.map(songId=>{
        return {
            uri: `spotify:track:${songId}`
        };
    });
    const data = {
        tracks: tracksFormatted
    };
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    return axios.delete(url, {...getConfig(token), data})
        .then(function (response: any) {
            return response;
        })
        .catch(function (error: any) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

export const addSongsToPlaylist = async (token: string, playlistId: string, songIds: string[]) => {
    const data = {
        uris: songIds.map((songId)=>
            `spotify:track:${songId}`
        )
    };
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    return axios.post(url, data, getConfig(token))
        .then(function (response: any) {
            return response;
        })
        .catch(function (error: any) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};
