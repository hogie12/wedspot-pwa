/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  Typography,
  Container,
  Grid,
  TextField,
  InputAdornment,
  makeStyles,
  Button,
  TablePagination,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { MoreVert, Search } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Sort, Filter } from "../dropdown/dropdown";
import { getPackage } from "../../store/action/package";
import moment from "moment";
import NoresultPhone from "../noResult/NoresultPhone";

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    alignItems: "center",
  },
  items: {
    fontSize: "1.3rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  title: {
    fontSize: "14px",
    color: "#898B8F",
  },
  name: {
    textDecoration: "underline",
    color: "#C97C68",
    fontSize: "14px",
    fontWeight: "bold",
  },
  newpackage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
}));

export default function PackageList() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useSelector(
    (state) => state.packageList
  );

  useEffect(() => {
    dispatch(getPackage(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <div>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{
            margin: "0.55rem 0",
          }}
        >
          <p>Packages</p>
          <Typography color="textPrimary">All</Typography>
        </Breadcrumbs>
        <div
          style={{
            background: "white",
            border: "solid 1px #E1E1E1",
            // padding: "1.7rem",
          }}
        >
          <div
            style={{
              display: "flex",
              margin: "1.7rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className={classes.newpackage}>
              <div>
                <h3>All Package</h3>
              </div>
              <Link to="/new/package">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    height: "35px",
                    marginLeft: "1rem",
                  }}
                >
                  + New Package
                </Button>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Sort change={setSort} />
              <Filter change={setFilter} />

              <div className={classes.search}>
                <TextField
                  placeholder="search"
                  variant="outlined"
                  value=""
                  name="keyword"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  // onChange={(e) => changeForm(e)}
                  style={{ width: "18rem", marginRight: "2.5rem" }}
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <>
              <div
                style={{ width: "100%", display:"flex", alignItems: "center", justifyContent:"center", height:"20vw" }}
              >
                <CircularProgress 
                 size={100}
                color="secondary" />
              </div>
            </>
          ) : (
            <>
              {isError ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    margin: "3rem 0",
                  }}
                >
                  <div className={classes.noResult}>
                    <NoresultPhone
                      title={"No Package"}
                      description={"Try to add new package, maybe?"}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        margin: "2rem 0",
                      }}
                    >
                      <Link to="/new/package">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{
                            height: "35px",
                            marginLeft: "1rem",
                            width: "20rem",
                          }}
                        >
                          + New Package
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Container>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <div className={classes.title}>
                          <p>Created Date</p>
                        </div>
                      </Grid>
                      <Grid item xs={9}>
                        <div className={classes.title}>
                          <p>Package Name</p>
                        </div>
                      </Grid>
                    </Grid>
                    <hr></hr>

                    {/* Content */}
                    {data?.data?.map((data, idx) => (
                      <Link
                        to={`/package/${data.package_id}`}
                        style={{
                          color: "black",
                        }}
                      >
                        <Grid container spacing={1} key={idx}>
                          <Grid item xs={3}>
                            <div>
                              <p>
                                {moment(data.created_at).format(
                                  "dddd, DD MMM YYYY"
                                )}
                              </p>
                            </div>
                          </Grid>
                          <Grid item xs={8}>
                            <div className={classes.name}>
                              <p>{data.package_name}</p>
                            </div>
                          </Grid>
                          <Grid item xs={1}>
                            <div>
                              <MoreVert />
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <hr></hr>
                          </Grid>
                        </Grid>
                      </Link>
                    ))}
                  </Container>
                  <TablePagination
                    component="div"
                    count={data.count}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
