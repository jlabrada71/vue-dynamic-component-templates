import { ref, h } from 'vue'
import VRuntimeTemplate from "vue3-runtime-template";

export default {
  setup(props) {
    const count = ref(3)
    const myTemplate = ref( `
      <h1>Hello compiled template with render function!</h1>
    `)

    // return the render function
    return () => h('div', ['hello ' + count.value, h(VRuntimeTemplate, { template: myTemplate.value })])
  }
} 
