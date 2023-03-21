import { Color } from '@jgleman/color-box';

import { SpotifySongProps } from '../commonTypes';

export const colors = [
  '#ffffff',
  '#009cd4',
  '#505e75',
  '#606a79',
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
  '#efeeed',
  '#209bd0',
  '#1f2837',
  '#999999',
  '#868686',
  '#e8e4e1',
  '#fb7c00',
  '#485f79',
  '#e5f1f6',
  '#6e4888',
  '#b9b9b9',
  '#e0e2e8',
  '#f0f0f0',
  '#eaebee',
  '#656d78',
  '#ee0b0b',
  '#b3b3b3',
  '#f9f9f9',
  '#e9e9e9',
  '#f9f8f8',
  '#ff3ea8',
  '#dddddd',
  '#e0e0e0',
  '#c0c0c0',
  '#eef7fa',
  '#f5f4f3',
  '#adacac',
  '#e1e4e7',
  '#dadada',
  '#8891a7',
  '#fcfcfc',
  '#dcdcdc',
  '#535e73',
  '#9e9e9e',
  '#d4cfcf',
  '#f8d200',
  '#ffff00',
  '#928f8f',
  '#0295f7',
  '#5d99d0',
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
  '#dfdfdf',
  '#e2f2f7',
  '#616e82',
  '#1189ca',
  '#171e2a',
  '#e5f5fa',
  '#ffbc49',
  '#b8b8b8',
  '#c8c8c8',
  '#e5f5fb',
  '#949ead',
  '#59d2fb',
  '#00a9e7',
  '#f7f7f7',
  '#d9dce2',
  '#ecebeb',
  '#a8aeb9',
  '#09aae8',
  '#713996',
  '#fbfbfb',
  '#5ad1fc',
  '#4a4a4a',
  '#e9edf0',
  '#7ec0ee',
  '#f4d309',
];

function oneDimensionSortingWithSongs(songs: SpotifySongProps[]) {
  const dim = 's';
  return songs
    .sort((songA, songB) => {
      const colorA = songA.averageColor!;
      const colorB = songB.averageColor!;
      if (colorA.hsl[dim] < colorB.hsl[dim]) {
        return 1;
      } else if (colorA.hsl[dim] > colorB.hsl[dim]) {
        return -1;
      } else {
        return 0;
      }
    });
}

export function sortSongs(songs: SpotifySongProps[]) {
  const result = oneDimensionSortingWithSongs(songs);
  return result;
}