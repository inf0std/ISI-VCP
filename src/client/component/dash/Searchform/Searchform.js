import react from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./form.css";
import {
  UilSearch,
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";
const Formsearch = (props) => {
  return (
    <>
      <div
        class="form-container"
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          background: "white",
          padding: 30,
        }}
      >
        <form class="row g-3 needs-validation" novalidate>
          <div class="col-md-4 position-relative">
            <input
              type="text"
              class="form-control"
              id="validationTooltip01"
              placeholder="rechercher"
              required
            />
          </div>

          <div class="col-md-4 position-relative">
            <div class="input-group has-validation">
              <div class="col-12">
                <button
                  id="search-button"
                  type="button"
                  class="btn btn-primary"
                >
                  <UilSearch />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Formsearch;
