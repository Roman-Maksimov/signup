import { React } from 'src/vendor';
import { Field, reduxForm } from 'redux-form';
import { Input } from 'src/components/fields';


const Step1 = props => {
    const { handleSubmit } = props;
    const theme = {
        errored: 'signup-step__row_errored'
    };

    return (
        <form className="signup-step" onSubmit={handleSubmit}>
            <div className="signup-step">
                <div className="signup-step__row">
                    <Field component={Input}
                           type="text"
                           name="email"
                           theme={theme}
                           placeholder="EMAIL"
                    />
                </div>
                <div className="signup-step__row">
                    <Field component={Input}
                           type="password"
                           name="password"
                           theme={theme}
                           placeholder="PASSWORD"
                    />
                </div>
                <div className="signup-step__row">
                    <Field component={Input}
                           type="password"
                           name="confirm_password"
                           theme={theme}
                           placeholder="CONFIRM PASSWORD"
                    />
                </div>
            </div>
            <div className="signup-bottom">
                <button className="signup-bottom__next"
                        type="submit"
                >
                    Next <i className="material-icons signup-bottom__icon">arrow_forward</i>
                </button>
            </div>
        </form>
    );
};

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'EMAIL IS REQUIRED'
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = 'INVALID EMAIL ADDRESS';
    }

    if (!values.password) {
        errors.password = 'PASSWORD IS REQUIRED';
    } else if (values.password.length < 6) {
        errors.password = 'PASSWORD SHOULD BE MINIMUM 6 CHARACTERS LONG';
    }

    if (values.confirm_password !== values.password) {
        errors.confirm_password = 'INVALID PASSWORD CONFIRMATION';
    }

    return errors;
};

export default reduxForm({
    form: 'step1',
    validate
})(Step1);
