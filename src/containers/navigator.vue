<template>
  <x-menu :dataSource="state.menus">
    <template #suffix>
      <x-button type="circle" @click="show">+</x-button>
      <x-file-chooser @change="open" accept="application/json">
        <x-button type="circle">O</x-button>
      </x-file-chooser>
      <x-button type="circle" @click="save">S</x-button>
    </template>
  </x-menu>
</template>

<script lang="ts">
import { injectState } from "../hooks/use-state";
import Button from "../components/button.vue";
import FileChooser from "../components/file-chooser.vue";
import Menu from "../components/menu.vue";
import { read } from "fs";

export default {
  name: "Navigator",
  components: {
    "x-button": Button,
    "x-file-chooser": FileChooser,
    "x-menu": Menu,
  },
  setup() {
    const state = injectState();
    function show() {
      state.visible = true;
    }
    function open(event) {
      const [file] = event.target.files;
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("loadend", function (event) {
          const tasks = JSON.parse(event.target.result as string);
          state.tasks.push(...tasks);
        });
        reader.readAsText(file);
      }
    }
    function save() {
      const text = JSON.stringify(state.tasks, null, 2);
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const node = document.createElement("a");
      node.href = url;
      node.download = "task.json";
      node.click();
      URL.revokeObjectURL(url);
    }
    return { state, show, open, save };
  },
};
</script>
