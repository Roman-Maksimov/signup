import {React, CComponent, cx, ReactToolbox} from 'src/vendor';

const {Dropdown, Input} = ReactToolbox;


export default class Pagination extends CComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.result.page || 1,
            pageLimitsValue: "12",
            pageLimits: [
                { value: "12", label: "12" },
                { value: "24", label: "24" },
                { value: "48", label: "48" },
                { value: "96", label: "96" },
            ]
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.value !== this.state.value)
            nextProps.onChange && nextProps.onChange(nextState.value);

        if(nextState.pageLimitsValue !== this.state.pageLimitsValue)
            nextProps.onChangeLimit && nextProps.onChangeLimit(nextState.pageLimitsValue);
    }

    onChange = (val) => {
        const {result} = this.props;
        const value = parseInt(val);

        // check for wrong values
        if(isNaN(value) || value < 1 || value > (result.pages || 1))
            return;

        this.setState({ value });
    };

    onChangeLimit = (value) => {
        this.setState({ pageLimitsValue: value });
    };

    render() {
        const {result, limitChange, limitLabel = "items per page", className=""} = this.props;

        return (
            <div className={cx("pagination", className)}>
                <span className="pagination__title">Page:</span>{(
                    <Input
                        className="pagination__input"
                        type="number"
                        min={1}
                        max={result.pages}
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                )} / <span className="pagination__pages">{result.pages}</span>
                {limitChange && (
                    <Dropdown
                        auto
                        label={limitLabel}
                        theme={{
                            dropdown: "pagination__limit-dropdown",
                        }}
                        source={this.state.pageLimits}
                        onChange={this.onChangeLimit}
                        value={this.state.pageLimitsValue}
                    />
                )}
            </div>
        );
    }
}
