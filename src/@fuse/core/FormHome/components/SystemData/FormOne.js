import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "@fuse/hooks";
import { TextField, Button } from "@mui/material";
import MyTable from "@fuse/core/FuseTable/MyTabel"; // Import the MyTable component
const SYSTEM_DEFINITION_KEY_PREFIX = "System definition";
const FormOne = () => {
  const [Id, setId] = useState(uuidv4());
  const [newRow, setNewRow] = useState(false);

  const { form, handleChange, handleSubmit } = useForm(
    {
      systemName: "",
      systemLatinName: "",
      systemNumber: "",
      portNumber: "",
    },
    () => {
      const formData = {
        systemName: form.systemName,
        systemLatinName: form.systemLatinName,
        systemNumber: form.systemNumber,
        portNumber: form.portNumber,
      };

      localStorage.setItem(`${SYSTEM_DEFINITION_KEY_PREFIX} ${Id}`, JSON.stringify(formData));

      setId(uuidv4());

      alert("اطلاعات با موفقیت ذخیره شد و فرم پاک شد!");
      setNewRow(!newRow);
    }
  );
  const newCol = [
    { id: 'systemName', title: 'نام سامانه' },
    { id: 'systemLatinName', title: 'نام لاتین سامانه' },
    { id: 'systemNumber', title: 'شماره سامانه' },
    { id: 'portNumber', title: 'شماره پورت' }
  ];
  
  return (
    <>
      <div className="max-w-7xl bg-white shadow-4 h-auto mx-8 my-10 rounded-xl p-10">
        <div className="flex flex-row w-full items-center justify-between">
          <TextField
            className="w-1/3 mx-8"
            id="systemName"
            label="نام سامانه"
            variant="outlined"
            value={form.systemName}
            onChange={handleChange}
            name="systemName"
          />
          <TextField
            className="w-1/3 mx-8"
            id="systemLatinName"
            label="نام لاتین سامانه"
            variant="outlined"
            value={form.systemLatinName}
            onChange={handleChange}
            name="systemLatinName"
          />
          <TextField
            className="w-1/3 mx-8"
            id="systemNumber"
            label="شماره سامانه"
            variant="outlined"
            value={form.systemNumber}
            onChange={handleChange}
            name="systemNumber"
          />
          <TextField
            className="w-1/3 mx-8"
            id="portNumber"
            label="شماره پورت"
            variant="outlined"
            value={form.portNumber}
            onChange={handleChange}
            name="portNumber"
          />
        </div>

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
      <MyTable newRow={newRow} newCol={newCol} Key={SYSTEM_DEFINITION_KEY_PREFIX} />

    </>
  );
};

export default FormOne;
