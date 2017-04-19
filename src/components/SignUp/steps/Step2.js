import { React, connect, bindActionCreators, moment } from 'src/vendor';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Panel, PanelInput, Dropdown } from 'src/components/fields';

const FORM_NAME = 'step2';
const selector = formValueSelector(FORM_NAME);

const validate = values => {
    const errors = {};

    if (!values.day) {
        errors.day = 'DAY OF BIRTH IS REQUIRED'
    } else if (isNaN(Number(values.day)) || Number(values.day) > 31) {
        errors.day = 'INVALID DAY OF BIRTH';
    }

    if (!values.month) {
        errors.month = 'MONTH OF BIRTH IS REQUIRED'
    } else if (isNaN(Number(values.month)) || Number(values.month) > 12) {
        errors.month = 'INVALID MONTH OF BIRTH';
    }

    if (!values.year) {
        errors.year = 'YEAR OF BIRTH IS REQUIRED'
    } else if (isNaN(Number(values.year))) {
        errors.year = 'INVALID YEAR OF BIRTH';
    }

    return errors;
};

@connect(
    state => ({
        day: selector(state, 'day'),
        month: selector(state, 'month'),
        year: selector(state, 'year')
    })
)
@reduxForm({
        form: FORM_NAME,
        validate
    },
    undefined,
    dispatch => bindActionCreators({ change }, dispatch)
)
export default class Step2 extends React.Component {
    getMaxDay(props) {
        const { month, year } = props;
        let maxDay = 31;

        const date = moment();
        if (year) {
            date.year(year);
        }

        if (month) {
            maxDay = date.month(month - 1).daysInMonth();
        }

        return maxDay;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.day && (nextProps.month !== this.props.month || nextProps.year !== this.props.year)) {
            const maxDay = this.getMaxDay(nextProps);

            if (Number(nextProps.day) > maxDay) {
                nextProps.change('day', maxDay);
            }
        }
    }

    render() {
        const { handleSubmit, handleBack } = this.props;
        const maxDay = this.getMaxDay(this.props);

        return (
            <form className="signup-step" onSubmit={handleSubmit}>
                <div className="signup-step">
                    <div className="signup-step__row">
                        <div className="signup-step__row-title">DATE OF BIRTH</div>
                        <div className="panel">
                            <Field component={PanelInput}
                                   ref="day"
                                   type="number"
                                   min="1"
                                   max={maxDay}
                                   className="panel__field"
                                   name="day"
                                   placeholder="DD"
                            />
                            <Field component={PanelInput}
                                   type="number"
                                   min="1"
                                   max="12"
                                   className="panel__field"
                                   name="month"
                                   placeholder="MM"
                            />
                            <Field component={PanelInput}
                                   type="number"
                                   min="1"
                                   max={moment().format('YYYY')}
                                   className="panel__field"
                                   name="year"
                                   placeholder="YYYY"
                            />
                        </div>
                    </div>
                    <div className="signup-step__row">
                        <div className="signup-step__row-title">GENDER</div>
                        <Field component={Panel}
                               type="text"
                               name="gender"
                               values={[ "male", "female", "unspecified" ]}
                        />
                    </div>
                    <div className="signup-step__row">
                        <div className="signup-step__row-title">WHERE DID YOU HEAR ABOUT US?</div>
                        <Field component={Dropdown}
                               name="how_hear_about_us"
                               theme={{
                                   dropdown: 'signup-dropdown',
                                   field: 'signup-dropdown__field',
                                   value: 'signup-dropdown__value',
                                   values: 'signup-dropdown__values'
                               }}
                               source={[
                                   {value: "tv", label: "TV"},
                                   {value: "internet", label: "Internet"},
                                   {value: "friend", label: "Friend"}
                               ]}
                        />
                    </div>
                </div>
                <div className="signup-bottom">
                    <a href="#"
                       className="signup-bottom__back"
                       onClick={handleBack}
                    >Back</a>
                    <button className="signup-bottom__next"
                            type="submit"
                    >
                        Next <i className="material-icons signup-bottom__icon">arrow_forward</i>
                    </button>
                </div>
            </form>
        );
    }
}
