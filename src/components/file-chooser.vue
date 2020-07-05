<template>
  <span class="x-file-chooser" @click="click">
    <input
      type="file"
      ref="fileRef"
      @click.stop=""
      :accept="accept"
      :multiple="multiple"
    />

    <slot name="default"></slot>
  </span>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "FileChooser",
  props: ["accept", "multiple"],
  setup() {
    const fileRef = ref(null);
    function click() {
      fileRef.value.click();
    }
    return { fileRef, click };
  },
};
</script>

<style>
.x-file-chooser input[type="file"] {
  display: none;
}
</style>
