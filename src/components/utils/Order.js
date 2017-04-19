import {React, CComponent, cx, ReactToolbox} from 'src/vendor';

const {Dropdown, IconButton} = ReactToolbox;


export default class Order extends CComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.value || (props.length > 0 && props[0].value) || "",
            order: 1
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.page !== this.state.page)
            nextProps.onChange && nextProps.onChange(nextState.page);
    }

    onSortChange = (value) => {
        this.setState({value});
        this.onChange({value});
    };

    onOrderChange = () => {
        const order = -this.state.order;

        this.setState({order});
        this.onChange({order});
    };

    onChange = ({value = null, order = null}) => {
        this.props.onChange && this.props.onChange(value || this.state.value, order || this.state.order);
    };

    render() {
        const {source, className="", auto=true} = this.props;

        return (
            <div className={cx("order", className)}>
                <span className="order__title">Order by:</span>{(
                <Dropdown
                    className="order__input"
                    auto={auto}
                    source={source}
                    value={this.state.value}
                    onChange={this.onSortChange}
                />
            )}{(
                <IconButton
                    icon={cx("mdi", {
                        "mdi-sort-ascending": this.state.order !== -1,
                        "mdi-sort-descending": this.state.order === -1,
                    })}
                    accent
                    onClick={this.onOrderChange}
                />
            )}</div>
        );
    }
}