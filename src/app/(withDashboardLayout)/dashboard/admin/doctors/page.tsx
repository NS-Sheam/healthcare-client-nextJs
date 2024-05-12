"use client";

import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import DoctorModal from "./components/DoctorModal";
import { useDeleteDoctorMutation, useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "sonner";
import Link from "next/link";
const DoctorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteDoctor] = useDeleteDoctorMutation();

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query.searchTerm = debouncedTerm;
  }

  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });

  const doctors = data?.doctors;
  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();

      if (res?.id) {
        toast.success("Doctor deleted successfully");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "apointmentFee", headerName: "Appointment Fee", flex: 1 },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={() => setIsModalOpen(true)}>Create Doctor</Button>
        <DoctorModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />

        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Doctor"
        />
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={doctors}
            columns={columns}
          />
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </Box>
  );
};

export default DoctorPage;
