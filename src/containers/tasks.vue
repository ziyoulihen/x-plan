<template>
  <div class="x-tasks">
    <div class="x-box x-glass">
      <div class="x-box-content">
        <span>All: </span>
        <x-switch v-model:checked="state.showDone"></x-switch>
      </div>
      <div class="x-box-suffix">
        <x-button type="circle" @click="show">+</x-button>
        <x-file-chooser @change="open" accept="application/json">
          <x-button type="circle">O</x-button>
        </x-file-chooser>
        <x-button type="circle" @click="save">S</x-button>
      </div>
    </div>
    <div
      v-for="task in tasks"
      :class="['x-task', 'x-glass', task.done ? 'x-task--done' : '']"
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
import FileChooser from "../components/file-chooser.vue";
import Switch from "../components/switch.vue";
import { ITask, injectState } from "../hooks/use-state";

export default {
  name: "ShowTaskList",
  components: {
    "x-button": Button,
    "x-file-chooser": FileChooser,
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
      show,
      open,
      save,
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
.x-tasks .x-box {
  border-radius: 8px;
  font-weight: 300;
  padding: 8px;
}
/* .x-tasks .x-box .x-box-content > * {
  margin-right: 8px;
} */
.x-tasks .x-box .x-box-suffix > * {
  margin-left: 8px;
}
.x-task {
  border-radius: 8px;
  font-weight: 300;
  margin-top: 8px;
  padding: 8px;
  display: flex;
  height: 32px;
  line-height: 32px;
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
