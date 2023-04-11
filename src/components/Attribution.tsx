import React from 'react';
import { Typography } from '@mui/material';
import { SpotifyLogo } from '../assets/SpotifyLogo';

const Attribution = () => {
    return (
        <div style={{marginTop: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
            <SpotifyLogo/>
            <Typography style={{marginLeft: 20}} variant='body1'>Playlists supplied and made available by Spotify</Typography>
        </div>
    )
}

export {Attribution};
