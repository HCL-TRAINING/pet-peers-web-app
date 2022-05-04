import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import petService from "../services/pet.service";

const initialState = [];

export const retrivePets = createAsyncThunk("pets/retrieve", async () => {
  const res = await petService.getPets();
  console.log("pet ress", res);
  return res.data;
});

export const buyPet = createAsyncThunk("pets/buy", async (id) => {
  console.log("idd", id);
  const res = await petService.buyPet(id);
  return res.data;
});

export const addPet = createAsyncThunk("pets/add", async (payload) => {
  console.log("addpay", payload);
  const res = await petService.addPet(payload);
  return res.data;
});

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [retrivePets.fulfilled]: (state, action) => {
      console.log("acc", action);
      return [...action.payload];
    },

    // @ts-ignore
    [buyPet.fulfilled]: (state, action) => {
      console.log("stateeeee", state);
      console.log("accccccc", action);
      let index = state.findIndex((pet) => pet.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },

    // @ts-ignore
    [addPet.fulfilled]: (state, action) => {
      console.log("state", state[0]);
      state.push(action.payload);
    },
  },
});

const { reducer } = petSlice;
export default reducer;
