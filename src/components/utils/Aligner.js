import {React, cx} from 'src/vendor';

export default class Aligner extends React.Component {
    render() {
        const {tag = "div", children = [], ...others} = this.props;

        let _children = null;

        if(children.length > 1){
            _children = children.map((child, index) => React.isValidElement(child)
                ? React.cloneElement(
                    child,
                    {
                        key: child.props && child.props.key || index,
                        className: cx(child.props && child.props.className || "", "aligner")
                    }
                )
                : <div key={index} className="aligner">{child}</div>
            );
        } else if (React.isValidElement(children)) {
            _children = React.cloneElement(
                children,
                {
                    className: cx(children.props && children.props.className || "", "aligner")
                }
            )
        } else {
            _children = <div className="aligner">{children}</div>;
        }

        return React.createElement(
            tag,
            {...others},
            <div className="aligner aligner_empty" />,
            _children
        );
    }
}
