/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NoPhoto from "../../assets/NoPhotoAlbum.png";
import { MenuItem, TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonPhoto from "../buttons/ButtonPhoto";
import CancelIcon from "@material-ui/icons/Cancel";
import { useParams, Link, Redirect } from "react-router-dom";
import {
  createPackage,
  editPackage,
  getPackageById,
} from "../../store/action/package";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPackages = () => {
  const { dataPackage } = useSelector((state) => state.packageById);
  const { isLoading, isSuccess, newData } = useSelector(
    (state) => state.createPackage
  );
  const { data } = useSelector((state) => state.vendorData);
  const { citys, venue, organizer } = useSelector((state) => state.config);
  const [service, setservice] = useState(dataPackage.package_location || "");
  const [package_album, setPackageAlbum] = useState(
    dataPackage.package_album || []
  );
  const [package_name, setPackageName] = useState(
    dataPackage.package_name || ""
  );
  const [package_price, setPackagePrice] = useState(
    dataPackage.package_price || ""
  );
  const minCap = dataPackage.package_min_capacity
    ? dataPackage.package_min_capacity
    : "min";
  const maxCap = dataPackage.package_max_capacity
    ? dataPackage.package_max_capacity
    : "max";
  const [package_capacity, setPackageCapacity] = useState(
    `${minCap} - ${maxCap}` || ""
  );
  const [package_details, setPackageDetails] = useState(
    dataPackage.package_details || ""
  );
  const [state, setState] = useState([]);
  const [album, setAlbum] = useState([]);
  const [allAlbum, setAllAlbum] = useState(dataPackage.package_album || []);
  const [oldAlbum] = useState(dataPackage.package_album || []);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setAllAlbum([...oldAlbum, ...album]);
  }, [album, oldAlbum]);

  const { id } = useParams();
  const dataToSend = {
    package_album: allAlbum,
    package_name,
    package_location: service,
    package_price,
    package_capacity,
    package_details,
    package_services: state,
    package_id: id,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPackageById(id));
  }, [dispatch, id]);

  if (success) {
    return <Redirect to={`/package/${newData.newData.package_id}`} />;
  }

  console.log(newData);
  console.log(success);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editPackage(dataToSend));
    } else {
      dispatch(createPackage(dataToSend));
    }
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
  console.log(state);
  const handleChangeCheckbox = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setState([...state, e.target.value]);
    } else {
      setState(state.filter((fil) => fil !== state[JSON.parse(e.target.name)]));
    }
  };

  const handleChange = (event) => {
    setservice(event.target.value);
  };

  const handleAlbum = (e) => {
    // function to convert image file into base64
    let file = e.target.files[0];
    let reader = new FileReader();
    let allAlbum = e.target.files;

    if (allAlbum) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPackageAlbum([...package_album, reader.result]);
        let a = [...album, file];
        setAlbum(a);
      };
    }
    reader.onerror = () => {
      console.log("error");
    };
  };
  // clear state
  // const clearImage = () => {
  //   if (package_album.length) {
  //     setPackageAlbum([]);
  //   } else {
  //     alert("gamber kosong!");
  //   }
  // };
  const clearOne = (index) => {
    if (package_album.length) {
      setPackageAlbum(
        package_album.filter((fil) => fil !== package_album[index])
      );
      setAllAlbum(allAlbum.filter((fil) => fil !== allAlbum[index]));
    } else {
      alert("gamber kosong!");
    }
  };

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          margin: "0.55rem 0",
        }}
      >
        <Link to="/">Packages</Link>
        <Typography color="textPrimary">
          {id ? <>Edit</> : <>Create Package</>}
        </Typography>
      </Breadcrumbs>
      <div
        style={{
          background: "white",
          border: "solid 1px #E1E1E1",
          // padding: "0 1.715rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.715rem 1.715rem 0 1.715rem",
            }}
          >
            <div>
              <div
                style={{
                  margin: "1.315rem 0",
                }}
              >
                <h1
                  style={{
                    fontFamily: "Cormorant",
                    fontWeight: "700",
                  }}
                >
                  Package Albums
                </h1>
                <p>The image must have the ratio of 1:2 or 1:1</p>
              </div>
            </div>
            <div>
              <input
                type="file"
                name="album-upload"
                id="album-input"
                accept="image/*"
                style={{
                  display: "none",
                }}
                onChange={handleAlbum}
              />
              <label
                htmlFor="album-input"
                className="album-upload"
                style={{ zIndex: "1" }}
              >
                {package_album.length === 0 ? (
                  <ButtonPhoto width="160px" height="55px" />
                ) : (
                  <ButtonPhoto
                    width="160px"
                    height="55px"
                    content="Add More Pictures"
                  />
                )}
              </label>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              padding: "1.715rem 3rem",
            }}
          >
            <div
              style={{
                background: "#F3F3F3",
                height: "22.375rem",
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {package_album.length === 0 ? (
                <div
                  style={{
                    height: "inherit",

                    width: "inherit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={NoPhoto} height="70rem" alt="" />
                </div>
              ) : (
                package_album.map((data, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        height: "114px",
                        width: "114px",
                        border: "1px solid #e1e1e1",
                        background: "white",
                        margin: "1.2rem 1rem",
                      }}
                    >
                      <CancelIcon
                        onClick={() => clearOne(index)}
                        style={{
                          zIndex: "1",
                          position: "absolute",
                          color: "#f66257",
                        }}
                      />
                      <div
                        style={{
                          height: "inherit",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src={data}
                          alt="mapped img"
                          style={{
                            maxHeight: "110px",
                            maxWidth: "110px",
                            position: "absolute",
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="divmargin">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <div className="textfieldmarginbottom">
                <h3 className="titlefield">Package Details</h3>
              </div>
              <div>
                <div className="textfieldempty"></div>
              </div>
              <div>
                <div className="textfieldmarginbottom">
                  <TextField
                    className="textfield"
                    label="package name*"
                    variant="outlined"
                    value={package_name}
                    onChange={(e) => setPackageName(e.target.value)}
                  />
                </div>
                <div className="textfieldmargin">
                  <TextField
                    id="outlined-select-currency"
                    className="textfield"
                    select
                    label="Location*"
                    value={service}
                    onChange={handleChange}
                    helperText="Please select your service location"
                    variant="outlined"
                  >
                    {citys.locations?.map((option, idx) => (
                      <MenuItem key={idx} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="textfieldmargin">
                  <TextField
                    id="outlined-helperText"
                    className="textfield"
                    label="Capacity*"
                    variant="outlined"
                    helperText="number per pax (ex: 10-1000)"
                    // defaultValue="Default Value"
                    value={package_capacity}
                    onChange={(e) => setPackageCapacity(e.target.value)}
                  />
                </div>
                <div className="textfieldmargin">
                  <TextField
                    className="textfield"
                    label="Price Range*"
                    variant="outlined"
                    helperText="number in Rupiah (ex: 500000000)"
                    value={package_price}
                    onChange={(e) => setPackagePrice(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="textfieldmargin">
                  <TextField
                    id="outlined-multiline-static"
                    className="textfield"
                    label="Package Detail*"
                    multiline
                    rows={18}
                    variant="outlined"
                    value={package_details}
                    onChange={(e) => setPackageDetails(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="divmargin2">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <div className="textfieldmarginbottom">
                <h3 className="titlefield">Package Details</h3>
              </div>
              <div>
                <div className="textfieldempty"></div>
              </div>
              <div className="titlefield">
                {data.vendor_type !== "organizer" ? (
                  <>
                    {venue.venueServices.map((data, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={
                          <Checkbox
                            name={idx}
                            onChange={handleChangeCheckbox}
                            Checkbox
                            color="primary"
                            value={data}
                          />
                        }
                        label={data}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {organizer.organizerServices.map((data, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={
                          <Checkbox
                            onChange={handleChangeCheckbox}
                            Checkbox
                            color="primary"
                            value={data}
                          />
                        }
                        label={data}
                      />
                    ))}
                  </>
                )}
              </div>
              <div>
                <div className="textfieldempty"></div>
              </div>
            </div>
          </div>
          <div
            style={{
              paddingBottom: "3rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: "500px",
                height: "0.1rem",
              }}
            ></div>
            <div
              style={{
                width: "500px",
                textAlign: "end",
              }}
            >
              <ButtonPrimary
                content="Save Changes"
                width="18.714rem"
                height="3.93rem"
                type="submit"
                disable={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPackages;
