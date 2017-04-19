import {React} from 'src/vendor';
import {prepareTheme} from './_utils';

import InputOriginal from 'react-toolbox/lib/input';
import customTheme from './input.scss';

export const Input = (props) => {
    const {theme = {}, ...others} = props;
    const _theme = prepareTheme(theme, customTheme);

    return (
        <InputOriginal theme={_theme} {...others} />
    );
};

export default Input;
