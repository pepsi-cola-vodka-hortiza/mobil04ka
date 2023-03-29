import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';
// @ts-ignore
import heartIcon from '../../../images/icons/heart.svg';
import addIcon from '../../../images/icons/add.svg';
import paperBagIcon from '../../../images/icons/paper-bag.svg';
import thunderIcon from '../../../images/icons/thunder.svg';

type IconProps = {
  width?: number;
  height?: number;
};

const SvgXmlWithRTL: React.FC<XmlProps> = ({xml, style, ...rest}) => (
  <SvgXml xml={xml} style={style} {...rest} />
);

const AddIcon = ({
  width = 48,
  height = 48,
  ...rest
}: IconProps): JSX.Element => (
  <SvgXmlWithRTL xml={addIcon} width={width} height={height} {...rest} />
);

const HeartIcon = ({
  width = 24,
  height = 24,
  ...rest
}: IconProps): JSX.Element => (
  <SvgXmlWithRTL xml={heartIcon} width={width} height={height} {...rest} />
);

const PaperBagIcon = ({
  width = 24,
  height = 24,
  ...rest
}: IconProps): JSX.Element => (
  <SvgXmlWithRTL xml={paperBagIcon} width={width} height={height} {...rest} />
);

const ThunderIcon = ({
  width = 24,
  height = 24,
  ...rest
}: IconProps): JSX.Element => (
  <SvgXmlWithRTL xml={thunderIcon} width={width} height={height} {...rest} />
);

export {HeartIcon, ThunderIcon, PaperBagIcon, AddIcon};
