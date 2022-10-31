import * as Yup from "yup";

const threadSchema = Yup.object().shape({
  userId: Yup.string().required("Participant is required"),
  threadName: Yup.string().required("Thread's name is required"),
});

export default threadSchema;
