import { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  
  const filteredEvents =
  !type
    ? data?.events?.slice(startIndex, endIndex)
    : data?.events?.filter((event) => event.type === type)?.slice(startIndex, endIndex);

    const pageNumber = Math.ceil((data?.events?.filter((event) => !type || event.type === type)?.length || 0) / eventsPerPage);
  const typeList = new Set(data?.events?.map((event) => event.type));
      
   // console.log("API :", data);
   // console.log("Filtered Events:", filteredEvents);
  
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
    // console.log("Type" , evtType)
  };
 
// console.log("type lite", typeList );


  useEffect(() => {
    if (data) {
  //    console.log("Données de l'API :", data);
    }
  }, [data]);

  return (
    <>
      {error && <div>An error occured</div>}
      {!filteredEvents || !filteredEvents.length  ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
                 (event &&
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}  
              </Modal>)
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;