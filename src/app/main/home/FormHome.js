import React from "react";
import FormOne from "./SystemData/FormOne";
import { useSelector } from "react-redux";
import FormTow from "./DefinitionOfLog/FormTow";
import FormThree from "./DefineAndConfirmTheAgent/FormThree";

const FormHome = () => {
    const changeForm = useSelector((state) => state.changeForm);
  return (
    <div className="rtl:pr-4" dir="rtl">
      {changeForm === "تعریف سامانه" && <FormOne />}
      {changeForm === "تعریف لاگ" && <FormTow />}
      {changeForm === "تعریف / تایید عامل" && <FormThree />}
    </div>
  );
};

export default FormHome;
