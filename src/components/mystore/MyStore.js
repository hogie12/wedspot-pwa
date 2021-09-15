import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import TitleStore1 from "../title/TitleStore1";
import { MenuItem, TextField } from "@material-ui/core";
import "./MyStore.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import NoPhoto from "../../assets/NoPhotoAlbum.png";
import ButtonPhoto from "../buttons/ButtonPhoto";
import { useDispatch, useSelector } from "react-redux";
import { editVendor } from "../../store/action/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const services = [
  {
    value: "venue",
    label: "Venue",
  },
  {
    value: "organizer",
    label: "organizer",
  },
];

const MyStore = () => {
  const { data } = useSelector(
    (state) => state.vendorData
  );
  const { citys } = useSelector((state) => state.config);
  console.log(citys)

  const minCap = data.vendor_min_capacity === 0 || data.vendor_min_capacity  ? data.vendor_min_capacity : "min";
  const maxCap = data.vendor_max_capacity ? data.vendor_max_capacity : "max";
  const minPrice = data.vendor_min_price ? data.vendor_min_price : "min";
  const maxPrice = data.vendor_max_price ? data.vendor_max_price : "max";

  const [service, setservice] = useState(data.vendor_type || "");
  const [vendor_header, setVendorHeader] = useState(data.vendor_header || "");
  const [previewHeader, setPreviewHeader] = useState("");
  const [vendor_avatar, setVendorAvatar] = useState(data.vendor_avatar || "");
  const [vendor_name, setVendorName] = useState(data.vendor_name || "");
  const [vendor_email, setVendorEmail] = useState(data.vendor_email || "");
  const [vendor_phone, setVendorPhone] = useState(data.vendor_phone || "");
  const [vendor_website, setVendorWebsite] = useState(
    data.vendor_website || ""
  );
  const [vendor_facebook, setVendorFacebook] = useState(
    data.vendor_facebook || ""
  );
  const [vendor_instagram, setVendorInstagram] = useState(
    data.vendor_instagram || ""
  );
  const [vendor_twitter, setVendorTwitter] = useState(
    data.vendor_twitter || ""
  );
  const [vendor_price_range, setVendorPrice] = useState(
    `${minPrice} - ${maxPrice}` || "max - min"
  );
  const [vendor_capacity, setVendorCapacity] = useState(
    `${minCap} - ${maxCap}` || "max - min"
  );
  const [vendor_location, setVendorLocation] = useState(
    data.vendor_location || ""
  );

  const vendor_rating = Math.floor(Math.random() * 3) + 3;
  const [previewAvatar, setPreviewAvatar] = useState();
  const dispatch = useDispatch();
  const dataToSend = {
    vendor_header,
    vendor_avatar,
    vendor_name,
    vendor_email,
    vendor_phone,
    vendor_website,
    vendor_facebook,
    vendor_instagram,
    vendor_twitter,
    vendor_location,
    vendor_price_range,
    vendor_type: service,
    vendor_capacity,
    vendor_rating,
  };

  const handleChange = (event) => {
    setservice(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editVendor(dataToSend));
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

  const handleHeaderImage = (e) => {
    setVendorHeader(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewHeader(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    reader.onerror = () => {
      console.log("header error");
    };
  };

  const handleAvatarImage = (e) => {
    setVendorAvatar(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    reader.onerror = () => {};
  };

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          margin: "0.55rem 0",
        }}
      >
        <Link to="/">My Store</Link>
        <Typography color="textPrimary">add</Typography>
      </Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: "white",
            border: "solid 1px #E1E1E1",
            paddingTop: "1.7rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                margin: "1.7rem 0",
              }}
            >
              <TitleStore1
                title="Store Header"
                detail="The image must have the ratio of 1:3"
              />

              <div
                style={{
                  background: "#F3F3F3",
                  height: "22.857rem",
                }}
              >
                <div
                  style={{
                    height: "inherit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {previewHeader ? null : (
                    <img src={NoPhoto} height="70rem" alt="" />
                  )}
                  <input
                    type="file"
                    name="header-upload"
                    id="header-input"
                    accept="image/*"
                    style={{
                      display: "none",
                    }}
                    onChange={handleHeaderImage}
                  />
                  <label
                    htmlFor="header-input"
                    className="header-upload"
                    style={{ zIndex: "1" }}
                  >
                    <ButtonPhoto />
                  </label>
                  <img
                    src={previewHeader}
                    alt=""
                    style={{
                      maxWidth: "500px",
                      maxHeight: "320px",
                      position: "absolute",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                margin: "1.7rem 0",
              }}
            >
              <TitleStore1
                title="Store Avatar"
                detail="The image must have the ratio of 1:1"
              />
              <div
                style={{
                  background: "#F3F3F3",
                  height: "22.857rem",
                }}
              >
                <div
                  style={{
                    height: "inherit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {previewAvatar ? null : (
                    <img src={NoPhoto} height="70rem" alt="" />
                  )}
                  <input
                    type="file"
                    name="avatar-upload"
                    id="avatar-input"
                    accept="image/*"
                    style={{
                      display: "none",
                    }}
                    onChange={handleAvatarImage}
                  />
                  <label
                    htmlFor="avatar-input"
                    className="avatar-upload"
                    style={{ zIndex: "1" }}
                  >
                    <ButtonPhoto />
                  </label>
                  <img
                    src={previewAvatar}
                    alt=""
                    style={{
                      maxWidth: "500px",
                      maxHeight: "320px",
                      position: "absolute",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              borderBottom: "solid 1px #E1E1E1",
              paddingBottom: "3rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
            }}
          >
            <div className="textfieldmargin">
              <div
                style={{
                  margin: "1.7rem 0",
                }}
              >
                <h3>Contact Details</h3>
              </div>
              <TextField
                className="textfield"
                label="Store Name*"
                variant="outlined"
                value={vendor_name}
                onChange={(e) => setVendorName(e.target.value)}
              />
            </div>
            <div className="textfieldmargin">
              <TextField
                className="textfield"
                label="Email*"
                variant="outlined"
                value={vendor_email}
                onChange={(e) => setVendorEmail(e.target.value)}
              />
            </div>
            <div className="textfieldmargin">
              <TextField
                className="textfield "
                label="Contact Number*"
                variant="outlined"
                value={vendor_phone}
                onChange={(e) => setVendorPhone(e.target.value)}
              />
            </div>
            <div className="textfieldmargin">
              <TextField
                className="textfield"
                label="Website (optional)"
                variant="outlined"
                value={vendor_website}
                onChange={(e) => setVendorWebsite(e.target.value)}
              />
            </div>
            <div className="textfieldmargin">
              <TextField
                className="textfield"
                label="Facebook Account (optional)"
                variant="outlined"
                value={vendor_facebook}
                onChange={(e) => setVendorFacebook(e.target.value)}
              />
            </div>
            <div className="textfieldmargin">
              <TextField
                className="textfield"
                label="Instagram Account (optional)"
                variant="outlined"
                value={vendor_instagram}
                onChange={(e) => setVendorInstagram(e.target.value)}
              />
            </div>
            <div className="textfieldmargin">
              <TextField
                className="textfield"
                label="Twitter Account (optional)"
                variant="outlined"
                value={vendor_twitter}
                onChange={(e) => setVendorTwitter(e.target.value)}
              />
            </div>
            <div className="textfieldmargin">
              <div
                style={{
                  width: "500px",
                  height: "0.1rem",
                }}
              ></div>
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
            <div className="textfieldmargin">
              <div
                style={{
                  margin: "1.7rem 0",
                }}
              >
                <h3>Service Details</h3>
              </div>
              <div>
                <TextField
                  id="outlined-select-currency"
                  className="textfield"
                  select
                  label="Service Type*"
                  value={service}
                  onChange={handleChange}
                  helperText="Please select your service type"
                  variant="outlined"
                >
                  {services.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="textfieldmargin">
              <TextField
                id="outlined-select-currency"
                className="textfield"
                label="Location*"
                select
                value={vendor_location}
                onChange={(e) => setVendorLocation(e.target.value)}
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
            <div>
              <TextField
                id="outlined-helperText"
                className="textfield"
                label="Capacity*"
                variant="outlined"
                helperText="number per pax"
                defaultValue="Default Value"
                value={vendor_capacity}
                onChange={(e) => setVendorCapacity(e.target.value)}
              />
            </div>
            <div>
              <TextField
                className="textfield"
                label="Price Range*"
                variant="outlined"
                helperText="number in Rupiah"
                value={vendor_price_range}
                onChange={(e) => setVendorPrice(e.target.value)}
              />
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
                content="Submit"
                width="18.714rem"
                height="3.93rem"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyStore;
