import { React, cx } from 'src/vendor';


export default field => {
    const { input, values } = field;

    return (
        <div className="panel">
            {values.map((value, i) => (
                <div key={`panel-${i}`}
                     className={cx("panel__field", {
                         panel__field_active: input.value === value
                     })}
                     onClick={() => { input.onChange(value) }}
                >{value}</div>
            ))}
        </div>
    );
}
