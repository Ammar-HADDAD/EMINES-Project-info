import React, { useState, useRef } from "react";
import "./Modal.css";
import * as XLSX from "xlsx";
import axios from "axios";

function ModalOper({ setOpenModal }) {
  const fileInputRef = useRef(null);

  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };
  const handleFileSubmit = (e) => {
    let inserted = 0;
    let skipped = 0;
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "array" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);

      if (data !== null) {
        const mappedArray = data.map((item) => Object.values(item));
        const axiosRequests = [];

        mappedArray.forEach((element) => {
          const axiosRequest = axios
            .post("http://localhost:8001/check_oper", [element[0]])
            .then((res) => {
              if (res.data.exists) {
                skipped += 1;
              } else {
                inserted += 1;
                return axios.post("http://localhost:8001/insert_oper", element);
              }
            })
            .catch((err) => console.log(err));

          axiosRequests.push(axiosRequest);
        });

        Promise.all(axiosRequests)
          .then(() => {
            console.log(inserted, skipped);
            alert(
              `${inserted} inserted avec succes, ${skipped} already exists`
            );
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };
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

        <div className="body">
          <p>
            {" "}
            Votre fichier CSV doit être représenté comme suit pour assurer un
            import réussi :<br />
            <strong>Colonne A :</strong> Nom de l'opération
            <br />
            <strong>Colonne B :</strong> Durée
            <br />
            <strong>
              Si l'opération est un assemblage de produit final, veuillez
              l'écrire sous la forme suivante : Assemblage_NomDuProduiFinal
            </strong>
            <br />
            Assurez-vous de commencer à la ligne 1.
          </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Retour
          </button>
          <form onSubmit={handleFileSubmit}>
            <label className="ajout" onClick={handleClickFileInput}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFile}
                style={{ display: "none" }}
              />
              <button type="submit" className="ajout">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_32_461)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 1.39683V14.6032C4 15.3746 4.61561 16 5.375 16H14.625C15.3844 16 16 15.3746 16 14.6032V3.67563C16 3.30251 15.8531 2.9449 15.5919 2.68251L13.3239 0.403706C13.0665 0.145065 12.7191 0 12.357 0H5.375C4.61561 0 4 0.62538 4 1.39683ZM4.875 14.6032V1.39683C4.875 1.1163 5.09886 0.888889 5.375 0.888889H12.1875V3.93651C12.1875 4.46249 12.6072 4.88889 13.125 4.88889H15.125V14.6032C15.125 14.8837 14.9011 15.1111 14.625 15.1111H5.375C5.09886 15.1111 4.875 14.8837 4.875 14.6032ZM15.125 4V3.67563C15.125 3.53995 15.0716 3.40991 14.9766 3.3145L13.0625 1.39127V3.93651C13.0625 3.97157 13.0905 4 13.125 4H15.125Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.25 6.5625C10.25 6.32088 10.4459 6.125 10.6875 6.125H13.5625C13.8041 6.125 14 6.32088 14 6.5625C14 6.80412 13.8041 7 13.5625 7H10.6875C10.4459 7 10.25 6.80412 10.25 6.5625Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.25 8.5625C10.25 8.32088 10.4459 8.125 10.6875 8.125H13.5625C13.8041 8.125 14 8.32088 14 8.5625C14 8.80412 13.8041 9 13.5625 9H10.6875C10.4459 9 10.25 8.80412 10.25 8.5625Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
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
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <b> Importer</b>
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalOper;
