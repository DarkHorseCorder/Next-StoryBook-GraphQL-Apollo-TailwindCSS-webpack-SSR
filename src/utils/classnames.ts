const PREFIX = 'create-';
const ELEMENT_SEPARATOR = '__';

export function makeRootClassName(name: string): string {
  return `${PREFIX}${name}`;
}

/**
 * A factory that returns a function that makes it easy to generate
 * subelement classnames in relation to a root element name in BEM format
 * e.g. 'Button__icon'
 *
 * @example
 * const ROOT = makeRootClassName("Button");
 * const el = makeElementClassNameFactory(ROOT);
 *
 * ....
 *
 * return (
 *   <button className={ROOT}>
 *     <span className={el`text`}>Click me!</span>
 *     <Icon className={el`icon`} />
 *   </button>
 * )
 */
export function makeElementClassNameFactory(root: string) {
  return (strings: TemplateStringsArray): string =>
    `${root}${ELEMENT_SEPARATOR}${strings[0]}`;
}
