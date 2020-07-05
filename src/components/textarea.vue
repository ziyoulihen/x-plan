<template>
  <div class="x-textarea">
    <textarea
      :autocomplete="autocomplete"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="change"
    ></textarea>
  </div>
</template>

<script lang="ts">
export default {
  name: "Textare",
  props: ["autocomplete", "name", "placeholder", "value"],
  setup(_, context) {
    function change(event) {
      context.emit("update:value", event.target.value);
    }
    return { change };
  },
};
</script>

<style>
.x-textarea textarea {
  border: 1px solid #eee;
  border-radius: 2px;
  box-sizing: border-box;
  min-height: 72px;
  outline: 0;
  padding: 8px;
  transition: all 0.2s ease-in-out;
  width: 100%;
}
.x-textarea textarea:hover,
.x-textarea textarea:focus {
  border-color: var(--primary-color, coral);
}
.x-textarea textarea::placeholder {
  color: #999;
  font-weight: 300;
}
</style>
