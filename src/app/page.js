'use client'

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TemporaryDrawer from "./components/drawer";

function DummyData() {
  const [employees, setEmployees] = useState([]);
  const [myError, setError] = useState("");
  const [editUser, setEditUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
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
      setEmployees([...employees, entry.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  // EDIT-PUT
  const handleEditing = async (id, values) => {
    try {
      const entry = await axios.put(
        ` https://jsonplaceholder.typicode.com/users/${id}`,
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
    <div className="container mt-4">
      <h1>Employee Table</h1>
      <div className="input-group mb-3">
        <TemporaryDrawer
          handleAdding={handleAdding}
          handleEditing={handleEditing}
          editUser={editUser}
          setEditUser={setEditUser}
        />
      </div>
      {myError && <div className="alert alert-danger">{myError}</div>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => setEditUser(user)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(employees.length / itemsPerPage)}
          color="secondary"
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
}

export default DummyData;