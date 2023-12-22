import React from "react";
import "./ModalOrdre.css";

function Modal({ setOpenModal, orderDetails }) {
  // Destructure properties from orderDetails
  const { Final_Product, stockName, Stock, RequiredAmount, data } =
    orderDetails;

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Les détails de votre opération :</h1>
        </div>
        <div className="body">
          <table className="tableordre">
            <thead>
              <tr>
                <th>
                  <strong>Produit</strong>{" "}
                </th>
                <th>
                  <strong>Quantité</strong>
                </th>
                <th>
                  <strong>Nomenclature manquante</strong>
                </th>
                <th>
                  <strong>Quantité</strong>
                </th>
                <th>
                  <strong>Durée globale</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map over data and render rows */}
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.Produit}</td>
                  <td>{item.RequiredAmount}</td>
                  <td>{/* Render other properties as needed */}</td>
                  <td>{/* Render other properties as needed */}</td>
                  <td>{/* Render other properties as needed */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer">{/* Render other details if needed */}</div>
      </div>
    </div>
  );
}

export default Modal;
