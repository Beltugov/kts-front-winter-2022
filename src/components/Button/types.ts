export interface IButton {
  isDisabled: boolean;
  onClick: (input: string) => Promise<void>;
  inputValue: string;
}
