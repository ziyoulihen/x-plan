import { provide, inject, reactive, onMounted, watchEffect } from "vue";

export type ITask = {
  title: string;
  description: string;
  deadline: string;
  done: boolean;
};

export type IMenuItem = {
  key: string;
  icon: string;
  title: string;
};

export type IState = {
  menus: Array<IMenuItem>;
  task: ITask;
  tasks: Array<ITask>;
  showDone: Boolean;
  visible: boolean;
};

export function provideState(): IState {
  const state = reactive<IState>({
    menus: [
      {
        key: "scheduler",
        icon: "scheduler",
        title: "Scheduler",
      },
    ],
    task: null,
    tasks: [],
    showDone: false,
    visible: false,
  });

  provide("state", state);

  onMounted(function () {
    let storage = localStorage.getItem("tasks");
    if (storage) {
      state.tasks = JSON.parse(storage);
    }

    watchEffect(function () {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    });
  });

  return state;
}

export function injectState(): IState {
  const state = inject<IState>("state");
  return state;
}
