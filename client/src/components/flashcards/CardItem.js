
import React from "react";
import { Link, useLocation } from "react-router-dom";

const CardItem = (props) => {
  console.log(props.card);
  const { pathname } = useLocation();
  return (
    <React.Fragment>
      <div className="col-lg-4 col-md-6">
        <div className="card rounded custom-card-listings-height p-4"
        style={{ border: ' solid ', backgroundColor: '#ffa50094'}}>
          <div className="pull-right">
            <Link
              to={`/flashcards/${props.card["_id"]}`}
              state={{ previousPath: pathname }}
            >
              <i
                className="bi bi-pencil-fill fs-4 float-end link-dark"
                title="Edit"
              ></i>
            </Link>      
          </div>
          <div className="card-body text-center pb-1 px-0 pt-0 d-flex justify-content-center">
          <span className="align-self-center"
          style={{ fontSize: 'x-large' }}>
            {props.card.question}
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardItem;
