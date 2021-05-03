const getToken = async ()=> {
    const token = await  localStorage.getItem('token');
    return token;
}
const saveToken = async (token) => {
   await localStorage.setItem('token', token);
   return 'ok'
}
const deleteToken = async () => {
    await localStorage.removeItem('token');
}

export {
    getToken,
    saveToken,
    deleteToken
}
