import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters.")
    .required("Username is required at least 3 letters"),
  password: Yup.string()
    .min(5, "Password must be at least 3 characters.")
    .required("Password is required at least 5 letters"),
  passwordConfirm: Yup.string()
    .required("Your passwords do not match.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

export default signUpSchema;
