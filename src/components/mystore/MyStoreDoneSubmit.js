import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Avatar } from "@material-ui/core";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import ButtonSecondary from "../buttons/ButtonSecondary";
import "./MyStore.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useSelector } from "react-redux";

const MyStoreDoneSubmit = () => {
  const { data } = useSelector((state) => state.vendorData);

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          margin: "0.55rem 0",
        }}
      >
        {/* <FirstModal show={!data.vendor_has_filled_info}/> */}
        <Link to="/">My Store</Link>
        <Typography color="textPrimary">detail</Typography>
      </Breadcrumbs>
      <div
        style={{
          background: "white",
          border: "solid 1px #E1E1E1",
          padding: "0 1.715rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "solid 1px #E1E1E1",
            padding: "1.715rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={data.vendor_avatar}
              style={{
                width: "7.86rem",
                height: "7.86rem",
              }}
            />
            <div
              style={{
                margin: "1.715rem",
              }}
            >
              <h1
                style={{
                  fontFamily: "Cormorant",
                  fontWeight: "700",
                }}
              >
                {data.vendor_name}
              </h1>
            </div>
          </div>
          <div>
            <Link to="/edit">
              <ButtonSecondary content="Edit" width="160px" height="55px" />
            </Link>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "1.715rem 0",

            borderBottom: "solid 1px #E1E1E1",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${data.vendor_header})`,
              height: "22.375rem",
              backgroundSize: "cover",
            }}
          ></div>
          <h3 style={{ margin: "2.2rem 0 1.714rem 0" }}>Contact Details</h3>
          <div className="divDetails">
            <h3 className="details">Contact Number</h3>
            <h3 className="details">{data.vendor_phone}</h3>
          </div>
          <div className="divDetails">
            <h3 className="details">Email</h3>
            <h3 className="details">{data.vendor_email}</h3>
          </div>
          <div className="divDetails">
            <h3 className="details">Website</h3>
            <h3 className="details">{data.vendor_website}</h3>
          </div>
          <div className="divDetails">
            <h3 className="details"> </h3>
            <div className="logoDetails">
              <div className="icon">
                <a
                  href={data.vendor_facebook}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#C97C68" }}
                >
                  <FacebookIcon />
                </a>
              </div>
              <div className="icon">
                <a
                  href={data.vendor_instagram}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#C97C68" }}
                >
                  <InstagramIcon />
                </a>
              </div>
              <div className="icon">
                <a
                  href={data.vendor_twitter}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#C97C68" }}
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ margin: "2.2rem 0 1.714rem 0" }}>Contact Details</h3>
          <div className="divDetails">
            <h3 className="details">Service Type</h3>
            <h3 className="details">{data.vendor_type}</h3>
          </div>
          <div className="divDetails">
            <h3 className="details">Location</h3>
            <h3 className="details">{data.vendor_location}</h3>
          </div>
          <div className="divDetails">
            <h3 className="details">Capacity</h3>
            <h3 className="details">
              {data.vendor_min_capacity} - {data.vendor_max_capacity}
            </h3>
          </div>
          <div className="divDetails">
            <h3 className="details">Price range</h3>
            <h3 className="details">
              {data.vendor_min_price} - {data.vendor_max_price}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStoreDoneSubmit;
