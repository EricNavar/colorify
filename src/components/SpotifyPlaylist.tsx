import React from 'react';

import { Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SpotifyPlaylistProps } from '../commonTypes';

const SongCard = styled('div')`
    background: gray;
    display: flex;
    margin-bottom: 12px;
`;

const TextContainer = styled('div')`
    padding: 8px;
`;

const SpotifyLink = styled(Link)`
    margin-right: 16px;
`;

const SpotifyPlaylist = (props: SpotifyPlaylistProps) => {
    return (
        <SongCard>
            <img src={props.thumbnail} height="80px" width="80px" />
            <TextContainer>
                <Typography variant='body1'>{props.name}</Typography>
                <SpotifyLink variant='body1' href={props.link}>Link</SpotifyLink>
                <Link variant='body1' href={`/playlist/${props.id}`}>Colorify</Link>
            </TextContainer>
        </SongCard>
    );
};

export {SpotifyPlaylist};
