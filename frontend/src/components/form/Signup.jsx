import "./signup.scss";
import Button from "@material-ui/core/Button";

export default function Signup() {
  return (
    <div className="signup">
      <h1>D I G I B I O N I C S by Cure Bionics</h1>
      <h2>Partner</h2>
      <div className="form">
        <form>
          <h1>Sign In</h1>
          <h4>In order to login, use the ID code provided by Cure Bionics.</h4>
          <input type="text" placeholder="Email" />
          <br />
          <input type="password" placeholder="Password" />
          <br />
          <input type="password" placeholder="CureID" />
          <br />
        </form>
        <div className="login">
          <Button variant="contained" color="primary">
            Next →
          </Button>
          <span>
            Already have an account? <a href="#">Log In.</a>
          </span>
        </div>
      </div>
    </div>
  );
}
