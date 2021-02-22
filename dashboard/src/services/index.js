import axios from 'axios'
import { router } from '../router'
import { setGlobalLoading } from '../store/global'
import AuthService from './auth'
import UsersService from './users'
import FeedbacksService from './feedbacks'

const API_ENVS = {
  production: 'https://backend-feedbacker-ten.vercel.app',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

// Interceptador que coloca o token do usuário em todas as requisições
httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

// Interceptador que verifica se o erro é desconhecido (0 ou 500) antes de mostrar para o usuário
httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  // Essa validação impede que um token aleatório seja colocado na verificação de request
  if (error.response.status === 401) {
    setGlobalLoading(false)
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
