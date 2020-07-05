<template>
  <button
    :class="{
      'x-button': true,
      'x-button--text': type === 'text',
      'x-button--primary': type === 'primary',
      'x-button--circle': type === 'circle',
    }"
    :type="htmlType"
  >
    <slot name="default"></slot>
  </button>
</template>

<script lang="ts">
import { oneOf } from "../utils/helper";

export default {
  name: "Button",
  props: {
    type: {
      default: "text",
      validator: oneOf(["primary", "circle", "text"]),
    },
    htmlType: {
      default: "button",
      validator: oneOf(["submit", "button", "reset"]),
    },
  },
};
</script>

<style>
.x-button {
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: var(--normal-size, 32px);
  line-height: var(--normal-size, 32px);
  overflow: hidden;
  outline: 0;
  padding: 0 24px;
  text-align: center;
  transition: all 0.2s ease-in-out;
}

.x-button--text {
  background: transparent;
  color: #666;
}
.x-button--text:active {
  color: var(--primary-color, coral);
}
.x-button.x-button--primary {
  background: var(--primary-color, coral);
  color: #fff;
}
.x-button.x-button--circle {
  background: var(--primary-color, coral);
  border-radius: 50%;
  color: #fff;
  height: var(--normal-size, 32px);
  line-height: var(--normal-size, 32px);
  padding: 0;
  width: var(--normal-size, 32px);
}
.x-button.x-button--primary:active,
.x-button.x-button--circle:active {
  background: var(--primary-color--active, chocolate);
}
</style>
