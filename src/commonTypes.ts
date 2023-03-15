import { Color } from '@jgleman/color-box';

export type SpotifySongProps = {
  id: string;
  title: string;
  artists: string[];
  thumbnail: string;
  averageColor?: Color;
};

export type SpotifyPlaylistProps = {
  id: string;
  name: string;
  thumbnail: string;
  link: string;
}
