import * as Yup from "yup";

const messageSchema = Yup.object().shape({
  content: Yup.string().required("Add your message"),
});

export default messageSchema;
