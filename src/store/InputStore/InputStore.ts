import { ILocalStore } from "@store/rootStore/hooks/UseLocalStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_input";

export default class InputStore implements ILocalStore {
  private _input: string = "";

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _input: observable,
      input: computed,
      setInput: action,
    });
  }

  get input(): string {
    return this._input;
  }

  setInput(value: string): void {
    this._input = value;
  }

  destroy() {}
}
