import {React} from 'src/vendor';
import {prepareTheme} from '../_utils';

const IconButtonOriginal = require('react-toolbox/lib/button/').IconButton;
import customTheme from './IconButton.scss';

export const IconButton = (props) => {
    const {theme = {}, icon, ...others} = props;
    const _theme = prepareTheme(theme, customTheme);

    let _icon = icon;

    if(/^(.*\s)?mdi(\s.*)?$/i.test(icon))
        _icon = <i className={icon} />;

    let m;
    if(/^(.*\s)?icon(\s.*)?$/i.test(icon) && (m = /(?:.*\s)?(icon-[^\s]+)(?:\s.*)?/i.exec(icon)))
        _icon = (
            <svg className={icon}>
                <use xlinkHref={`#${m[1]}`} />
            </svg>
        );

    return (
        <IconButtonOriginal theme={_theme} icon={_icon} {...others} />
    );
};

export default IconButton;
