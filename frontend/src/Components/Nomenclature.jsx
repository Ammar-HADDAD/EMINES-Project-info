import "./Nomenclature.css";
import Modal from "./Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Nomenclature() {
  const Pr_Object = "Nomenclatures";
  const [modalOpen, setModalOpen] = useState(false);
  const [List, setList] = useState([]);

  const [menuOptions_produit, setmenuOptions_produit] = useState([]);
  const [menuOptions_nom, setmenuOptions_nom] = useState([]);
  const [menuOptions_op, setmenuOptions_op] = useState([]);

  const [newElement, setNewElement] = useState({
    produit_nom: "",
    nomenclature_nom: "",
    operation: "",
    Quantite: "",
  });

  // New state to manage selected checkboxes
  const [selected, setSelected] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Fetch data from the API when the component is mounted
    axios
      .get("http://localhost:8001/get_nom")
      .then((response) => {
        // Update the product list with the fetched data
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the backend:", error);
      });

    // Fetch stock options from the API
    axios
      .get("http://localhost:8001/get_produit_menu")
      .then((response) => {
        // Update the stock options state with the fetched data
        setmenuOptions_produit(response.data);
      })
      .catch((error) => {
        console.error("Error fetching source options from the backend:", error);
      });

    // Fetch stock options from the API
    axios
      .get("http://localhost:8001/get_nom_menu")
      .then((response) => {
        // Update the stock options state with the fetched data
        setmenuOptions_nom(response.data);
      })
      .catch((error) => {
        console.error("Error fetching source options from the backend:", error);
      });

    // Fetch stock options from the API
    axios
      .get("http://localhost:8001/get_op_menu")
      .then((response) => {
        // Update the stock options state with the fetched data
        setmenuOptions_op(response.data);
      })
      .catch((error) => {
        console.error("Error fetching source options from the backend:", error);
      });
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  console.log(List);

  const filtered = List.filter(
    (element) =>
      element.produit_nom.toLowerCase().includes(searchInput.toLowerCase()) ||
      element.nomenclature_nom
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      element.operation.toLowerCase().includes(searchInput.toLowerCase()) ||
      element.quantite
        .toString()
        .toLowerCase()
        .includes(searchInput.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the input fields are empty
    const requiredFields = ["produit", "nomenclature", "operation", "Quantite"];

    const isEmptyField = requiredFields.some(
      (field) => newElement[field] === ""
    );

    if (isEmptyField) {
      alert("Please fill in all the required fields");
      return;
    }

    // Continue with the existing validation code

    const mappedArray = Object.values(newElement);

    console.log(mappedArray);
    axios
      .post("http://localhost:8001/insert_nom", mappedArray)
      .then((response) => {
        // Refresh the product list after inserting a new product
        axios.get("http://localhost:8001/get_nom").then((response) => {
          setList(response.data);
        });

        // Clear the form
        setNewElement({
          produit_nom: "",
          nomenclature_nom: "",
          operation: "",
          Quantite: "",
        });
      })
      .catch((error) => {
        console.error("Error inserting data into the backend:", error);
      });
  };

  const handleChange = (e) => {
    setNewElement({ ...newElement, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    console.log(selected);
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the selected products?"
    );

    if (isConfirmed) {
      axios
        .post("http://localhost:8001/delete_nom", selected)
        .then((response) => {
          if (response.data === "Success") {
            const updatedList = List.filter(
              (element) => !selected.includes(element.nomenclature_id)
            );

            setList(updatedList);
          } else {
            console.log("Error");
          }
        });

      // Clear the selected products state
      setSelected([]);
    }
  };

  // New function to handle checkbox changes
  const handleCheckboxChange = (elementId) => {
    if (selected.includes(elementId)) {
      // If the product is already selected, remove it
      setSelected((prevSelected) =>
        prevSelected.filter((id) => id !== elementId)
      );
    } else {
      // If the product is not selected, add it
      setSelected((prevSelected) => [...prevSelected, elementId]);
    }
  };
  return (
    <div className="Produits">
      <div className="boxx">
        <div className="rectangle">
          <div className="title">
            <b>Catalogue des {Pr_Object.toLowerCase()}</b>
          </div>

          {/* <button className="btnmodif">
            <svg
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.6248 10.6326L16.2849 8.61218C16.5513 8.28804 16.6844 8.12597 16.774 7.9629C17.1034 7.36322 17.1034 6.63677 16.774 6.0371C16.6844 5.87403 16.5513 5.71196 16.2849 5.38783L16.2849 5.38782L16.2849 5.3878C15.9058 4.92641 15.7162 4.69571 15.525 4.55189C14.813 4.01645 13.8327 4.01645 13.1208 4.55189C12.9295 4.69571 12.74 4.92641 12.3609 5.38781L12.3608 5.38782L11.325 6.64843C12.0975 8.21271 13.2301 9.57928 14.6248 10.6326ZM13.3542 12.1789C11.9779 11.126 10.821 9.81245 9.95274 8.3185L4.32323 15.1697C3.98407 15.5824 3.8145 15.7888 3.70556 16.0293C3.59663 16.2697 3.55332 16.5333 3.46669 17.0605L2.9418 20.2544C2.88643 20.5913 2.85875 20.7598 2.95728 20.8511C3.05581 20.9424 3.22169 20.9021 3.55343 20.8213L5.63066 20.3157C6.27348 20.1592 6.59489 20.081 6.87003 19.9082C7.14517 19.7353 7.35517 19.4798 7.77519 18.9686L13.3542 12.1789Z"
                fill="#EEEEEE"
              />
            </svg>
          </button> */}
          <button className="btnsupprimer1" onClick={handleDelete}>
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.37763 0C6.15097 0 5.14734 0.88615 5.14734 1.96922H2.91704C1.69038 1.96922 0.686752 2.85537 0.686752 3.93844H16.2988C16.2988 2.85537 15.2952 1.96922 14.0685 1.96922H11.8382C11.8382 0.88615 10.8346 0 9.60792 0H7.37763ZM2.91704 5.90766V15.3796C2.91704 15.5962 3.09547 15.7538 3.3408 15.7538H13.6671C13.9124 15.7538 14.0908 15.5962 14.0908 15.3796V5.90766H11.8605V12.7999C11.8605 13.3513 11.3699 13.7846 10.7454 13.7846C10.1209 13.7846 9.63023 13.3513 9.63023 12.7999V5.90766H7.39993V12.7999C7.39993 13.3513 6.90927 13.7846 6.28479 13.7846C5.6603 13.7846 5.16964 13.3513 5.16964 12.7999V5.90766H2.93935H2.91704Z"
                fill="#EEEEEE"
              />
            </svg>
          </button>
          <input
            className="searchproduct"
            type="text"
            placeholder="Chercher.."
            value={searchInput}
            onChange={handleSearchChange}
          ></input>

          <form className="formprod" onSubmit={handleSubmit}>
            <select
              className="in"
              name="produit_nom"
              value={newElement.produit_nom || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Produit
              </option>
              {menuOptions_produit.map((produit) => (
                <option key={produit.Nom} value={produit.Nom}>
                  {produit.Nom}
                </option>
              ))}
            </select>

            <select
              className="in"
              name="nomenclature_nom"
              value={newElement.nomenclature_nom || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Nomenclature
              </option>
              {menuOptions_nom.map((element) => (
                <option key={element.Nom} value={element.nomenclature_id}>
                  {element.Nom}
                </option>
              ))}
            </select>

            <select
              className="in"
              name="operation"
              value={newElement.operation || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Operation
              </option>
              {menuOptions_op.map((e) => (
                <option key={e.operation} value={e.operation}>
                  {e.operation}
                </option>
              ))}
            </select>

            <input
              className="in"
              type="text"
              name="Quantite"
              placeholder="Quantite"
              value={newElement.Quantite || ""}
              onChange={handleChange}
            />

            <button className="btnajout" type="submit">
              <svg
                width="14"
                height="17"
                viewBox="0 0 14 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3236 6.39684H8.09776V1.16306C8.09776 0.520833 7.67723 0 7.15869 0H6.21962C5.70108 0 5.28055 0.520833 5.28055 1.16306V6.39684H1.05473C0.536189 6.39684 0.115662 6.91767 0.115662 7.5599V8.72296C0.115662 9.36519 0.536189 9.88602 1.05473 9.88602H5.28055V15.1198C5.28055 15.762 5.70108 16.2829 6.21962 16.2829H7.15869C7.67723 16.2829 8.09776 15.762 8.09776 15.1198V9.88602H12.3236C12.8421 9.88602 13.2626 9.36519 13.2626 8.72296V7.5599C13.2626 6.91767 12.8421 6.39684 12.3236 6.39684Z"
                  fill="#EEEEEE"
                />
              </svg>
              <b>Ajouter</b>
            </button>
          </form>

          <table className="tableproduct">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Nomenclature</th>
                <th>Opération</th>
                <th>Quantité</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((element) => (
                <tr key={element.nomenclature_id}>
                  <td>{element.produit_nom}</td>
                  <td>{element.nomenclature_nom}</td>
                  <td>{element.operation}</td>
                  <td>{element.quantite}</td>
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selected.includes(element.nomenclature_id)}
                      onChange={() =>
                        handleCheckboxChange(element.nomenclature_id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{" "}
      </div>{" "}
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  );
}

export default Nomenclature;
