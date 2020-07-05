<template>
  <x-navigator />
  <x-create-task />
  <x-modify-task />
  <x-tasks />
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

<style>
.x-wrapper {
  color: #fff;
  border-radius: 8px;
  margin: 16px;
  overflow: hidden;
  padding: 16px;
  position: relative;
  /* width: 50%; */
}
.x-wrapper::before {
  background: rgba(255, 255, 255, 0.3);
  content: "";
  display: block;
  filter: blur(5px);
  position: absolute;
  bottom: -5px;
  left: -5px;
  right: -5px;
  top: -5px;
  z-index: -1;
}
.x-title {
  font-size: 24px;
  font-weight: 300;
}
.x-content {
  padding: 8px 0;
  font-weight: 100;
}
.x-plan {
  display: flex;
  padding: 4px;
}
.x-plan .x-plan-title {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.x-plan.x-plan-done {
  text-decoration: line-through;
}
.x-plan .x-plan-deadline {
  flex: 0 0 120px;
  text-align: right;
}
.x-plan .x-plan-suffix {
  flex: 0 0 120px;
}
</style>
