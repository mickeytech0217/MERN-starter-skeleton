import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "@fuse/hooks";
import MyTable from "@fuse/core/FuseTable/MyTabel";
import { v4 as uuidv4 } from "uuid";
const SYSTEM_DEFINITION_KEY_PREFIX = "Definition of log";
const FormTwo = () => {
  const [newRow, setNewRow] = useState(false);
  const [Id, setId] = useState(uuidv4()); // Generate an initial UUID
  const { form, handleChange, handleSubmit } = useForm(
    {
      systemName: "",
      systemOrganization: "",
      Classification: "",
      eventType: "",
      eventSensitivity: "",
      eventDescription: "",
    },
    () => {
      const formData = {
        systemName: form.systemName,
        systemOrganization: form.systemOrganization,
        Classification: form.Classification,
        eventType: form.eventType,
        eventSensitivity: form.eventSensitivity,
        eventDescription: form.eventDescription,
      };

      localStorage.setItem(`${SYSTEM_DEFINITION_KEY_PREFIX} ${Id}`, JSON.stringify(formData));

      setId(uuidv4()); // Generate a new UUID after form submission
      
      alert("اطلاعات با موفقیت ذخیره شد و فرم پاک شد!");
      setNewRow(!newRow);
    }
  );
  const newCol = [
    { id: 'systemName', title: 'نام سامانه' },
    { id: 'systemOrganization', title: 'نام سازمان' },
    { id: 'Classification', title: 'دسته بندی' },
    { id: 'eventType', title:'نوع رویداد' },
    { id: 'eventSensitivity', title: 'حساسیت رویداد' },
    { id: 'eventDescription', title: 'توضیحات رویداد' },
  ];
  return (
    <>
      <div className="max-w-7xl bg-white shadow-4 h-auto mx-8 my-10 rounded-xl p-10 flex flex-col space-y-12">
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
            label="نام سازمان"
            variant="outlined"
            name="systemOrganization"
            value={form.systemOrganization}
            onChange={handleChange}
          />
          <TextField
            className="w-1/3 mx-8"
            id="outlined-basic"
            label="دسته بندی"
            variant="outlined"
            name="Classification"
            value={form.Classification}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row w-full items-center justify-between">
          <TextField
            className="w-1/3 mx-8"
            id="outlined-basic"
            label="نوع رویداد"
            variant="outlined"
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
          />
          <TextField
            className="w-1/3 mx-8"
            id="outlined-basic"
            label="حساسیت رویداد"
            variant="outlined"
            name="eventSensitivity"
            value={form.eventSensitivity}
            onChange={handleChange}
          />
          <TextField
            className="w-1/3 mx-8"
            id="outlined-basic"
            label="توضیحات رویداد"
            variant="outlined"
            name="eventDescription"
            value={form.eventDescription}
            onChange={handleChange}
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

export default FormTwo;
