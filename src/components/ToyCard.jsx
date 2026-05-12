import React from "react";

function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={() => onLikeToy(toy)}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={() => onDeleteToy(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
