import { SpeedControlState } from 'app/containers/SpeedControl/types';
import { CountdownState } from 'app/containers/Countdown/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  speedControl?: SpeedControlState;
  countdown?: CountdownState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
