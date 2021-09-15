import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Button,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import TitleStore1 from "../title/TitleStore1";
import QuotationSent from "../buttons/QuotationSent";
import QuotationNew from "../buttons/QuotationNew";
import { useDispatch, useSelector } from "react-redux";
import Vector from "./images/Vector.png";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getQuotationById,
  createQuotations,
} from "../../store/action/quotation";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  tittle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  content: {
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "16px",
    color: "#3E3E3E",
  },
  item: {
    marginBottom: "2rem",
  },
  send: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  file: {
    marginTop: "1rem",
    marginBottom: "1rem",
    color: "#C97C68",
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
  },
}));

export default function QuotationDetail() {
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isSuccess } = useSelector((state) => state.quotationsById);

  useEffect(() => {
    dispatch(getQuotationById(id));
  }, [dispatch, id]);

  if (success) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createQuotations(id, file));
    setTimeout(() => {
      if (isSuccess) {
        setSuccess(true);
      }
    }, 3000);
    toast.info("Loading", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  console.log(success)

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          margin: "0.55rem 0",
        }}
      >
        <Link
          to="/"
          style={{
            color: "black",
          }}
        >
          Quotations
        </Link>
        <Typography color="textPrimary">All</Typography>
      </Breadcrumbs>
      <div
        style={{
          background: "white",
          border: "solid 1px #E1E1E1",
          // padding: "1.7rem",
        }}
      >
        <Container>
          <div className={classes.tittle}>
            <TitleStore1 title="Request Details" detail="" />
            <div>
              {data.request_status ? <QuotationSent /> : <QuotationNew />}
            </div>
          </div>
          <hr></hr>
          <div className={classes.content}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div>
                  <h3>Prospect Detail</h3>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <h3>Enquiry Detail</h3>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.item}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className={classes.text}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <p>Bride to be</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>{data.request_bride_name}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>Groom to be</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>{data.request_groom_name}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>City Live</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>{data.request_city}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>Email</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>(Email)</p>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.text}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <p>Wedding Location</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>{data.request_wedding_location}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>Wedding Date</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>
                        {moment(data.request_wedding_date).format("DD/MM/YYYY")}
                      </p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>Budget</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>Rp. {data.request_budget}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>Number Of Invitees</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>{data.request_invitees} pax</p>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>

          {data.request_status ? (
            <></>
          ) : (
            <>
              <hr></hr>
              <div className={classes.send}>
                <TitleStore1
                  title="Upload Quotation"
                  detail="Acceptable file type is only PDF. Max file size 10 MB."
                />
                {file && (
                  <div className={classes.file}>
                    <img src={Vector} alt="pdf" />
                    <Typography style={{ marginLeft: "10px" }}>
                      {file?.name || "select an File"}
                    </Typography>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className={classes.buttons}>
                    <div>
                      <input
                        name="userfile"
                        type="file"
                        accept="application/pdf"
                        id="contained-button-file"
                        onChange={(e) => setFile(e.target.files[0])}
                        max-size="10000000"
                        style={{
                          display: "none",
                        }}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          type="submit"
                          variant="contained"
                          color="white"
                          component="span"
                          className={classes.btn}
                          style={{
                            height: "45px",
                          }}
                        >
                          {file ? "Change File" : "Upload File"}
                        </Button>
                      </label>
                    </div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!file}
                      style={{
                        height: "45px",
                      }}
                    >
                      Send Quotation
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}
