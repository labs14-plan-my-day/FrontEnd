import React from "react";
import { Container, Row, Col } from "reactstrap";


import Highlight from "../Components/Highlight";
import Loading from "../Components/Loading";

import { useAuth0 } from "../react-auth0-spa";
import Slack from "../Components/Slack.js"

const Profile = () => {



  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <Container className="mb-5">
          <Row className="align-items-center profile-header mb-5 text-center text-md-left">
            <Col md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              />
            </Col>
            <Col md>
              <h2>{user.name}</h2>
              <p className="lead text-muted">{user.email}</p>
            </Col>
          </Row>
          <Row>
            <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
          </Row>
        </Container>
      </div>
      <div>
        <Slack />
      </div>
      </div>

      );
    };
    
    export default Profile;
