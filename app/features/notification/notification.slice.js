import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  title: '', 
  message: '', 
  status: '', 
  isOpen: false
}


export const notificationSlice = createSlice({
  name: 'notification', 
  initialState, 
  reducers: {
    openNotification: (state) => {
      state.isOpen = true; 
    }, 
    closeNotification: (state) => {
      state.isOpen = false; 
    }, 
    setNotificationSettings: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.status = action.payload.status;
    }
  }
})

export const {openNotification, closeNotification, setNotificationSettings} = notificationSlice.actions; 

export default notificationSlice.reducer; 
