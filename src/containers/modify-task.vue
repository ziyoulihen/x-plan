<template>
  <x-modal
    :visible="state.task !== null"
    title="Modify Task"
    :showFooter="false"
    @cancel="close"
  >
    <x-form @submit.prevent="close">
      <x-form-item label="Task deadline" required="true">
        <x-input
          autocomplete="off"
          name="task.deadline"
          placeholder="enty the deadline of task"
          v-model:value="state.task.deadline"
        />
      </x-form-item>
      <x-form-item label="Task title" required="true">
        <x-input
          autocomplete="off"
          name="task.title"
          placeholder="enty the title of task"
          v-model:value="state.task.title"
        />
      </x-form-item>
      <x-form-item label="Task description">
        <x-textarea
          name="task.description"
          v-model:value="state.task.description"
          placeholder="enty the description of task"
        />
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

    function close() {
      state.task = null;
    }

    return { state, close };
  },
};
</script>
