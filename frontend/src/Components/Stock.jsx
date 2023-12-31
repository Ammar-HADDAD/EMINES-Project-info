import "./Stock.css";
import Modal from "./ModalStock";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Stock() {
  const Pr_Object = "Stock";
  const [modalOpen, setModalOpen] = useState(false);
  const [List, setList] = useState([]);

  const [menuOptions, setmenuOptions] = useState([]);
  const [newElement, setNewElement] = useState({
    Nom: "",
    Location: "",
  });

  // New state to manage selected checkboxes
  const [selected, setSelected] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Fetch data from the API when the component is mounted
    axios
      .get("http://localhost:8001/get_stock")
      .then((response) => {
        // Update the product list with the fetched data
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the backend:", error);
      });
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filtered = List.filter(
    (element) =>
      element.Nom.toLowerCase().includes(searchInput.toLowerCase()) ||
      element.Location.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the input fields are empty
    const requiredFields = ["Nom", "Location"];
    const isEmptyField = requiredFields.some(
      (field) => newElement[field] === ""
    );

    if (isEmptyField) {
      alert("Please fill in all the required fields");
      return;
    }

    // Continue with the existing validation code

    const mappedArray = Object.values(newElement);

    axios
      .post("http://localhost:8001/insert_stock", [mappedArray])
      .then((response) => {
        console.log(response.data);
        if (response.data.inserted === 0) {
          alert("Produit existe deja");
        } else {
          // Refresh the product list after inserting a new product
          axios.get("http://localhost:8001/get_stock").then((response) => {
            setList(response.data);
          });

          // Clear the form
          setNewElement({
            Nom: "",
            Location: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error inserting data into the backend:", error);
      });
  };

  const handleChange = (e) => {
    setNewElement({ ...newElement, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the selected products?"
    );

    if (isConfirmed) {
      axios
        .post("http://localhost:8001/delete_stock", selected)
        .then((response) => {
          if (response.data === "Success") {
            const updatedList = List.filter(
              (element) => !selected.includes(element.stock_id)
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

          <button
            className="btnimport"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_32_461)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 1.39683V14.6032C4 15.3746 4.61561 16 5.375 16H14.625C15.3844 16 16 15.3746 16 14.6032V3.67563C16 3.30251 15.8531 2.9449 15.5919 2.68251L13.3239 0.403706C13.0665 0.145065 12.7191 0 12.357 0H5.375C4.61561 0 4 0.62538 4 1.39683ZM4.875 14.6032V1.39683C4.875 1.1163 5.09886 0.888889 5.375 0.888889H12.1875V3.93651C12.1875 4.46249 12.6072 4.88889 13.125 4.88889H15.125V14.6032C15.125 14.8837 14.9011 15.1111 14.625 15.1111H5.375C5.09886 15.1111 4.875 14.8837 4.875 14.6032ZM15.125 4V3.67563C15.125 3.53995 15.0716 3.40991 14.9766 3.3145L13.0625 1.39127V3.93651C13.0625 3.97157 13.0905 4 13.125 4H15.125Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.25 6.5625C10.25 6.32088 10.4459 6.125 10.6875 6.125H13.5625C13.8041 6.125 14 6.32088 14 6.5625C14 6.80412 13.8041 7 13.5625 7H10.6875C10.4459 7 10.25 6.80412 10.25 6.5625Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.25 8.5625C10.25 8.32088 10.4459 8.125 10.6875 8.125H13.5625C13.8041 8.125 14 8.32088 14 8.5625C14 8.80412 13.8041 9 13.5625 9H10.6875C10.4459 9 10.25 8.80412 10.25 8.5625Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.25 10.5625C10.25 10.3209 10.4459 10.125 10.6875 10.125H13.5625C13.8041 10.125 14 10.3209 14 10.5625C14 10.8041 13.8041 11 13.5625 11H10.6875C10.4459 11 10.25 10.8041 10.25 10.5625Z"
                  fill="white"
                />
                <path
                  d="M0 4.625C0 4.21079 0.335786 3.875 0.75 3.875H8.25C8.66421 3.875 9 4.21079 9 4.625V12.125C9 12.5392 8.66421 12.875 8.25 12.875H0.75C0.335786 12.875 0 12.5392 0 12.125V4.625Z"
                  fill="white"
                />
                <path
                  d="M2.5 10.8857L3.90479 8.271L2.62988 5.875H3.60059L4.42432 7.48486L5.23096 5.875H6.19141L4.9165 8.30859L6.32129 10.8857H5.31982L4.40723 9.15283L3.49463 10.8857H2.5Z"
                  fill="#64CCC5"
                />
              </g>
              <defs>
                <clipPath id="clip0_32_461">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <b>Importer</b>
          </button>
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
          <button className="btnsupprimer" onClick={handleDelete}>
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
            <input
              className="in"
              type="text"
              name="Nom"
              placeholder="Nom"
              value={newElement.Nom || ""}
              onChange={handleChange}
            />
            <input
              className="in"
              type="text"
              name="Location"
              placeholder="Location"
              value={newElement.Location || ""}
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
                <th>Nom</th>
                <th>Location</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((element) => (
                <tr key={element.stock_id}>
                  <td>{element.Nom}</td>
                  <td>{element.Location}</td>
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selected.includes(element.stock_id)}
                      onChange={() => handleCheckboxChange(element.stock_id)}
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

export default Stock;
