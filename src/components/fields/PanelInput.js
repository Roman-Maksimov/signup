import { React, cx } from 'src/vendor';


export default field => {
    const { input, meta, className, ...others } = field;
    const error = meta.touched && meta.error ? meta.error : undefined;

    return (
        <input className={cx('panel__field', className, { panel__field_error: error })}
                  {...input}
                  {...others}
        />
    );
}
