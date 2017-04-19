const def = {
    step: 1,
    details: {
        email: '',
        password: '',
        date_of_birth: null,
        gender: 'unspecified',
        how_hear_about_us: null
    }
};

export const signup = function(state = def, action) {
    switch(action.type){
        case "SIGNUP_SET_DETAILS":
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.payload
                }
            };
        case "SIGNUP_SET_STEP":
            return {
                ...state,
                step: action.payload
            };
    }
    return state;
};
