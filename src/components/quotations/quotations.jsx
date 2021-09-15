import React, { useState, useEffect } from "react";
import {
  Typography,
  Breadcrumbs,
  makeStyles,
  TextField,
  InputAdornment,
  Container,
  Grid,
  TablePagination,
  CircularProgress
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import TitleStore1 from "../title/TitleStore1";
import QuotationSent from "../buttons/QuotationSent";
import QuotationNew from "../buttons/QuotationNew";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sort, Filter } from "../dropdown/dropdown";
import NoresultPhone from "../noResult/NoresultPhone";
import { getQuotations } from "../../store/action/quotation";
import moment from "moment";

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
  noResult: {
    padding: "5rem",
  },
}));

export default function Quotations() {
  const classes = useStyles();
  const { data, isError, isLoading } = useSelector((state) => state.quotationsList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(getQuotations(page + 1, rowsPerPage, sort, filter));
  }, [dispatch, page, rowsPerPage, sort, filter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          margin: "0.55rem 0",
        }}
      >
        <p>Quotations</p>
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
          <TitleStore1 title="All Quotations" detail="" />
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
          <>
            <div className={classes.noResult}>
              <NoresultPhone
                title={"No Quotations"}
                description={
                  "You will get the latest quotation requests by prospects here"
                }
              />
            </div>
          </>
        ) : (
          <>
            <Container>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <div className={classes.title}>
                    <p>Created Date</p>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.title}>
                    <p>Name</p>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.title}>
                    <p>Status Request</p>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <hr></hr>
                </Grid>
              </Grid>
              {data?.data?.map((data, idx) => (
                <>
                  <Link
                    to={`/quotation/${data.request_id}`}
                    style={{
                      color: "black",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <div>
                          <p>
                            {moment(data.created_at).format("ddd, DD MMM YYYY")}
                          </p>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className={classes.name}>
                          <p>{data.request_groom_name}</p>
                          <p>{data.request_bride_name}</p>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        {data.request_status ? (
                          <>
                            <QuotationSent />
                          </>
                        ) : (
                          <>
                            <QuotationNew />
                          </>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <hr></hr>
                      </Grid>
                    </Grid>
                  </Link>
                </>
              ))}
            </Container>
            <TablePagination
              component="div"
              count={data?.count}
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
  );
}
