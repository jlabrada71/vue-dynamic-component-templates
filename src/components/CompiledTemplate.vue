<template>
  <textarea v-model="template"></textarea>
	<div>
		<v-runtime-template :template="template"></v-runtime-template>
	</div>
</template>

<script>
import VRuntimeTemplate from "vue3-runtime-template";

export default {
  data: () => ({
    name: 'compiled template',
    template: `
      <h1>Hello {{ name }}!</h1>
    `
  }),
  components: {
    // AppMessage,
    VRuntimeTemplate
  }
};
</script>