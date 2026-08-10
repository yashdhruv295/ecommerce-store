import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";


function Profile() {

  const navigate =
    useNavigate();


  const savedUser =
    localStorage.getItem(
      "loggedInUser"
    );


  let user = null;


  try {

    user = savedUser
      ? JSON.parse(savedUser)
      : null;

  } catch (error) {

    console.error(
      "Error reading user:",
      error
    );

  }


  return (

    <>

      <Navbar />


      <main className="profile-page">


        <div className="profile-header">

          <span>
            MY ACCOUNT
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            View your account information.
          </p>

        </div>


        <div className="profile-card">


          <div className="profile-avatar">
            👤
          </div>


          <div className="profile-info">


            <div className="profile-field">

              <span>
                Name
              </span>

              <strong>

                {
                  user?.name ||
                  user?.fullName ||
                  "User"
                }

              </strong>

            </div>


            <div className="profile-field">

              <span>
                Email
              </span>

              <strong>

                {
                  user?.email ||
                  "Not available"
                }

              </strong>

            </div>


            <div className="profile-field">

              <span>
                Phone
              </span>

              <strong>

                {
                  user?.phone ||
                  "Not available"
                }

              </strong>

            </div>


          </div>


          <button
            onClick={() =>
              navigate(
                "/products"
              )
            }
          >
            Continue Shopping →
          </button>


        </div>


      </main>

    </>

  );

}


export default Profile;