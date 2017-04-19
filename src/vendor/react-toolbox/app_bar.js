import {React} from 'src/vendor';
import {prepareTheme} from './_utils';

import AppBarOriginal from 'react-toolbox/lib/app_bar';
import customTheme from './app_bar.scss';

export const AppBar = (props) => {
    const {theme = {}, ...others} = props;
    const _theme = prepareTheme(theme, customTheme);

    return (
        <AppBarOriginal theme={_theme} {...others} />
    );
};

export default AppBar;
