<template>
  <component
    :is="store.currentComponent"
    @select-feedback-type="handleSelectFeedbackType"
    @next='next'
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SelectFeedbackType from './SelectFeedbackType.vue'
import WriteAFeedback from './WriteAFeedback.vue'
import useStore from '../../hooks/store'
import useNavigation, { Navigation } from '../../hooks/navigation'
import { StoreState, setFeedbackType } from '../../store'

interface SetupeReturn {
  store: StoreState;
  next: Navigation['next'];
  handleSelectFeedbackType(type: string): void;
}

export default defineComponent({
  components: { SelectFeedbackType, WriteAFeedback },

  setup (): SetupeReturn {
    const store = useStore()
    const { next } = useNavigation()

    function handleSelectFeedbackType (type: string): void {
      setFeedbackType(type)
    }

    return {
      store,
      next,
      handleSelectFeedbackType
    }
  }
})
</script>

<style>

</style>
