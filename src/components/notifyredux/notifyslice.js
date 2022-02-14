


import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const notifySlice = createSlice({
  name: 'notifies',
  initialState,
  reducers: {
    notifyAdded(state, action) {
      state.push(action.payload)
    }
  }
})

export const { notifyAdded } = notifySlice.actions;

export default notifySlice.reducer;