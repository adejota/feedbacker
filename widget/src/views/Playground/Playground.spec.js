import { shallowMount } from '@vue/test-utils'
import Playground from './index.vue'

describe('<Playground />', () => {
  it('should render component correctly', () => {
    const wrapper = shallowMount(Playground)
    expect(wrapper).toMatchSnapshot()
  })
})