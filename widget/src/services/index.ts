import axios from 'axios'

const API_ENVS = {
  production: 'https://backend-feedbacker-flax.vercel.app',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

// Interceptador que verifica se o erro é desconhecido (0 ou 500) antes de mostrar para o usuário
httpClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    throw new Error(error.message)
  }

  return error
})

export default {
}
