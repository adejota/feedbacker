import mockAxios from 'axios'
import AuthService from './auth'

// como as chamadas são realizadas através do axios, precisamos avisar mockar o axios para informar o jest que estamos utlizando
jest.mock('axios')

describe('AuthService', () => {

  // como estamos utilizando mocks, precisamos limpar todos os mocks salvos no jest
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token when user login', async () => {
    const token = '123.123.123'

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login({ email: 'myemail@email.com', password: '1234' })
    expect(response.data).toHaveProperty('token')
    
    // Snapchot axios pega o objeto, transforma em string e cria um arquivo local
    //  assim quando rodarmos o teste e a response tiver mudado o jest avisa que o snapchot mudou
    //  assim que o teste é executado, cria-se uma pasta __snapchots__ no diretório do teste
    expect(response).toMatchSnapshot()
  })

  it('should return an user when user register', async () => {
    const user = {
      name: 'Name',
      password: '1234',
      email: 'myemail@email.com'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await AuthService(mockAxios).register(user)
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('email')
    expect(response.data).toHaveProperty('password')

    expect(response).toMatchSnapshot()
  })

  it('should throw an error when not found', async () => {
    const errors = { status: 404, statusText: 'Not Found'}

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios).login({ email: 'myemail@email.com', password: '1234' })
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })
})
