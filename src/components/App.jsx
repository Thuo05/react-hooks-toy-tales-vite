import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToys((prevToys) => [...prevToys, newToy]);
    setShowForm(false);
  }

  function handleDeleteToy(toyId) {
    fetch(`/toys/${toyId}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prevToys) => prevToys.filter((toy) => toy.id !== toyId));
    });
  }

  function handleLikeToy(toy) {
    const updatedLikes = toy.likes + 1;

    fetch(`/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((prevToys) =>
          prevToys.map((existingToy) =>
            existingToy.id === updatedToy.id ? updatedToy : existingToy
          )
        );
      });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onToySubmit={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;
