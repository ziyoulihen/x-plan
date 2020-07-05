<template>
  <x-navigator />
  <x-tasks />
  <x-create-task />
  <x-modify-task />
</template>

<script lang="ts">
import { provideState } from "./hooks/use-state";
import Navigator from "./containers/navigator.vue";
import CreateTaskModal from "./containers/create-task.vue";
import ModifyTaskModal from "./containers/modify-task.vue";
import ShowTaskList from "./containers/tasks.vue";

export default {
  name: "App",
  components: {
    "x-create-task": CreateTaskModal,
    "x-modify-task": ModifyTaskModal,
    "x-navigator": Navigator,
    "x-tasks": ShowTaskList,
  },
  setup() {
    provideState();
  },
};
</script>

<style></style>
