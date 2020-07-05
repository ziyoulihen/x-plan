<template>
  <x-modal
    v-model:visible="state.visible"
    title="Create Task"
    :showFooter="false"
  >
    <x-form @submit.prevent="handleSubmit">
      <x-form-item label="Task deadline" :required="true">
        <x-input
          autocomplete="off"
          name="task.deadline"
          placeholder="enty the deadline of task"
          v-model:value="task.deadline"
        />
      </x-form-item>
      <x-form-item label="Task title" :required="true">
        <x-input
          autocomplete="off"
          name="task.title"
          placeholder="enty the title of task"
          v-model:value="task.title"
        />
      </x-form-item>
      <x-form-item label="Task description">
        <x-textarea
          name="task.description"
          v-model:value="task.description"
          placeholder="enty the description of task"
        />
      </x-form-item>
      <x-form-item>
        <x-button type="primary" htmlType="submit">Create</x-button>
        <x-button @click="handleCancel">Cancel</x-button>
      </x-form-item>
    </x-form>
  </x-modal>
</template>

<script lang="ts">
import { reactive, toRaw } from "vue";
import Button from "../components/button.vue";
import Form from "../components/form.vue";
import FormItem from "../components/form-item.vue";
import Input from "../components/input.vue";
import Modal from "../components/modal.vue";
import Textarea from "../components/textarea.vue";
import { ITask, injectState } from "../hooks/use-state";

export default {
  name: "CreateTaskModal",
  props: ["visible"],
  components: {
    "x-button": Button,
    "x-form": Form,
    "x-form-item": FormItem,
    "x-input": Input,
    "x-modal": Modal,
    "x-textarea": Textarea,
  },
  setup(props, context) {
    const state = injectState();

    function fix(digit) {
      return digit > 9 ? digit.toString() : "0" + digit;
    }

    function today() {
      const date = new Date();
      const year = date.getFullYear();
      const month = fix(date.getMonth() + 1);
      const day = fix(date.getDate());
      return `${year}-${month}-${day}`;
    }

    const task = reactive<ITask>({
      title: null,
      description: null,
      deadline: today(),
      done: false,
    });

    function handleSubmit() {
      if (task.title && task.deadline) {
        state.tasks.push({ ...task });
        task.title = null;
        task.description = null;
        state.visible = false;
      }
    }

    function handleCancel() {
      state.visible = false;
    }

    return { state, task, handleSubmit, handleCancel };
  },
};
</script>
