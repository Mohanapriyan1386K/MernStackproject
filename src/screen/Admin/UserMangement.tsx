import { useEffect, useState } from "react";
import { deleteUser, getUser } from "../../Service/Service";
import type { User } from "../../Type";
import toast from "react-hot-toast";

import { Avatar, Button, Grid } from "@mui/material";
import type { Column } from "../../component/CustomTable";
import CustomTable from "../../component/CustomTable";
import PageHeader from "../../component/PageHeader";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../Redux/Slice/modalSlice";
import CustomTextField from "../../component/CustomTextField";
import CustomButton from "../../component/CustomButton";
import { UseLoader } from "../../Hooks/UseLoder";

function UserMangement() {
  const [userList, setUserList] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { startLoading, stopLoading } = UseLoader();
  const [filters, setFilters] = useState({
    name: "",
    user_name: "",
    email: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    name: "",
    user_name: "",
    email: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    getUserList();
  }, [page, size, appliedFilters]);

  const getUserList = async () => {
    startLoading();
    try {
      const payload: {
        page: number;
        limit: number;
        name?: string;
        email?: string;
        user_name?: string;
      } = {
        page: page + 1,
        limit: size,
      };

      if (appliedFilters.name.trim()) {
        payload.name = appliedFilters.name.trim();
      }
      if (appliedFilters.email.trim()) {
        payload.email = appliedFilters.email.trim();
      }
      if (appliedFilters.user_name.trim()) {
        payload.user_name = appliedFilters.user_name.trim();
      }
      const res = await getUser(payload);
      setUserList(res.data.data);
      const totalFromApi =
        res.data.total ??
        res.data.count ??
        res.data.totalCount ??
        res.data.pagination?.total ??
        res.data.data?.length ??
        0;
      setTotalCount(totalFromApi);
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      stopLoading();
    }
  };

  const handleDeleteUser = (data: User) => {
    const payload = {
      id: data._id,
    };

    deleteUser(payload.id)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          getUserList();
          dispatch(closeModal());
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleModalopen = () => {
    dispatch(
      openModal({
        modalname: "USER",
        modalprops: {
          title: "Create User",
          size: "xs",
          mode: "Add",
          onok: getUserList,
        },
      }),
    );
  };

  const handleEditModalOpen = (record: User) => {
    dispatch(
      openModal({
        modalname: "USER",
        modalprops: {
          title: "Edit User",
          size: "xs",
          onok: getUserList,
          mode: "Edit",
          data: record,
        },
      }),
    );
  };

  const handleDeleteModalOpen = (record: User) => {
    dispatch(
      openModal({
        modalname: "DELETE",
        modalprops: {
          title: "Delete User",
          data: record,
          size: "xs",
          onDelete: handleDeleteUser,
        },
      }),
    );
  };

  const handleApplyFilters = () => {
    setPage(0);
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    const cleared = { name: "", user_name: "", email: "" };
    setFilters(cleared);
    setAppliedFilters(cleared);
    setPage(0);
  };

  const columns: Column<User>[] = [
    {
      key: "profile",
      title: "Profile",
      render: (value) => <Avatar src={value} />,
    },
    {
      key: "name",
      title: "Name",
    },
    {
      key: "user_name",
      title: "Username",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "createdAt",
      title: "Created",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <>
          <Button
            size="small"
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => handleEditModalOpen(record)}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDeleteModalOpen(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="User Management"
        label1="Add User"
        handleClick={() => handleModalopen()}
      />
      <Grid container alignItems={"center"} spacing={2} sx={{ mt: 2 }}>
        <Grid width={250}>
          <CustomTextField
            name="name"
            labelname="Name"
            placeholder="Enter user name"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Grid>

        <Grid sx={{ width: 250 }}>
          <CustomTextField
            name="user_name"
            placeholder="Enter User Name"
            labelname="User Name"
            value={filters.user_name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, user_name: e.target.value }))
            }
          />
        </Grid>

        <Grid sx={{ width: 250 }}>
          <CustomTextField
            name="email"
            placeholder="Enter Email"
            labelname="Email"
            value={filters.email}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </Grid>
        <Grid>
          <CustomButton
            label="Filter"
            variant="contained"
            onClick={handleApplyFilters}
            backgroundColor="#008080"
          />
        </Grid>

        <Grid sx={{ width: 150 }}>
          <CustomButton
            label="Reset"
            variant="outlined"
            onClick={handleResetFilters}
          />
        </Grid>
      </Grid>

      <CustomTable
        columns={columns}
        data={userList}
        totalCount={totalCount}
        page={page}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={(rows) => {
          setSize(rows);
          setPage(0);
        }}
      />
    </>
  );
}

export default UserMangement;
