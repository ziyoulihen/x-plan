<template>
  <div class="x-input">
    <input
      type="text"
      :autocomplete="autocomplete"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="change"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "Input",
  props: ["autocomplete", "value", "name", "placeholder"],
  setup(_, context) {
    function change(event) {
      context.emit("update:value", event.target.value);
    }

    return { change };
  },
};
</script>

<style>
.x-input input {
  border: 1px solid #eee;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  outline: 0;
  padding: 8px;
  transition: all 0.2s ease-in-out;
  width: 100%;
}
.x-input input:hover,
.x-input input:focus {
  border-color: var(--primary-color, coral);
}
.x-input input::placeholder {
  color: #999;
  font-weight: 300;
}
</style>
