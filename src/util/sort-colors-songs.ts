import { Color } from '@jgleman/color-box';

import { SpotifySongProps } from '../commonTypes';

export const colors = [
  '#ffffff',
  '#009cd4',
  '#505e75',
  'rgba(0,0,0,0.1)',
  '#606a79',
  'rgba(0,0,0,0.2)',
  '#1e2837',
  '#e3e6e9',
  '#969eac',
  '#f02913',
  '#eeeeee',
  '#555e74',
  '#000000',
  '#edeef1',
  '#02bd00',
  '#eae7e6',
  '#e3e3e3',
  '#f4f5f6',
  '#e6e6e6',
  'rgba(240,41,19,0.05)',
  '#efeeed',
  '#209bd0',
  '#1f2837',
  '#999999',
  'rgba(0,156,212,0.05)',
  'rgba(63,78,90,0.11)',
  'rgba(80,94,117,0.1)',
  '#868686',
  '#e8e4e1',
  '#fb7c00',
  '#485f79',
  '#e5f1f6',
  '#6e4888',
  '#b9b9b9',
  '#e0e2e8',
  'rgba(232,228,225,0.5)',
  '#f0f0f0',
  '#eaebee',
  '#656d78',
  'rgba(96,106,121,0.8)',
  '#ee0b0b',
  '#b3b3b3',
  'rgba(83,83,83,0.2)',
  '#f9f9f9',
  'rgba(80,94,117,0.5)',
  'rgba(255,255,255,0.1)',
  '#e9e9e9',
  '#f9f8f8',
  '#ff3ea8',
  'rgba(136,183,213,0)',
  '#dddddd',
  '#e0e0e0',
  '#c0c0c0',
  '#eef7fa',
  '#f5f4f3',
  'rgba(96,106,121,0.7)',
  '#adacac',
  '#e1e4e7',
  '#dadada',
  '#8891a7',
  'rgba(0,0,0,0.05)',
  '#fcfcfc',
  '#dcdcdc',
  '#535e73',
  'rgba(80,94,117,0.3)',
  '#9e9e9e',
  '#d4cfcf',
  '#f8d200',
  'rgba(194,225,245,0)',
  '#ffff00',
  '#928f8f',
  'rgba(0,0,0,0.5)',
  'rgba(0,156,212,0.2)',
  '#0295f7',
  '#5d99d0',
  'rgba(96,106,121,0.2)',
  'rgba(255,255,255,0.44)',
  '#dee0e2',
  '#c0c9d1',
  '#48cd35',
  '#5897fb',
  '#e4e4e4',
  '#333333',
  '#f7f6f6',
  '#acb1b5',
  '#e8e8e8',
  '#ff5f57',
  '#ffbe2f',
  '#28ca42',
  '#c9c9c9',
  '#cccccc',
  '#f3f4f5',
  '#e90e11',
  '#8b5ca9',
  '#a9a9a9',
  '#f2fafd',
  '#73468b',
  '#6b7897',
  'rgba(81,95,118,0.5)',
  'rgba(136,136,136,0.47)',
  '#dfdfdf',
  'rgba(158,158,158,0.2)',
  'rgba(2,189,0,0.2)',
  '#e2f2f7',
  'rgba(251,124,0,0.2)',
  '#616e82',
  '#1189ca',
  '#171e2a',
  'rgba(244,245,246,0.5)',
  'rgba(0,0,0,0.3)',
  '#e5f5fa',
  '#ffbc49',
  '#b8b8b8',
  '#c8c8c8',
  '#e5f5fb',
  'rgba(150,158,172,0.1)',
  '#949ead',
  '#59d2fb',
  '#00a9e7',
  '#f7f7f7',
  '#d9dce2',
  '#ecebeb',
  'rgba(0,0,0,0.13)',
  'rgba(101,116,139,0.07)',
  '#a8aeb9',
  'rgba(30,40,55,0.5)',
  '#09aae8',
  '#713996',
  '#fbfbfb',
  '#5ad1fc',
  '#4a4a4a',
  '#e9edf0',
  '#7ec0ee',
  '#f4d309',
];

function colorDistance(color1: number[], color2: number[]) {
  const x =
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2);
  return Math.sqrt(x);
}

type ClusterWithSong = {
  name: string;
  leadColor: number[];
  colors: SpotifySongProps[];
};

const clusters2: ClusterWithSong[] = [
  { name: 'red', leadColor: [255, 0, 0], colors: [] },
  { name: 'orange', leadColor: [255, 128, 0], colors: [] },
  { name: 'yellow', leadColor: [255, 255, 0], colors: [] },
  { name: 'chartreuse', leadColor: [128, 255, 0], colors: [] },
  { name: 'green', leadColor: [0, 255, 0], colors: [] },
  { name: 'spring green', leadColor: [0, 255, 128], colors: [] },
  { name: 'cyan', leadColor: [0, 255, 255], colors: [] },
  { name: 'azure', leadColor: [0, 127, 255], colors: [] },
  { name: 'blue', leadColor: [0, 0, 255], colors: [] },
  { name: 'violet', leadColor: [127, 0, 255], colors: [] },
  { name: 'magenta', leadColor: [255, 0, 255], colors: [] },
  { name: 'rose', leadColor: [255, 0, 128], colors: [] },
  { name: 'black', leadColor: [0, 0, 0], colors: [] },
  { name: 'grey', leadColor: [235, 235, 235], colors: [] },
  { name: 'white', leadColor: [255, 255, 255], colors: [] },
];

// function oneDimensionSorting(colors: Color[], dim: 'l' | 's') {
//   return colors
//     .sort((colorA, colorB) => {
//       if (colorA.hsl[dim] < colorB.hsl[dim]) {
//         return -1;
//       } else if (colorA.hsl[dim] > colorB.hsl[dim]) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
// }

function oneDimensionSortingWithSongs(songs: SpotifySongProps[], dim: 'l' | 's') {
  return songs
    .sort((songA, songB) => {
      const colorA = songA.averageColor!;
      const colorB = songB.averageColor!;
      if (colorA.hsl[dim] < colorB.hsl[dim]) {
        return -1;
      } else if (colorA.hsl[dim] > colorB.hsl[dim]) {
        return 1;
      } else {
        return 0;
      }
    });
}

const reduceClustersWithSongs = (clusters: ClusterWithSong[]) => {
  return clusters.reduce((acc: SpotifySongProps[], curr: ClusterWithSong) => {
    const colors = curr.colors.map((song: SpotifySongProps) => song);
    return [...acc, ...colors];
  }, []);
};

const arr = [
  'cherry blosson',
  'suicide yr',
  'you broke me first',
  'Surprise'
];

export function sortSongs(songs: SpotifySongProps[]) {
  songs.forEach((song) => {
    let minDistance: number|undefined;
    let minDistanceClusterIndex;
    
    
    const color: Color|undefined = song.averageColor;
    if (!color) {
      throw new Error('Color is not defined');
    }
    clusters2.forEach((cluster, clusterIndex) => {
      const colorRgbArr = [color.rgb.r, color.rgb.g, color.rgb.b];
      const distance = colorDistance(colorRgbArr, cluster.leadColor);
      if (minDistance === undefined || minDistance > distance) {
        minDistance = distance;
        minDistanceClusterIndex = clusterIndex;
      }
    });
    
    if (minDistanceClusterIndex) {
      clusters2[minDistanceClusterIndex].colors.push(song);
    }
    else {
      clusters2[0].colors.push(song);
    }
  });
  
  clusters2.forEach((cluster) => {
    const dim = ['white', 'grey', 'black'].includes(cluster.name) ? 'l' : 's';
    cluster.colors = oneDimensionSortingWithSongs(cluster.colors, dim);
  });

  const result = reduceClustersWithSongs(clusters2);
  return result;
}
