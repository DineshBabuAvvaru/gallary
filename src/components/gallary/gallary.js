import React, { useState } from "react";
import "./gallary.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import useFetch from "../../Fetch/Fetch";
import DetailedPage from "../../Detailed Page/DetailedPage"; 

const detailsLink =
  "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1";

const Gallary = () => {
  const details = useFetch(detailsLink);//fetch the details
  const [imageClick, setImageClick] = useState(false);
  const [filterData, setFilterData] = useState([]); 

  //getting the slected image detials and set the detials to variable
  const onMainShowdisplay = (e) => {
    const filteredData = details.filter((info) => {
      return info.id === e.target.id;
    });
    setFilterData(filteredData);
    setImageClick(true);
  };

  

  return (
    <div>
      
      {imageClick && (
        <DetailedPage onHide={()=>setImageClick(false)} show={imageClick} singlepageinfo={filterData}  />
      )}
      

      <Container className="main-heading"> 
        <h1 className="heading"> Photos Gallary </h1> 
        <Row className="photoscontainer">
          {details.map((info) => {
            return (
              <Col className="imageConatiner" key={info.id}>
                <img
                  id={info.id}
                  className="photo"
                  onClick={onMainShowdisplay}
                  src={`https://farm${info.farm}.staticflickr.com/${info.server}/${info.id}_${info.secret}.jpg`}
                  alt="imagesLogo"
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Gallary;