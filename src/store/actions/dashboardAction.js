import axios from "../../utils/axios";

export const getSummaryDashboard = () => async (dispatch) => {
  try {
    const response = await axios.get(`summary-dashboard`);
    return response;
  } catch (errors) {
    return errors;
  }
}