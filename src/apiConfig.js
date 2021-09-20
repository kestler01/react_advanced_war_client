let apiUrl
const apiUrls = {
  production: 'https://advanced-war.herokuapp.com',
  development: 'http://localhost:8000'
}
// my django api is at port 8000, default is 4741
if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
