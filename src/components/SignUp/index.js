import {React, ReactTransitionGroup, connect, moment} from 'src/vendor';
const {CSSTransitionGroup} = ReactTransitionGroup;
import * as steps from './steps';
import store from 'src/store';
import ProgressBar from 'src/components/ProgressBar';
import Dashboard from 'src/components/Dashboard';

@connect(state => ({
    step: state.signup.step,
    details: state.signup.details
}))
export default class SignUp extends React.Component {

    /*
     * I'm not using bind operator for the handlers below according to the ESLint jsx-no-bind rule
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
     */

    handleStepSubmit(values) {
        const { day, month, year, confirm_password, ...others } = values;
        const date_of_birth = moment();
        date_of_birth.year(year);
        date_of_birth.month(month - 1);
        date_of_birth.date(day);

        const payload = {
            ...others,
            date_of_birth
        };

        store.dispatch({
            type: 'SIGNUP_SET_DETAILS',
            payload
        });

        store.dispatch({
            type: 'SIGNUP_SET_STEP',
            payload: this.props.step + 1
        })
    }

    handleStepBack() {
        store.dispatch({
            type: 'SIGNUP_SET_STEP',
            payload: this.props.step - 1
        })
    }

    render() {
        const { step, details } = this.props;
        let Step = null;

        switch(step) {
            case 1:
                Step = steps.Step1;
                break;
            case 2:
                Step = steps.Step2;
                break;
            case 3:
                Step = steps.Step3;
                break;
        }

        return Step ? (
                <div className="signup">
                    <div className="signup__top">
                        <div className="signup__title">{step === 3 ? 'Thank you!' : 'Signup'}</div>
                        <ProgressBar total={3} completed={step} />
                    </div>
                    <CSSTransitionGroup className="signup-step"
                                        transitionName="signup-step"
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={500}
                    >
                        <Step key={`signup-step-${step}`}
                              initialValues={details}
                              onSubmit={values => this.handleStepSubmit(values)}
                              handleBack={() => this.handleStepBack()}
                        />
                    </CSSTransitionGroup>
                </div>
            )
            : <Dashboard />;
    }
};
