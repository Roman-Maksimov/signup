import { React, ReactToolbox } from 'src/vendor';
const { Dropdown } = ReactToolbox;

export default field => {
    const { input, source, theme } = field;

    return <Dropdown auto
                     theme={theme}
                     source={ source }
                     onChange={value => input.onChange(value)}
                     value={input.value}
    />;
}
