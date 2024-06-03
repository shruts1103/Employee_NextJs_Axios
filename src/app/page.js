


//PAGE.JS

'use client'

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import "bootstrap/dist/css/bootstrap.min.css";
import TemporaryDrawer from "./components/drawer";
import { DataGrid } from '@mui/x-data-grid';

import "./styles.css";


function DummyData() {
  const [employees, setEmployees] = useState([]);
  const [myError, setError] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setEmployees(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setEmployees(employees.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // ADD-POST
  const handleAdding = async (values) => {
    try {
      const entry = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name: values.name,
          username: values.username,
          email: values.email,
        }
      );
      setEmployees([entry.data, ...employees]);
    } catch (error) {
      setError(error.message);
    }
  };

  // EDIT-PUT
  const handleEditing = async (id, values) => {
    try {
      const entry = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        values
      );
      setEmployees(
        employees.map((user) =>
          user.id === id ? { ...user, ...entry.data } : user
        )
      );
      setEditUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-4" >
      {/* style={{ backgroundColor: '#e0e0e0' }} */}
      <h1>Employee Table</h1>
      <div className="input-group mb-3">
        <Button
          variant="contained" color="success"
          onClick={() => {
            setOpen(true);
            setEditUser(null); // Clear editUser for adding new user
          }}
        >
          Add
        </Button>
        <TemporaryDrawer
          handleAdding={handleAdding}
          handleEditing={handleEditing}
          editUser={editUser}
          setEditUser={setEditUser}
          open={open}
          setOpen={setOpen}
        />
      </div>
      {myError && <div className="alert alert-danger">{myError}</div>}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={[
            { field: 'id', headerName: 'ID', width: 50 },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'username', headerName: 'Username', width: 150 },
            { field: 'email', headerName: 'Email', width: 250 },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 200,
              renderCell: (params) => (
                <>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => {
                      setEditUser(params.row);
                      setOpen(true);
                    }}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(params.row.id)}
                  >
                    Delete
                  </Button>
                </>
              ),
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          pageSize={[3]}
          checkboxSelection
          disableSelectionOnClick
          pagination
          paginationMode="client"
          rowCount={employees.length}
          onPageChange={handleChangePage} // Pass handleChangePage directly

        />
      </Box>

    </div>
  );
}

export default DummyData;


