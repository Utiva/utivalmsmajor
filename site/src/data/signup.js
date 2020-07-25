export default [
  {
    name: "firstName",
    placeHolder: "First Name",
    errorMsg: "name should be greater than 2 letters",
    required: true,
  },
  {
    name: "lastName",
    placeHolder: "Last Name",
    errorMsg: "name should be greater than 2 letters",
    required: true,
  },
  {
    name: "phoneNumber",
    placeHolder: "Phone Number",
    errorMsg: "example +(234) xxxxxxxx",
    required: true,
  },
  {
    name: "gender",
    placeHolder: "Gender",
    errorMsg: "",
    required: true,
    itype: "select",
  },
  {
    name: "email",
    placeHolder: "Email Address",
    errorMsg: "email should be of the format johndoe@gmail.com",
    required: true,
  },
  {
    name: "occupation",
    placeHolder: "Occupation",
    errorMsg: "should be more than 2 letters",
    required: false,
  },
  {
    name: "company",
    placeHolder: "Company's Name",
    errorMsg: "should be more than 2 letters",
    required: false,
  },
  {
    name: "country",
    placeHolder: "Country",
    errorMsg: "",
    required: false,
    itype: "select",
  },
  {
    name: "region",
    placeHolder: "Region",
    errorMsg: "",
    required: false,
    itype: "select",
  },
  {
    placeHolder: "Create Password",
    name: "password",
    type: "password",
    errorMsg:
      "password should be at least 8 characters, with one Capital a symbol and a number",
  },
  {
    placeHolder: "Confirm Password",
    name: "cpassword",
    type: "password",
    errorMsg:
      "password should be at least 8 characters, with one Capital a symbol and a number",
  },
];
