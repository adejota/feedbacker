import Home from '.'

// @vue/test-utils é uma lib "oficial" do vue para testes
import { shallowMount } from '@vue/test-utils'

import { routes } from '../../router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<Home />', () => {
  it('should render home correctly', async () => {

    router.push("/")

    // especifica que os testes só começam quando o vue-router estiver pronto
    await router.isReady()

    // utilizamos o shallowMount para testar apenas a Home e não todos os componentes dentro dela
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })

    // gera o snapchot do componente e compara com o HTML gerado
    expect(wrapper.html()).toMatchSnapshot()

    // caso você aconteça uma alteração proposital no componente, deve-se regerar o snapchot
    //  rodando o teste dessa forma: "npm run test:unit -- -u"
  })
})