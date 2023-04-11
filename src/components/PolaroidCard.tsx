import React from 'react';

import { Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Pin from '../assets/pushpin.webp';

import { SpotifyPlaylistProps } from '../commonTypes';
import { SpotifyIcon } from '../assets/SpotifyIcon';

const Card = styled('div')`
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
    position: relative;
`;

const StyledChip = styled(Chip)<any>({
    '&:hover': {
        cursor: 'pointer',
    },
    marginRight: 8,
    marginTop: 8,
});

const TextContainer = styled('div')`
    padding: 8px;
`;

const PinImage = styled('img')`
    position: absolute;
    top: -10px;
    right: 45%;
`;

type PolaroidCardProps = {
    name: string;
    thumbnail: string;
    id?: string;
    link?: string;
};

const PolaroidCard = (props: PolaroidCardProps) => {
    return (
        <Card>
            <PinImage src={Pin} alt='' height="40px" width="40px"/>
            <img src={props.thumbnail} height="214px" width="214px" alt='playlist art'/>
            <TextContainer>
                <Typography variant='body1'>{props.name}</Typography>
                <StyledChip label ='Sort' component={RouterLink} to={`/playlist/${props.id}`}/>
                <StyledChip label ='Link' component='a' href={props.link} icon={<SpotifyIcon/>}/>
            </TextContainer>
        </Card>
    );
};

export {PolaroidCard};
