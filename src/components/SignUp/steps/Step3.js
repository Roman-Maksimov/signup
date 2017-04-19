import {React} from 'src/vendor';
import {Aligner} from 'src/components/utils';
import store from 'src/store';


export default class Step3 extends React.Component {
    handleClick() {
        store.dispatch({
            type: 'SIGNUP_SET_STEP',
            payload: 0
        });
    }

    render() {
        return (
            <div className="signup-step">
                <Aligner className="signup-step__success">
                    <i className="material-icons">done</i>
                </Aligner>
                <div className="button" onClick={this.handleClick}>
                    Go to  Dashboard <i className="material-icons">arrow_forward</i>
                </div>
            </div>
        );
    }
}
