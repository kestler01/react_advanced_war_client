import apiUrl from '../apiConfig'
import axios from 'axios'

// user routes
export const signUp = (credentials) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up/',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = (credentials) => {
  return axios({
    url: apiUrl + '/sign-in/',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = (user) => {
  return axios({
    url: apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}` // default is bearer, but that is for the express server: i am using django and it expects the authorization header to be Token 'user.token'
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-pw/',
    method: 'PATCH',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
