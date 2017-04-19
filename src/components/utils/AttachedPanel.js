import {React, cx} from 'src/vendor';
import CComponent from 'src/components';
import {getOffsetRect} from 'src/utils';


export default class AttachedPanel extends CComponent {
    constructor(props, context) {
        super(props, context);

        this.listener = false;
        this.top = 0;
        this.height = 0;

        this.state = {
            attached: false
        }
    }

    componentDidMount() {
        this.top = getOffsetRect(this.refs.panel).top;
        this.height = this.refs.panel.offsetHeight;
        this.listener = window.addEventListener("scroll", this.onScroll.bind(this), false);
        window.dispatchEvent(new Event("scroll"));
    }

    componentWillUnmount() {
        if(this.listener)
            window.removeEventListener(this.listener);
    }

    onScroll(e) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const attached = scrollTop >= this.top;

        if(this.state !== attached)
            this.setState({ attached });
    }

    render() {
        const {tag = "div", children = [], className, style = {}, ...others} = this.props;

        return React.createElement(
            tag,
            {
                ...others,
                className: cx(className, "attached-panel"),
                style: {
                    ...style,
                    height: this.height
                }
            },
            (
                <div ref="panel"
                     className={cx("attached-panel__context", {
                         "attached-panel__context_attached": this.state.attached
                     })}
                >
                    {children}
                </div>
            )
        );
    }
}
