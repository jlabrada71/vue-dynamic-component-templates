import { defineComponent, reactive } from "vue"
export default defineComponent(() => {
  const state = reactive({
    count: 0
  })

  function inc() {
    state.count++
  }

  return () => <button onClick={inc}>
    JSX example : 
    {state.count}
  </button>
})