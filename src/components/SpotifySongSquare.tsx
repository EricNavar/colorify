import React from 'react';

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SpotifySongProps } from '../commonTypes';

const SongCard = styled('div')<{thumbnail:string}>((props) => ({
    background: 'gray',
    display: 'flex',
    height: 200,
    width: 200,
    backgroundSize: 'contain',
    backgroundImage: `url(${props.thumbnail})`,
}));

const TextBackground = styled('div')`
    width: 80%;
    margin: auto;
    background: rgba(0,0,0,.5);
    color: white;
    text-align: center;
`;

const SpotifySongSquare = (props: SpotifySongProps) => {
    const artistsString = props.artists.map((artist: string, index: number) => {
        return (index !== 0 ? ', ' : '') + artist;
    });

    return (
        <SongCard thumbnail={props.thumbnail}>
            <TextBackground>
                <Typography variant='body1'>{props.title}</Typography>
                <Typography variant='body2'>{artistsString}</Typography>
            </TextBackground>
        </SongCard>
    );
};

export {SpotifySongSquare};
