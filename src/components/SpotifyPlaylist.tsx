import React from 'react';

import { IconButton, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SpotifyPlaylistProps } from '../commonTypes';
import { LinkIcon } from '../assets/LinkIcon';

const SongCard = styled('div')`
    background: white;
    display: flex;
    margin-bottom: 12px;
    width: 214px;
    flex-wrap: wrap;
    padding-left: 18px;
    padding-right: 18px;
    padding-top: 18px;
    margin-left: auto;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const TextContainer = styled('div')`
    padding: 8px;
`;

const SpotifyPlaylist = (props: SpotifyPlaylistProps) => {
    return (
        <SongCard>
            <img src={props.thumbnail} height="214px" width="214px" alt='playlist art'/>
            <TextContainer>
                <Typography variant='body1'>{props.name}</Typography>
                <IconButton href={props.link}><LinkIcon/></IconButton>
                <Link variant='body1' href={`/playlist/${props.id}`}>Colorify</Link>
            </TextContainer>
        </SongCard>
    );
};

export {SpotifyPlaylist};
