import axios from 'axios'

const endpoint = "http://35.185.181.0:3000/api"
const apiEndpointOf = (path) => endpoint + path

export const fetchFanState = async () => {
  const res = (await axios.get(apiEndpointOf('/fan'))).data
  return res.fanstate
}

export const toggleAuto = async () => {
  return axios.post(apiEndpointOf('/auto'))
}

export const toggleFan = async () => {
  return axios.post(apiEndpointOf('/fan'))
}

export const fetchData = async (num) => {
  const res = (await axios.get(apiEndpointOf('/pm'), { params: { num }})).data
  return res
}