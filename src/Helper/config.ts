export const getHeaders = () => {
    let authToken = localStorage.token ? localStorage.token : null;
  
    let config: any = {
      headers: {
        Accept: 'application/json'
      }
    };
    if (authToken) {
      config.headers.Authorization = 'Bearer ' + authToken;
    }
  
    return config;
}