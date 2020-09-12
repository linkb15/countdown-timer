/* --- STATE --- */
export interface CountdownState {
  paused: Boolean;
  initial: number;
  count: number | null;
}

export type ContainerState = CountdownState;
