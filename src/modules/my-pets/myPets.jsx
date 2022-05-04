import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { retrivePets } from "../../slices/pet";


export default function MyPets() {
  // @ts-ignore
  const pets = useSelector((state) => state.pets);
  console.log('pets', pets);
  const myPets = pets.filter(pet => pet.sold);
  console.log('myy', myPets);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pets.length === 0) {
      // @ts-ignore
      dispatch(retrivePets());
    }

    console.log("petssss", pets);
  }, [dispatch]);

  
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL No.</th>
            <th>Pet Name</th>
            <th>Age</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {myPets &&
            myPets.map((pet, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{pet.name}</td>
                  <td>{pet.age}</td>
                  <td>{pet.place}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
