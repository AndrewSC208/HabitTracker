export const checkPassword = (pw1, pw2) => {
    if(pw1.length < 7) {
        return { 
            code: 1,
            text: 'Password must be larger that 6 characters',
            label: 'Password is to short',
            action: null
        }
    } else if (pw1 !== pw2)  {
        return {
            code: 2,
            text: 'Passwords do no match',
            label: "Passwords don't match",
            action: null
        }
    } else {
        return {
            code: 0,
            text: '',
            label: '',
            action: null
        }
    }
};

export const checkEmail = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!re.test(String(email).toLowerCase())) {
        return {
            code: 3,
            text: 'Email is not valid',
            label: 'Email is not valid',
            action: null
        }
    } else {
        return {
            code: 0,
            text: '',
            label: '',
            action: null
        }
    }
};