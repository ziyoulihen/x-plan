<template>
  <div :class="['x-form-item', required ? 'x-form-item--required' : '']">
    <div class="x-form-item-label">
      {{ label }}
    </div>
    <div class="x-form-item-content">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "FormItem",
  props: ["label", "required"],
  setup(props) {
    console.log(props);
  },
};
</script>

<style>
.x-form-item {
  display: flex;
}
.x-form-item:not(:last-child) {
  margin-bottom: 8px;
}
.x-form-item.x-form-item--required .x-form-item-label::before {
  color: red;
  content: "*";
  padding: 4px;
}
.x-form-item-label {
  flex: 4;
  text-align: right;
  padding-right: 16px;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-form-item-content {
  flex: 8;
}
</style>
