import { useQuery, NetworkStatus, useMutation, gql } from "@apollo/client";
import { LOAD_USERS } from "../../Graphql/Queries";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "../../Utils/Table/Table";
import { UserColumns } from "../../constants/constants";
import { Box } from "@mui/material";
const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const { error, loading, data } = useQuery(LOAD_USERS
  , {
  variables : {
    offset: 0,
    limit: 10
  },
  // pollInterval: 500,
  });
  useEffect(() => {
    console.log(data?.users, "data", loading, error);
    setUsers(data?.users);
  }, [data]);
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>
  return (
    <Box
      sx={{
        height: "auto",
        width: "auto",
        border: "1px solid #1976d2",
      }}
    >
      <p>Employee details</p>
      <div>
        <StickyHeadTable rows={users} columns={UserColumns} />
      </div>
    </Box>
  );
};

export default GetUsers;
