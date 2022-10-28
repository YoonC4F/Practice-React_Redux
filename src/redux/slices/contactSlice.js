import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    name:"",
    email:"",
    phone:"",
    program:0,
    message:"",
    agree:false
  },
  reducers: {
    addContact: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.program = action.payload.program;
      state.message = action.payload.message;
      state.agree = action.payload.agree;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addContact } = contactSlice.actions;

export default contactSlice.reducer;
