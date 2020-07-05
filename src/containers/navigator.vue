<template>
  <x-menu :dataSource="state.menus"></x-menu>
</template>

<script lang="ts">
import { injectState } from "../hooks/use-state";
import Button from "../components/button.vue";
import Menu from "../components/menu.vue";
import { read } from "fs";

export default {
  name: "Navigator",
  components: {
    "x-button": Button,
    "x-menu": Menu,
  },
  setup() {
    const state = injectState();
    return { state };
  },
};
</script>
