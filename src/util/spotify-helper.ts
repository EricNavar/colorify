import { SpotifyPlaylistProps } from '../commonTypes';

export const parseSpotifySong = (spotifySong: any) => {
    if (spotifySong) {
        return {
            id: spotifySong.id as string || '',
            title: spotifySong.name as string || '',
            artists: spotifySong.artists.map((artist:any) => artist.name) || '',
            thumbnail: spotifySong.album.images[1].url as string || ''
        };
    }
    else return;
};

export const parseSpotifyPlaylist = (playlist: any): SpotifyPlaylistProps | null => {
    if (playlist) {
        return {
            id: playlist.id as string || '',
            name: playlist.name as string || '',
            thumbnail: playlist.images.length > 0 ? playlist.images[0].url as string : '',
            link: playlist.external_urls.spotify as string || '',
        };
    }
    else return null;
};
