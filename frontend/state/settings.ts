import { action, Action, thunk, Thunk } from "https://esm.sh/easy-peasy@5.0.3";

export enum Theme {
  "default" = "default",
  "colorblind" = "colorblind",
  "saltyroger" = "saltyroger",
}

export interface ISettingsModel {
  initialize: Thunk<ISettingsModel>;

  changeTheme: Thunk<ISettingsModel, Theme>;
  changeAutoRefreshEnabled: Thunk<ISettingsModel, boolean>;
  changeHighlightFinalBlockEnabled: Thunk<ISettingsModel, boolean>;

  setTheme: Action<ISettingsModel, Theme>;
  setAutoRefreshEnabled: Action<ISettingsModel, boolean>;
  setHighlightFinalBlockEnabled: Action<ISettingsModel, boolean>;

  theme: Theme;
  autoRefreshEnabled: boolean;
  highlightFinalBlockEnabled: boolean;
}

export const settings: ISettingsModel = {
  initialize: thunk(async (actions) => {
    actions.setTheme((await (window as any).localStorage.getItem("theme")) ?? "default");
    actions.setAutoRefreshEnabled(
      JSON.parse((await (window as any).localStorage.getItem("autoRefreshEnabled")) ?? true)
    );
    actions.setHighlightFinalBlockEnabled(
      JSON.parse((await (window as any).localStorage.getItem("highlightFinalBlockEnabled")) ?? true)
    );
  }),

  changeTheme: thunk(async (actions, payload) => {
    await (window as any).localStorage.setItem("theme", payload);
    actions.setTheme(payload);
  }),

  changeAutoRefreshEnabled: thunk(async (actions, payload) => {
    await (window as any).localStorage.setItem("autoRefreshEnabled", JSON.stringify(payload));
    actions.setAutoRefreshEnabled(payload);
  }),

  changeHighlightFinalBlock: thunk(async (actions, payload) => {
    await (window as any).localStorage.setItem("highlightFinalBlockEnabled", JSON.stringify(payload));
    actions.setHighlightFinalBlockEnabled(payload);
    console.log("settings.tx: changeHighlightFinalBlock");
  }),

  setTheme: action((state, payload) => {
    state.theme = payload;
  }),

  setAutoRefreshEnabled: action((state, payload) => {
    state.autoRefreshEnabled = payload;
  }),

  setHighlightFinalBlockEnabled: action((state, payload) => {
    state.highlightFinalBlockEnabled = payload;
    console.log("settings.ts: setHighlightFinalBlockEnabled", state.highlightFinalBlockEnabled);
  }),

  theme: Theme.default,
  autoRefreshEnabled: true,
  highlightFinalBlockEnabled: true,
};

export default settings;
