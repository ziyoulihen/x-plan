<template>
  <form class="x-form" ref="formRef" @keyup.enter="submit">
    <slot name="default"></slot>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "Form",
  // props: ["form"],
  setup(props, context) {
    const formRef = ref(null);

    function trigger(node, type) {
      if (node.dispatchEvent) {
        // for Chrome/Firefox
        const event = document.createEvent("Event");
        event.initEvent(type, true, true);
        node.dispatchEvent(event);
      } else {
        // for IE
        node.fireEvent(`on${type}`);
      }
    }

    function submit(event) {
      if (event.ctrlKey) {
        trigger(formRef.value, "submit");
      }
    }
    return { formRef, submit };
  },
};
</script>

<style>
.x-form {
  overflow: hidden;
}
</style>
