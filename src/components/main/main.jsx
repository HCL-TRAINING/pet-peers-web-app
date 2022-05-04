import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './main.css';

export default function Main() {
    let navigate = useNavigate();
    return (
        <>
            <div className="bg-image">
            </div>
            <div className="bg-text">
                <h1>
                    PetPeers
                </h1>
                <div>A deflationary meme token <br />that gives back to charity</div>
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="primary">LEARN MORE</Button>
                    <Button variant="success" className="ms-3" onClick={() => navigate('/login')}>BUY NOW</Button>
                </div>
            </div>
        </>
    );
}