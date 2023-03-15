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
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    margin-left: auto;
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
