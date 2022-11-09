import React, { useState, useEffect } from "react";
import "./gallary.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';

const Gallary = (props) => {
  const [imagesList, setImagesList] = useState([]);
  const [show, setShow] = useState({img:''})


  useEffect(() => {
    const task = async () => {
      const res = await fetch(
        "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1"
      );
      const data = await res.json();
      console.log(data.photos.photo);
      setImagesList(data.photos.photo);
    };
    task();
  }, []);

  const handler = (img) => {
      console.log(img)
      setShow({img})
  }

 
 
  return (
    <div className="app-container">
      <h1 className="heading">Images</h1>
      {show.img && <>      
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className='modal-container'
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">           
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={show.img} alt='' className="modal-image" />
        </Modal.Body>
      </Modal> 
      </>}
      <div className="images-container">
        {imagesList.map((each, index) => {
          const image = `https://farm${each.farm}.staticflickr.com/${each.server}/${each.id}_${each.secret}.jpg`
          return (
            <div key={index} className="image-container">
              <img
                src={image}
                className="image"
                alt="images"
                onClick={() => handler(image)}
              />
              <p className="title">{each.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallary;