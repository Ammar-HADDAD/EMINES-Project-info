import "./dashboard.css";
import GrapheBar from "./GrapheBar";
import GrapheCourbe from "./GrapheCourbe";
import axios from "axios";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="box">
        <div className="rectangle1">
          <div className="title">
            <b>Tableau de bord</b>
          </div>
          <div className="subtitle">Aperçu du dernier mois</div>
          <div className="revenu">5000 MAD</div>
          <div className="subtitle1">Revenu du mois présent</div>
          <div className="subtitle2">Ventes du mois présent</div>
          <div className="graphecourbe">
            <GrapheCourbe />
          </div>
          <div className="sales">100</div>
          <div className="titlegraphe">
            <b>Les ventes de cette semaine</b>
          </div>
        </div>
      </div>
      <div className="box2">
        <div className="rectangle2">
          <div className="title2">
            <b>Quantité des produits par stock</b>
          </div>
          <div className="graphebar">
            <GrapheBar />
          </div>
        </div>
      </div>
      <div className="box3">
        <div className="rectangle3">
          <div className="title3">
            <b>La meilleure vente</b>
          </div>
          <div className="subtitle3">entités</div>
          <div className="entity">40</div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 10.5L12.5 13.5L10.5 11.5L7.5 14.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 5H7.2C6.07989 5 5.51984 5 5.09202 5.21799C4.71569 5.40973 4.40973 5.71569 4.21799 6.09202C4 6.51984 4 7.07989 4 8.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H15.8C16.9201 20 17.4802 20 17.908 19.782C18.2843 19.5903 18.5903 19.2843 18.782 18.908C19 18.4802 19 17.9201 19 16.8V10"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="19" cy="5" r="2" fill="white" />
          </svg>
        </div>
        <div className="rectangle4">
          <div className="title4">
            <b>Taux de service à la clientèle</b>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 6L15.7071 11.2929C15.3166 11.6834 14.6834 11.6834 14.2929 11.2929L12.7071 9.70711C12.3166 9.31658 11.6834 9.31658 11.2929 9.70711L7 14"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 3V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <div className="entity">90 %</div>
        </div>
        <div className="rectangle5">
          <div className="title5">
            <b>Prévisions des ventes</b>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.51663 4.79612C5.84338 6.09111 3.99995 8.83027 3.99995 12C3.99995 12.1969 4.00706 12.3921 4.02104 12.5855L10.1628 10.9398L8.51663 4.79612ZM11.4148 4.02107L13.19 10.6463L13.2017 10.6897C13.2517 10.8754 13.3222 11.1373 13.3531 11.3775C13.3921 11.6802 13.4013 12.159 13.1196 12.6469C12.8379 13.1348 12.4187 13.3662 12.137 13.4838C11.9136 13.5771 11.6515 13.647 11.4656 13.6965L11.4222 13.7081L4.7962 15.4836C6.09125 18.1567 8.83033 20 11.9999 20C16.4182 20 19.9999 16.4183 19.9999 12C19.9999 7.58171 16.4182 3.99999 11.9999 3.99999C11.8032 3.99999 11.608 4.0071 11.4148 4.02107Z"
              fill="white"
            />
            <path
              d="M9.92945 4.2726C9.67849 3.33602 9.55302 2.86773 9.12084 2.67286C8.68865 2.47799 8.30723 2.66782 7.54439 3.04749C6.97028 3.33322 6.42361 3.6742 5.91239 4.06647C4.87054 4.86591 3.99636 5.86272 3.33975 7C2.68314 8.13728 2.25696 9.39276 2.08555 10.6947C2.00144 11.3336 1.97948 11.9775 2.01909 12.6176C2.07171 13.4681 2.09803 13.8933 2.48288 14.1701C2.86773 14.447 3.33602 14.3215 4.27259 14.0706L10.0681 12.5176C10.9788 12.2736 11.4342 12.1516 11.6413 11.7929C11.8484 11.4342 11.7264 10.9788 11.4824 10.0682L9.92945 4.2726Z"
              fill="white"
            />
          </svg>
          <div className="entity">20</div>
          <div className="subtitle4">par moyenne mobile</div>
        </div>
        <div className="rectangle6">
          <div className="title6">
            <b>Commandes en cours de livraison</b>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 6.5C13 5.94772 12.5523 5.5 12 5.5C11.4477 5.5 11 5.94772 11 6.5V11.75C11 12.4404 11.5596 13 12.25 13H15.5C16.0523 13 16.5 12.5523 16.5 12C16.5 11.4477 16.0523 11 15.5 11H13V6.5Z"
              fill="white"
            />
          </svg>
          <div className="entity">10</div>
        </div>
      </div>

      <div className="box4">
        <div className="rectangle7">
          <div className="title1">
            <b>Aperçu sur les opérations</b>
          </div>
          <table className="tableoper">
            <tr>
              <th>Opération</th>
              <th>Statut</th>
              <th>Produits</th>
              <th>Statut</th>
            </tr>
          </table>
        </div>
        <div className="rectangle8">
          <div className="title7">
            <b>Statut des commandes</b>
          </div>
          <table className="tablecomm">
            <tr>
              <th>ID</th>
              <th>Produits</th>
              <th>Prix</th>
              <th>Statut des commandes</th>
            </tr>
          </table>
          <button className="btnajouter">
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
          <button className="btnmodifier">
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
          </button>
          <button className="btnsupp">
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
            className="searchinput"
            type="text"
            placeholder="Chercher.."
          ></input>
          <svg
            className="searchicon"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="18"
            height="18"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
