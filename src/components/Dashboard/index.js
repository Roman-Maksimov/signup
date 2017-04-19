import {React, connect} from 'src/vendor';


@connect(state => ({
    details: state.signup.details
}))
export default class Dashboard extends React.Component {
    render(){
        const { details } = this.props;

        console.log({
            user_data: {
                ...details,
                date_of_birth: details.date_of_birth.unix()
            }
        });

        return <div className="dashboard">DASHBOARD</div>
    }
}
