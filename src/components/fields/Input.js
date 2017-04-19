import { React, ReactToolbox } from 'src/vendor';
const { Input } = ReactToolbox;

export default field => {
    const { placeholder, type, input, meta, theme } = field;
    const error = meta.touched && meta.error ? ' ' : undefined;
    const label = error ? meta.error : placeholder;

    return <Input label={label}
                  type={type}
                  error={error}
                  theme={theme}
                  {...input}
    />;
}
