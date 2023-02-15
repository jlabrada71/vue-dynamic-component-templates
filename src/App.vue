<template>
  <DynamicTemplate></DynamicTemplate>
  <HelloRenderFunction />
  <RenderFunctionExample msg="This is a test"></RenderFunctionExample>
  <JsxComponent />
  <CompiledTemplate />
  <CompiledTemplateWithRenderFunction />
  
</template>
<script setup>
  import JsxComponent from '@/components/JsxComponent.jsx'
  import DynamicTemplate from '@/components/DynamicTemplate.vue'
  import RenderFunctionExample from '@/components/RenderFunctionExample.js'
  import HelloRenderFunction from '@/components/HelloRenderFunction.js'
  import CompiledTemplate from '@/components/CompiledTemplate.vue'
  import CompiledTemplateWithRenderFunction from '@/components/CompiledTemplateWithRenderFunction.js'

</script>