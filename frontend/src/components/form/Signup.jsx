import "./signup.scss";

export default function Signup() {
  return (
    <div className="signup">
      <h1>digibionics</h1>
      <h2>Partner</h2>
        <form>
          <h1>Sign In</h1>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="CureID" />
          <button> Login </button>
        </form>
    </div>
  );
}
