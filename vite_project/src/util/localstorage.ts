const setAccessToken = (token:object)=> {
  localStorage.setItem('access_token', JSON.stringify(token))
}

export {setAccessToken}