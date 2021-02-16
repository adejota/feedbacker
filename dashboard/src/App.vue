<template>
  <modal-factory />
  <router-view />
</template>

<script>
import { watch } from 'vue'
import ModalFactory from './components/ModalFactory'
import { useRouter, useRoute } from 'vue-router'
import services from './services'
import { setCurrentUser } from './store/user'

export default {
  components: { ModalFactory },
  setup () {
    // hook de vue-router que permite trabalhar com as AÇÕES de troca de página
    const router = useRouter()

    // outro hook do vue-router que permite pegar INFORMAÇÕES da rota atual
    const route = useRoute()

    // primeiro parâmetro representa o que o vue vai escutar
    // segundo parâmetro representa a função que será chamada quando o primeiro parâmetro mudar
    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')

        if (!token) {
          router.push({ name: 'Home' })
          return
        }

        const { data } = await services.users.getMe()
        setCurrentUser(data)
      }
    })
  }
}
</script>
