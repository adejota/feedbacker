import { readonly } from 'vue'
import UserModule from './user'
import GlobalModule from './global'

// o readonly do próprio vue impede que um usuário altere os dados de usuário
export default readonly({
  User: UserModule,
  Global: GlobalModule
})
