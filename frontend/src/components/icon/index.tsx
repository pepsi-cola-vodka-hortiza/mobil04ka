import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';
// @ts-ignore
import heartIcon from '../../../images/icons/heart.svg';
import addIcon from '../../../images/icons/add.svg';
import paperBagIcon from '../../../images/icons/paper-bag.svg';
import thunderIcon from '../../../images/icons/thunder.svg';
import settingsIcon from '../../../images/icons/settings.svg';
import likeIcon from '../../../images/icons/like.svg';
import likeOutlinedIcon from '../../../images/icons/like-outlined.svg';
import {TEXT_INPUT_GREY} from '../../constants/colors';

type IconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const SvgXmlWithRTL: React.FC<XmlProps> = ({xml, style, ...rest}) => (
  <SvgXml xml={xml} style={style} {...rest} />
);

const LikeOutlinedIcon = ({
  width = 18,
  height = 18,
  color = TEXT_INPUT_GREY,
  ...rest
}: IconProps): JSX.Element => (
  <SvgXmlWithRTL
    xml={likeOutlinedIcon}
    color={color}
    width={width}
    height={height}
    {...rest}
  />
);

const LikeIcon = ({
  width = 18,
  height = 18,
  color = TEXT_INPUT_GREY,
  ...rest
}: IconProps): JSX.Element => (
  <SvgXmlWithRTL
    xml={likeIcon}
    color={color}
    width={width}
    height={height}
    {...rest}
  />
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

const SettingsIcon = ({
  width = 24,
  height = 24,
  ...rest
}: IconProps): JSX.Element => (
  <SvgXmlWithRTL xml={settingsIcon} width={width} height={height} {...rest} />
);

export {
  LikeIcon,
  LikeOutlinedIcon,
  HeartIcon,
  ThunderIcon,
  PaperBagIcon,
  AddIcon,
  SettingsIcon,
};
