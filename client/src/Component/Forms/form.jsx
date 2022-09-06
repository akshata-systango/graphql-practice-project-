import React from "react";
import { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import { useMutation, useSubscription } from "@apollo/client";
import {
  CREATE_USER_MUTATION,
  EDIT_USER_MUTATION,
} from "../../Graphql/Mutations";
import { NEW_USER_ADDED_SUBSCRIPTION } from "../../Graphql/Subscriptions";

import "./form.css";
import { useLocation } from "react-router-dom";
const UserForm = () => {
  const [userDetail, setUserDetails] = useState({
    id: "",
    firstname: "",
    lastname: "",
    age: "",
    email: "",
  });
  const param = useLocation();
  // console.log(param, "param");
  const [detailSubmitted, setDetailSubmitted] = useState(null);
  // const [subData, setSubData] = useState('')

  const [addUser, { error, reset }] = useMutation(CREATE_USER_MUTATION);
  const [editUser] = useMutation(EDIT_USER_MUTATION);

  // const NewUserAddedNotification = () => {
  //   const { data, error, loading } = useSubscription(
  //     NEW_USER_ADDED_SUBSCRIPTION,
  //     {
  //       variables: { id: userDetail.id, title: "New user added" },
  //     }
  //   );
  //   setSubData(data)
  //   if (loading) {
  //     <p>loading...</p>;
  //   }
  //   if (error) {
  //     <p>{error.message}</p>;
  //   }
  // };
  const createUserHandler = (event) => {
    event.preventDefault();
    console.log(userDetail, "userDetail");
    if (param.key !== "default") {
      editUser({
        variables: {
          id: userDetail.id,
          firstname: userDetail.firstname,
          lastname: userDetail.lastname,
          age: parseInt(userDetail.age),
          email: userDetail.email,
        },
        // pollInterval: 500,
      });
    } else {
      addUser({
        variables: {
          id: userDetail.id,
          firstname: userDetail.firstname,
          lastname: userDetail.lastname,
          age: parseInt(userDetail.age),
          email: userDetail.email,
        },
        // pollInterval: 500,
      });
    }
    if (error) {
      <Alert severity="error">{error.message}</Alert>;
    }
    if (
      userDetail.id &&
      userDetail.firstname &&
      userDetail.lastname &&
      userDetail.age &&
      userDetail.email !== ""
    ) {
      setDetailSubmitted(true);
      setUserDetails({
        id: "",
        firstname: "",
        lastname: "",
        age: "",
        email: "",
      });
    } else {
      setDetailSubmitted(false);
    }
  };

  const cancelEnteriesHandler = () => {
    // reset();
    console.log("here");
    setUserDetails({
      id: "",
      firstname: "",
      lastname: "",
      age: "",
      email: "",
    });
  };
  const inputChangeHandler = (event) => {
    console.log(event, "event");
    let values = event.target.value;

    const names = event.target.name;
    console.log(names, values, "event");
    setUserDetails((value) => ({ ...value, [names]: values }));
  };

  return (
    <div>
      <Box
        sx={{
          height: 300,
          width: 500,
          p: 5,
          border: "1px solid #1976d2",
          marginLeft: 45,
        }}
      >
        {detailSubmitted && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>Details Submitted!!</strong>
          </Alert>
        )}
        {detailSubmitted === false && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
          </Alert>
        )}
        <div className="user-detail-form">
          {" "}
          <TextField
            id="standard-basic"
            variant="standard"
            label="EmployeeId"
            name="id"
            value={param?.state?.row ? param?.state?.row.id : userDetail.id}
            onChange={inputChangeHandler}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            label="Firstname"
            name="firstname"
            value={
              param?.state?.row
                ? param?.state?.row.firstname
                : userDetail.firstname
            }
            onChange={inputChangeHandler}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            label="Lastname"
            name="lastname"
            value={
              param?.state?.row
                ? param?.state?.row.lastname
                : userDetail.lastname
            }
            onChange={inputChangeHandler}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            name="age"
            label="Age"
            value={param?.state?.row ? param?.state?.row.age : userDetail.age}
            onChange={inputChangeHandler}
          />
          <TextField
            type={"email"}
            id="standard-basic"
            variant="standard"
            label="Email"
            name="email"
            value={
              param?.state?.row ? param?.state?.row.email : userDetail.email
            }
            onChange={inputChangeHandler}
          />
        </div>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          marginTop="20px"
        >
          <Button
            variant="contained"
            type="reset"
            onClick={cancelEnteriesHandler}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={createUserHandler}>
            {param.key !== "default" ? param.state.name : "Create User"}
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default UserForm;
