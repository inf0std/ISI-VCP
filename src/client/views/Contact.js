import Navbar from "../component/Home2/Navbar";
import  "./Contacts.css";
const Contact = (props) => {
  return (
    <div style={{backgroundColor: "rgba(234, 238, 238, 0.651)"}}>
      <Navbar
        generalHandler={props.generalHandler}
        localVars={props.localVars}
      />

      <div>
        <div class="contact-form-wrapper d-flex justify-content-center">
          <form action="#" class="contact-form">
            <h5 class="title">Contacter Nous</h5>
            <p class="description">
              N'hésitez pas à nous contacter si vous avez besoin d'aide, d'aide
              ou d'une autre question.
            </p>
            <div>
              <div>
                <input
                  type="email"
                  class="form-control rounded border-white mb-3 form-input"
                  id="floatingInput"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div>
              <textarea
                id="exampleFormControlTextarea1"
                class="form-control rounded border-white mb-3 form-text-area"
                rows="5"
                cols="30"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <div class="submit-button-wrapper">
              <input type="submit" value="Envoyer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

