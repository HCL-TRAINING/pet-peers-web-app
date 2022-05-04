import React from "react";
import { Route, Routes } from 'react-router-dom';
import AddPets from "./modules/add-pets/addPets";
import Dashboard from "./modules/dashboard/dashboard";
import Homepage from './modules/homepage/homepage';
import Login from "./modules/login/login";
import MyPets from "./modules/my-pets/myPets";
import SignUp from "./modules/signup/signup";

export default function PetRoutes() {
    return (
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/my-pets" element={<MyPets/>}></Route>
          <Route path="/add-pets" element={<AddPets/>}></Route>
          <Route path="*" element={<h1>Page Not Found</h1>} ></Route>
        </Routes>
    )
}