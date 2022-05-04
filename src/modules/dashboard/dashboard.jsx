import React from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyPet, retrivePets } from "../../slices/pet";

export default function Dashboard() {
  // @ts-ignore
  const { user: currentUser } = useSelector((state) => state.auth);
  // @ts-ignore
  const pets = useSelector((state) => state.pets);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (pets.length === 0) {
      // @ts-ignore
      dispatch(retrivePets());
    }

    console.log("petssss", pets);
  }, [dispatch]);

  const buyAction = (id) => {
    // @ts-ignore
    dispatch(buyPet(id))
    .unwrap()
    .then(res => {
      console.log('buy res', res);
    })
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL No.</th>
            <th>Pet Name</th>
            <th>Age</th>
            <th>Place</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pets &&
            pets.map((pet, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{pet.name}</td>
                  <td>{pet.age}</td>
                  <td>{pet.place}</td>
                  <td>
                    {pet.sold ? (
                      <Button variant="secondary" size="sm" disabled>
                        SOLD
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm" onClick={() => buyAction(pet.id)}>
                        BUY
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
