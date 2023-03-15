import React from 'react';

import { styled, Typography } from '@mui/material';

import { SpotifySongProps } from '../commonTypes';

const SongCard = styled('div')`
    border-radius: 8px;
    background: gray;
    display: flex;
    padding: 12px;
    margin-bottom: 12px;
`;

const Title = styled(Typography)`
    font-size: 20px;
`;

const Artists = styled(Typography)`
    fontSize: 16px;
`;

type CurrentlyListeningToProps = {
    isPlaying: boolean;
    song: SpotifySongProps;
};

const CurrentlyListeningTo = (props: CurrentlyListeningToProps) => {
    const {isPlaying, song} = props;

    return (
        <div>
            <Typography variant='body1'>
                {isPlaying ? 'Currently listening to' : 'Last listened to'}
            </Typography>
            <SongCard>
                <img src={song.thumbnail} height="64px" width="64px" />
                <div>
                    <Title variant='body1'>{song.title}</Title>
                    <Artists variant='body2'>{song.artists}</Artists>
                </div>
            </SongCard>
        </div>
    );
};

export {CurrentlyListeningTo};
