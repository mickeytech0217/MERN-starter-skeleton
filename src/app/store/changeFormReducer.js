
// ایمپورت اکشن‌های مورد نیاز
import { createSlice } from '@reduxjs/toolkit';

// استفاده از createSlice برای ایجاد reducer
const changeFormSlice = createSlice({
  name: 'changeForm',
  initialState: 'تعریف سامانه',
  reducers: {
    setChangeForm: (state, action) => {
      // تنظیم مقدار changeForm برابر با مقدار payload اکشن
      return action.payload;
    },
  },
});

// اکشن‌های این reducer را ایمپورت کنید
export const { setChangeForm } = changeFormSlice.actions;

// reducer را برای استفاده در rootReducer و export کردن آن
export default changeFormSlice.reducer;
