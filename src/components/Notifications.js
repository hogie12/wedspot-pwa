import React from "react";
import Navbar from "./Navbar";
import TablePagination from "@material-ui/core/TablePagination";

const Notifications = () => {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      style={{
        background: "#F3F3F3",
      }}
    >
      <Navbar />
      <div
        style={{
          background: "white",
          borderTop: "solid 1px #E1E1E1",
          borderLeft: "solid 1px #E1E1E1",

          borderRight: "solid 1px #E1E1E1",

          margin: "2.9rem 2.9rem 0 2.9rem",
          height: "100vh",
          padding: "2.714rem",
        }}
      >
        <div style={{ margin: "0 0 2.12rem 0" }}>
          <h3>All Notifications</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "solid 1px #E1E1E1",
            paddingBottom: "1.14rem",
          }}
        >
          <div>
            <h4>Notification Title</h4>
            <p style={{ color: "#80848D" }}>notif description</p>
          </div>
          <div>
            <p style={{ color: "#80848D" }}>time</p>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "white",
          borderBottom: "solid 1px #E1E1E1",
          borderLeft: "solid 1px #E1E1E1",

          borderRight: "solid 1px #E1E1E1",
          margin: "0 2.9rem",
          padding: "2.714rem",
        }}
      >
        <TablePagination
          style={{
            borderTop: "solid 1px #E1E1E1",
          }}
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Notifications;
