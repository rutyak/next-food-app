import { image_url } from "@/container/config/Config";
import rating from "../../assets/rating-icon.png";
import "./Card.scss";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({
  name,
  cloudinaryImageId,
  imageId,
  action,
  grid,
  cuisines,
  avgRating,
  id,
}) => {
  const imageSrc = cloudinaryImageId
    ? `${image_url}/${cloudinaryImageId}`
    : `${image_url}/${imageId}`;

  console.log("imagesrc: ", imageSrc);

  return (
    <Link href={`/menu/${id}`}>
      <div className={action? "top-carousal-card" : grid? "grid-card" : "card"}>
        <div className="card-img">
          <Image src={imageSrc} width={10} height={20} alt="card-image"/>
        </div>
        { !action && <div className="info">
          <h2 className="title">{name}</h2>
          <div className="rating">
            <Image src={rating} width={20} height={20} alt="rating" />
            <p>{avgRating}</p>
          </div>
          <p className="cuisines">{cuisines?.join(", ")}</p>
        </div>}
      </div>
    </Link>
  );
};

export default Card;
