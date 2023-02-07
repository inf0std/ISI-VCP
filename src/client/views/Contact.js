import Navbar from "../component/Home2/Navbar";
const Contact = (props) => {
  return (
    <div class="" style={{ backgroundColor: "#a0969665", height: "650px" }}>
      <Navbar
        generalHandler={props.generalHandler}
        localVars={props.localVars}
      />
      <div class="container text-center">
        <div class="row mb-5">
          <div class="col"></div>
          <div
            class="col-6 mt-5 bg-white rounded-4"
            style={{ height: "380px" }}
          >
            <form>
              <h1 class="mt-4 fw-normal">Contacter nous</h1>

              <div class="mt-5 form-floating">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="mt-5 form-floating">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                ></textarea>
                <label for="floatingInput">Message</label>
              </div>

              <button class="w-100 btn btn-lg btn-primary mt-4" type="submit">
                Envoyer
              </button>
            </form>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
