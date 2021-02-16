<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Chat from './Chat.vue'
import Close from './Close.vue'
import ArrowLeft from './ArrowLeft.vue'
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'

export default {
  components: {
    Chat,
    Close,
    ArrowLeft,
    Loading,
    Copy,
    ChevronDown
  },

  props: {
    name: { type: String, required: true }
  }
}
</script>
