// https://www.w3schools.com/js/js_cookies.asp - slightly modified

export const setTokenCookie = token => {
    console.log('setTokenCookie', token);
    document.cookie = 'token=' + token + ';path=/';             // <-- dev only
    // document.cookie = 'token=' + token + ';path=/;secure';   // <-- prod only
    // TODO: httpOnly; and expiration ???
}

export const getTokenCookie = () => {
    console.log('getTokenCookie');
    const name = 'token=';
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}