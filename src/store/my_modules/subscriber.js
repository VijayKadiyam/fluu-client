/* eslint-disable */
import axios from 'axios'
import store from '@/store'

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if(mutation.payload) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
        localStorage.setItem('token', mutation.payload)
      }
      else {
        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('token')
        break
      }
    case 'auth/SET_USER':
      if(mutation.payload) {
        let loggedInUser = Object.assign(mutation.payload)
        if(loggedInUser.id) {
          let loggedInUserSites = loggedInUser ? loggedInUser.sites : ''
          let loggedInUserSitesId = loggedInUserSites.length ? loggedInUserSites[0].id : ''
          axios.defaults.headers.common['siteid'] = loggedInUserSitesId 
        }
      } 
      else {
        axios.defaults.headers.common['siteid'] = null
      }
  }
})