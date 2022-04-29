import React from "react";
import { Button } from "react-bootstrap";
import './main.css';

export default function Main() {
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
                    <Button variant="success" className="ms-3">BUY NOW</Button>
                </div>
            </div>
        </>
    );
}