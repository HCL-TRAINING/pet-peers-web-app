import React from "react";
import { Route, Routes } from 'react-router-dom';
import Homepage from './modules/homepage/homepage';

export default function PetRoutes() {
    return (
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="*" element={<h1>Page Not Found</h1>} ></Route>
        </Routes>
    )
}