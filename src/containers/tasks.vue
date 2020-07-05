<template>
  <div class="x-tasks">
    <div class="x-tasks-filter">
      <span>All: </span>
      <x-switch v-model:checked="state.showDone"></x-switch>
    </div>
    <div
      v-for="task in tasks"
      :class="['x-task', task.done ? 'x-task--done' : '']"
      :title="stringify(task)"
    >
      <div class="x-task-title">
        {{ stringify(task) }}
      </div>
      <div class="x-task-suffix">
        <x-button type="circle" @click="modify(task)">E</x-button>
        <x-button type="circle" @click="toggle(task)">T</x-button>
        <x-button type="circle" @click="remove(task)">R</x-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, inject, computed } from "vue";
import Button from "../components/button.vue";
import Switch from "../components/switch.vue";
import { ITask, injectState } from "../hooks/use-state";

export default {
  name: "ShowTaskList",
  components: {
    "x-button": Button,
    "x-switch": Switch,
  },
  setup() {
    const state = injectState();
    function modify(task: ITask) {
      state.task = task;
    }
    function toggle(task: ITask) {
      task.done = !task.done;
    }
    function remove(task: ITask) {
      state.tasks.splice(state.tasks.indexOf(task), 1);
    }
    function stringify(task: ITask) {
      if (task.description) {
        return `${task.deadline}: ${task.title}(${task.description})`;
      }
      return `${task.deadline}: ${task.title}`;
    }

    const tasks = computed(() =>
      state.tasks
        .filter((task) => (state.showDone ? true : !task.done))
        .sort((one, other) => -one.deadline.localeCompare(other.deadline))
    );

    return {
      state,
      tasks,
      modify,
      toggle,
      remove,
      stringify,
    };
  },
};
</script>

<style>
.x-tasks {
  padding: 16px;
}
.x-tasks .x-tasks-filter {
  color: #fff;
  font-weight: 300;
  height: var(--normal-size);
  line-height: var(--normal-size);
}
.x-task {
  border-radius: 8px;
  color: #fff;
  font-weight: 300;
  margin-top: 8px;
  overflow: hidden;
  position: relative;
  padding: 8px;
  display: flex;
  height: 32px;
  line-height: 32px;
}
.x-task::after {
  --blur: 10;
  background: rgba(255, 255, 255, 0.2);
  content: "";
  display: block;
  filter: blur(calc(var(--blur) * 1px));
  position: absolute;
  bottom: calc(var(--blur) * -1px);
  left: calc(var(--blur) * -1px);
  right: calc(var(--blur) * -1px);
  top: calc(var(--blur) * -1px);
  z-index: -1;
}
.x-task.x-task--done {
  text-decoration: line-through;
}
.x-task .x-task-title {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.x-task .x-task-suffix {
  flex: 0 0 auto;
  margin-left: 16px;
}
.x-task .x-task-suffix .x-button:not(:last-child) {
  margin-right: 8px;
}
</style>
