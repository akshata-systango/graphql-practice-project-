import React, { Suspense } from "react";
import GetUsers from "../Component/Users";
import UserForm from "../Component/Forms/form";
import { Routes, Route } from "react-router-dom";
import Chat from "../chat/chat";
const RenderRoutes = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/users" element={<GetUsers />} />
          <Route path="/users/add-user/:id" element={<UserForm />} />
          <Route path="/users/chat" element={<Chat />} />
          </Routes>
        </Suspense>
    </div>
  );
};

export default RenderRoutes;
