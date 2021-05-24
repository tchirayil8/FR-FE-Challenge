import { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/main.scss';

const App = () => {
  const [parts, setParts] = useState([]);
  const [partsQuantity, setPartsQuantity] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPartsRequest();
  }, [])

  useEffect(() => {
    getPartsRequest();
  }, [currentPage])

  const getPartsRequest = () => {
    axios.get(`http://localhost:5555/parts`, {
      params: {
        page: currentPage,
      }
    }).then((response) => {
      setParts(response.data.data);
      let tempPartsQuantity = {}
      response.data.data.forEach((part, index) => {
        tempPartsQuantity[index] = part.quantity;
      })
      setPartsQuantity(tempPartsQuantity);
    })
  }

  const updatePart = (id, newQuantity) => {
    axios.put(`http://localhost:5555/parts/${id}`, {
      quantity: newQuantity,
    })
  }

  return (
    <div className="app-container">
      <div className="app-title">
        {`Parts List Page ${currentPage}`}
      </div>
      {
        parts.map((part, index) => {
          return (
            <div className="part-container">
              <div className="parts-title">
                {part.part_file.file_name}
              </div>
              <div key={`form` + currentPage + index} className="form-container">
                <input
                  placeholder="Quantity"
                  value={partsQuantity[index]}
                  type="number"
                  onChange={(e) => setPartsQuantity({...partsQuantity, [index]: parseInt(e.target.value)})}
                />
                <button onClick={() => updatePart(part.id, partsQuantity[index])}>SAVE</button>
              </div>
            </div>
          );
        })
      }
      <div className="pagination-container">
        <div onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
          }
        }} className="arrow arrow-left">
          {`<-`}
        </div>

        <div onClick={() => {
          if (currentPage < 4) {
            setCurrentPage(currentPage + 1)
          }
        }}
        className="arrow arrow-right">
          {`->`}
        </div>
      </div>
    </div>
  );
}

export default App;