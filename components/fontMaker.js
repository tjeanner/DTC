import React from 'react';
import {Platform} from 'react-native';
// we define available font weight and styles for each font here
const font = {
  Gilroy: {
    weights: {
      Heavy: 'bold',
      Black: '900',
      ExtraBold: '800',
      Bold: '700',
      SemiBold: '600',
      Medium: '500',
      Normal: '400',
      Light: '300',
      UltraLight: '200',
      Thin: '100'
    },
    styles: {
      Italic: 'italic'
    }
  }
};


// generate styles for a font with given weight and style
export const fontMaker = (options = {}) => {
  let {weight, style, family} = Object.assign(
    {
      weight: null,
      style: null,
      family: 'Gilroy'
    },
    options
  );

  const {weights, styles} = font[family];

  if (Platform.OS === 'android') {
    weight = weights[weight] ? weight : '';
    style = styles[style] ? style : '';

    const suffix = weight + style;

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : '')
    };
  } else {
    weight = weights[weight] || weights.Normal;
    style = styles[style] || 'normal';

    return {
      fontFamily: family,
      fontWeight: weight,
      fontStyle: style
    };
  }
};
