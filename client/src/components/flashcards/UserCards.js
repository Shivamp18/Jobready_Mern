
import React, { useEffect, useState, useMemo } from "react";
import NoActiveCards from "./NoActiveCards";
import ActiveCardsList from "./ActiveCardsList";
import CardService from "../../utils/card.service";


const UserCards = (props) => {
  const [errorContent, setErrorContent] = useState("");
  const [activeCards, setActiveCards] = useState([]);

  // Check if the user has any active cards at all and record this
  const hasActiveCards = useMemo(() => activeCards.length > 0, [activeCards]);

  // Fetch the user's active cards
  const loadActiveCards = async () => {
    try {
      const cards = await CardService.getActiveCards();
      setActiveCards(cards);
    } catch (error) {
      const errorMessage = error.message || error.toString();
      setErrorContent(errorMessage);
    }
  };

  useEffect(() => {
    loadActiveCards();
  }, []);

  // If the user doesn't have any active cards, display the NoActiveCards component.
  // Otherwise, provided no errors exist, show the ActiveCardsList component.
  if (!hasActiveCards) {
    return <NoActiveCards />;
  } else {
    return (
      <div>
        {!errorContent ? (
          <ActiveCardsList
            activeCards={activeCards}
            onDelete={loadActiveCards}
            currentUser={props.currentUser}
          />
        ) : (
        <div>error</div>)}
      </div>
    );
  }
};

export default UserCards;
