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
            <label for="validationTooltip01" class="form-label">
              First name
            </label>
            <input
              type="text"
              class="form-control"
              id="validationTooltip01"
              value="Mark"
              required
            />
            <div class="valid-tooltip">Looks good!</div>
          </div>

          <div class="col-md-4 position-relative">
            <label for="validationTooltipUsername" class="form-label">
              Username
            </label>
            <div class="input-group has-validation">
              <span
                class="input-group-text"
                id="validationTooltipUsernamePrepend"
              >
                @
              </span>
              <input
                type="text"
                class="form-control"
                id="validationTooltipUsername"
                aria-describedby="validationTooltipUsernamePrepend"
                required
              />
              <div class="invalid-tooltip">
                Please choose a unique and valid username.
              </div>
            </div>
          </div>
          <div class="col-md-6 position-relative">
            <label for="validationTooltip03" class="form-label">
              City
            </label>
            <input
              type="text"
              class="form-control"
              id="validationTooltip03"
              required
            />
            <div class="invalid-tooltip">Please provide a valid city.</div>
          </div>
          <div class="col-md-3 position-relative">
            <label for="validationTooltip04" class="form-label">
              State
            </label>
            <select class="form-select" id="validationTooltip04" required>
              <option selected disabled value="">
                Choose...
              </option>
              <option>...</option>
            </select>
            <div class="invalid-tooltip">Please select a valid state.</div>
          </div>

          <div class="col-12">
            <button id="search-button" type="button" class="btn btn-primary">
              rechercher
              <UilSearch />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Formsearch;
