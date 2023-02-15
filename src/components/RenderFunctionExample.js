import { ref, h } from 'vue'

export default {
  props: {
    msg:{
      type:String
    }
  },
  setup(props) {
    const count = ref(1)
    return () => h('div', 'render function with props and values ' + count.value + props.msg)
  }
} 
