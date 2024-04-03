import { useEffect, useRef, useState } from "react";
import "./card.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const navigate = useNavigate();
console.log(product)
  const redirect = () => {
    navigate("/product",{state:{details:product}})
  }
  return (
    <div className="product-card-wrapper">
      <section className="product-card" onClick={redirect}>


        {/* image */}
        <div className="product-card__img">
          <img src={product?.thumbnail} />
        </div>

        {/* contents */}
        <div className="product-card__contents">
          <div className="product">

            {/* brand */}
            <p className="product__brand">{product?.name}</p>

            


            {/* price */}
            <div className="price">

              <p className="price__correct"><span className="rupee"></span> {product.price}</p>             
            </div>

            <div className="description">

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Card;