/* eslint-disable
  @typescript-eslint/no-explicit-any,
  no-param-reassign,
  @typescript-eslint/explicit-module-boundary-types */

import { ReactNode } from 'react';
import * as icons from '../assets/icons';

// long list of elements, collapse it

const ELEMENTS = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noindex',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'slot',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'template',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'webview',
];

// config

const CONTROLS_CONFIG = {
  expanded: true,
  hideNoControlsWarning: true,
};

const DEFAULT_DISABLED_CONTROLS = [
  'onMouseEnter',
  'onMouseLeave',
  'onMouseDown',
  'onFocus',
  'onBlur',
  'onKeyDown',
  'onPressStart',
  'onPressEnd',
  'onPressChange',
  'onPressUp',
  'onFocusChange',
  'onKeyUp',
  'onCopy',
  'onCut',
  'onPaste',
  'onCompositionStart',
  'onCompositionEnd',
  'onCompositionUpdate',
  'onSelect',
  'onBeforeInput',
  'onInput',
];

const BACKGROUNDS = {
  default: 'light',
  values: [
    {
      name: 'light',
      value: '#f5f5f5',
    },
    {
      name: 'dark',
      value: '#231F32',
    },
  ],
};

const ICONS = Object.fromEntries(
  Object.entries(icons).map(([key, value]) => [
    key
      .replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)
      .replace(/create|svg/g, '')
      .trim(),
    value,
  ])
);

const ICONS_CONTROL_DEFAULT_PROP_NAME = 'icon';
const ICONS_CONTROL_DEFAULT_ICON = 'briefcase';
const AS_CONTROL_DEFAULT_PROP_NAME = 'as';

// helpers

export function disableDocs(...stories: any[]) {
  stories.forEach((story) => {
    story.parameters = story.parameters ?? {};
    story.parameters.docs = { disable: true };
  });
}

export function disableControls(story: any, controls: string[]) {
  story.argTypes = story.argTypes ?? {};
  controls.forEach((control) => {
    story.argTypes[control] = { table: { disable: true } };
  });
  return story.argTypes;
}

type Addon = 'controls' | 'actions' | 'a11y' | 'backgrounds';
export function enableAddons(story: any, addons: Addon[]) {
  story.parameters = story.parameters ?? {};
  if (addons.includes('controls')) {
    story.parameters.controls = { ...CONTROLS_CONFIG, disable: false };
    disableControls(story, DEFAULT_DISABLED_CONTROLS);
  }
  if (addons.includes('actions')) story.parameters.actions = { disable: false };
  if (addons.includes('a11y')) story.parameters.a11y = { disable: false };
  if (addons.includes('backgrounds'))
    story.parameters.backgrounds = { ...BACKGROUNDS, disable: false };
}

function getIconsControl({ required }: { required?: boolean }) {
  let options: Record<string, string | ReactNode | undefined> = ICONS;
  if (!required) options = { none: undefined, ...options };
  return {
    options: Object.keys(options),
    mapping: options,
    control: {
      type: 'select',
    },
  };
}

function getAsControl(allowedElements: string[] = ELEMENTS) {
  const allOptions: Record<string, string | undefined> = { default: undefined };
  // eslint-disable-next-line no-return-assign
  allowedElements.forEach((element) => (allOptions[element] = element));
  return {
    options: Object.keys(allOptions),
    mapping: allOptions,
    control: {
      type: 'select',
    },
  };
}

type Control = 'icons' | 'as';
type CustomControlOptions = {
  iconsPropName?: string;
  iconsRequired?: boolean;
  asPropName?: string;
  asAllowedElements?: string[];
};
export function addCustomControls(
  story: any,
  controls: Control[],
  opt?: CustomControlOptions
) {
  story.argTypes = story.argTypes || {};
  story.args = story.args || {};

  if (controls.includes('icons')) {
    const propName = opt?.iconsPropName ?? ICONS_CONTROL_DEFAULT_PROP_NAME;
    story.args[propName] = opt?.iconsRequired
      ? ICONS_CONTROL_DEFAULT_ICON
      : 'none';
    story.argTypes[propName] = getIconsControl({
      required: opt?.iconsRequired,
    });
  }

  if (controls.includes('as')) {
    const propName = opt?.asPropName ?? AS_CONTROL_DEFAULT_PROP_NAME;
    story.args[propName] = 'default';
    story.argTypes[propName] = getAsControl(opt?.asAllowedElements);
  }
}
