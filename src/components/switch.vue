<template>
  <label :class="['x-switch', checked ? 'x-switch--checked' : '']">
    <span class="x-switch-ball"></span>
    <input type="checkbox" :checked="checked" @change="change" />
  </label>
</template>

<script lang="ts">
export default {
  name: "Switch",
  props: {
    checked: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:checked"],
  setup(props, context) {
    function change(event) {
      context.emit("update:checked", event.target.checked);
    }
    return { change };
  },
};
</script>

<style>
.x-switch {
  --box-size: 32px;
  --ball-size: 26px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: calc(var(--box-size) / 2);
  cursor: pointer;
  display: inline-block;
  height: calc(var(--box-size));
  line-height: calc(var(--box-size));
  position: relative;
  transition: all 0.2s ease-in-out;
  vertical-align: middle;
  width: calc(var(--box-size) * 1.5);
}
.x-switch.x-switch--checked {
  background: rgba(255, 255, 255, 0.3);
}
.x-switch input[type="checkbox"] {
  display: none;
}
.x-switch .x-switch-ball {
  background: #fff;
  border-radius: 50%;
  display: inline-block;
  height: var(--ball-size);
  left: calc(var(--box-size) - var(--ball-size) / 2);
  top: calc((var(--box-size) - var(--ball-size)) / 2);
  position: absolute;
  transition: all 0.2s ease-in-out;
  width: var(--ball-size);
}
.x-switch.x-switch--checked .x-switch-ball {
  left: calc((var(--box-size) - var(--ball-size)) / 2);
  /* transform: translate(calc(var(--box-size) / 2 * -1)); */
}
</style>
