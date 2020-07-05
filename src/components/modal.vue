<template>
  <teleport to="#teleports">
    <div
      v-if="visible"
      class="x-modal-mask"
      ref="maskRef"
      tabindex="1"
      @click="close"
      @keyup.esc="cancel"
    >
      <div class="x-modal">
        <div class="x-modal-header">
          <slot name="header">{{ title }}</slot>
        </div>
        <div class="x-modal-content">
          <slot name="default"></slot>
        </div>
        <div class="x-modal-footer" v-if="showFooter">
          <slot v-if="$slots.footer" name="footer"></slot>
          <x-button v-if="!$slots.footer" type="primary" @click="ok">
            {{ okText }}
          </x-button>
          <x-button v-if="!$slots.footer" @click="cancel">
            {{ cancelText }}
          </x-button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import Button from "./button.vue";
import { ref, watchEffect } from "vue";

const noop = () => {};

export default {
  name: "Modal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 800,
    },
    title: {
      type: String,
    },
    okText: {
      type: String,
      default: "OK",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["ok", "cancel", "update:visible"],
  components: {
    "x-button": Button,
  },
  setup(props, context) {
    function ok() {
      context.emit("ok");
      context.emit("update:visible", false);
    }

    function cancel() {
      context.emit("cancel");
      context.emit("update:visible", false);
    }

    const maskRef = ref(null);

    function close(event) {
      if (!props.maskClosable) return void 0;
      if (maskRef.value === event.target) {
        cancel();
      }
    }

    function keyup(event) {
      if (event.keyCode === 27) {
        cancel();
      }
    }

    watchEffect(() => {
      if (props.visible) {
        maskRef.value.focus();
      }
    });

    return {
      ok,
      cancel,
      maskRef,
      close,
    };
  },
};
</script>

<style>
.x-modal-mask {
  background: rgba(0, 0, 0, 0.5);
  font-weight: 300;
  height: 100%;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 9;
}
.x-modal {
  background: #fff;
  border-radius: 4px;
  box-shadow: 4px 4px 8px -2px rgba(0, 0, 0, 0.2);
  margin: 80px auto;
  max-height: 80%;
  overflow: hidden;
  padding: 0 16px;
  width: 454px;
}
.x-modal-header {
  border-bottom: 1px solid #eee;
  font-size: 18px;
  height: 36px;
  line-height: 36px;
}
.x-modal-content {
  font-size: 14px;
  padding: 8px 0;
  min-height: 200px;
  max-height: 454px;
}
.x-modal-footer {
  height: 48px;
  line-height: 48px;
  text-align: center;
}
.x-modal-footer .x-button {
  min-width: 80px;
}
.x-modal-footer .x-button:not(:last-child) {
  margin-right: 10px;
}
</style>
