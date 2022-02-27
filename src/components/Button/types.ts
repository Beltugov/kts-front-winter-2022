export interface IButton {
  isDisabled: boolean;
  onClick: (e: string | null) => void;
  inputValue: string;
}
