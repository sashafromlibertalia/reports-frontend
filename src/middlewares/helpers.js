const handleUser = (user) => {
    localStorage.setItem('user', user);
}

const getUser = () => {
    return localStorage.getItem('user');
}

const removeUser = () => {
    return localStorage.removeItem('user');
}

const helpers = { handleUser, getUser, removeUser }

export default helpers