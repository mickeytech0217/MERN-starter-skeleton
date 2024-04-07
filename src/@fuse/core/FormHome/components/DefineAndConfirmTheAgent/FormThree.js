import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "@fuse/hooks";
import MyTable from "@fuse/core/FuseTable/MyTabel";
const Define_and_confirm_the_agent_KEY_PREFIX = "Define and confirm the agent";
const FormThree = () => {
  const [newRow,setNewRow] = useState(false);
  const [Id, setId] = useState(uuidv4());
  const { form, handleChange, handleSubmit} = useForm(
    {
      systemName: "",
      systemLatinName: "",
      systemNumber: "",
      systemAgentAddress: "",
      systemAgentPort: "",
      mainSystemAddress: "",
      mainSystemPort:"",
    },
    () => {
      // کدی که باید انجام شود هنگام ارسال فرم
      const formData = {
        systemName: form.systemName,
        systemLatinName: form.systemLatinName,
        systemNumber: form.systemNumber,
        systemAgentAddress: form.systemAgentAddress,
        systemAgentPort: form.systemAgentPort,
        mainSystemAddress: form.mainSystemAddress,
        mainSystemPort: form.mainSystemPort,

      };

      // ذخیره اطلاعات فرم در localStorage
      localStorage.setItem(`${Define_and_confirm_the_agent_KEY_PREFIX} ${Id}`, JSON.stringify(formData));
      setId(uuidv4());
      // اعلان موفقیت ذخیره‌سازی
      alert("اطلاعات با موفقیت ذخیره شد و فرم پاک شد!");
      setNewRow(!newRow);
    }
  );
  const newCol = [
    { id: 'systemName', title: 'نام سامانه' },
    { id: 'systemLatinName', title: 'نام لاتین سامانه' },
    { id: 'systemNumber', title: 'شماره سامانه' },
    { id: 'systemAgentAddress', title: 'آدرس سامانه عامل' },
    { id: 'systemAgentPort', title: 'پورت سامانه عامل' },
    { id: 'mainSystemAddress', title: 'آدرس سامانه اصلی' },
    { id: 'mainSystemPort', title: 'پورت سامانه اصلی' },
  ];
  return (
    <>
     <div className="max-w-7xl bg-white shadow-4 h-auto mx-8 my-10 rounded-xl p-10 flex flex-col space-y-4">
      <div className="flex flex-row w-full items-center justify-between">
        <TextField
          className="w-1/3 mx-8 text-right"
          id="outlined-basic"
          label="نام سامانه"
          variant="outlined"
          name="systemName"
          value={form.systemName}
          onChange={handleChange}
        />
        <TextField
          className="w-1/3 mx-8"
          id="outlined-basic"
          label="نام لاتین سامانه"
          variant="outlined"
          name="systemLatinName"
          value={form.systemLatinName}
          onChange={handleChange}
        />
        <TextField
          className="w-1/3 mx-8"
          id="outlined-basic"
          label="شماره سامانه"
          variant="outlined"
          name="systemNumber"
          value={form.systemNumber}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-row w-full items-center justify-between">
        <TextField
          className="w-1/3 mx-8"
          id="outlined-basic"
          label="آدرس سامانه عامل"
          variant="outlined"
          name="systemAgentAddress"
          value={form.systemAgentAddress}
          onChange={handleChange}
        />
        <TextField
          className="w-1/3 mx-8"
          id="outlined-basic"
          label="پورت سامانه عامل"
          variant="outlined"
          name="systemAgentPort"
          value={form.systemAgentPort}
          onChange={handleChange}
        />
        <TextField
          className="w-1/3 mx-8"
          id="outlined-basic"
          label="آدرس سامانه اصلی"
          variant="outlined"
          name="mainSystemAddress"
          value={form.mainSystemAddress}
          onChange={handleChange}
        />
      </div>
      {/* <div className="flex flex-row w-full items-center justify-between"> */}
        <TextField
          className="w-1/3 mx-8 mt-8"
          id="outlined-basic"
          label="پورت سامانه اصلی"
          variant="outlined"
          name="mainSystemPort"
          value={form.mainSystemPort}
          onChange={handleChange}
        />
      {/* </div> */}

      <div className="flex justify-end">
        <Button
          variant="contained"
          className="bg-blue-500 text-white px-36 py-6 my-4 rounded-xl"
          onClick={handleSubmit}
        >
          ذخیره
        </Button>
      </div>
    </div>
    <MyTable newRow={newRow} newCol={newCol} Key={Define_and_confirm_the_agent_KEY_PREFIX} />
    </>
   
  );
};

export default FormThree;
