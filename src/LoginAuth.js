import React from "react";

import { Container } from "react-bootstrap";

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=c45b9d152506477485a5f64fa7b244ce&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function LoginAuth() {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <h3>Bett!fy </h3>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                LOG IN
            </a>
        </Container>
    );
}
