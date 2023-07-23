// export const globalToasterError = (error: any) => {
//   console.log('error?.response?.message', error);
//   toast.error(
//     typeof error?.response?.data?.message === 'string' || Array.isArray(error?.response?.data?.message)
//       ? get(
//           error,
//           'response.data.message',
//           typeof error?.response?.data?.error === 'string'
//             ? error.response.data.error
//             : error?.message || 'Unhandled Error',
//         )
//       : 'Unhandled Error',
//   );
// };
import toast from "react-hot-toast";
import {get} from "lodash";

export const globalError = (error) => {
  toast.error(
    typeof error?.response?.data?.message === 'string' || Array.isArray(error?.response?.data?.message)
      ? get(
          error,
          'response.data.message',
          typeof error?.response?.data?.error === 'string'
            ? error.response.data.error
            : error?.message || 'Unhandled Error',
        )
      : 'Unhandled Error',
  )
}