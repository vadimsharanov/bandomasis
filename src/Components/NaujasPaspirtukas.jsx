import { useEffect, useState } from "react";

function NaujasPaspirtukas({ prideti }) {

  const [registrationCode, setRegistrationCode] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [lastUseTime, setLastUseTime] = useState("");
  const [totalRide, setTotalRide] = useState("");
 
  const controller = (event, inputValue) => {
    if ("registrationCode" === inputValue) {
      setRegistrationCode(event.target.value);
    } else if ("isBusy" === inputValue) {
      setIsBusy(event.target.checked);
    } else if ("lastUseTime" === inputValue) {
      setLastUseTime(event.target.value);
    } else if ("totalRide" === inputValue) {
        setTotalRide(event.target.value);
    }
  };

  const pridetiNauja = () => {
    const data = {
      registrationCode: registrationCode,
      isBusy: isBusy,
      lastUseTime: lastUseTime,
      totalRide:totalRide,
    };
    console.log(data);    
    prideti(data);
  };

  return (
    <div className="naujas-postas-container">
      <div className="form">
        <span className="input-label">Registracijos kodas</span>
        <div className="form-row">
          <input
            onChange={(e) => controller(e, "registrationCode")}
            value={registrationCode}
            type="number"
          />
        </div>
        <div className="form-row">
          <input onChange={(e) => controller(e, "lastUseTime")} type="datetime-local" />
        </div>
        <span className="input-label">Rida</span>
        <div className="form-row">
          <input
            onChange={(e) => controller(e, "totalRide")}
            value={totalRide}
            type="number"
          />
        </div>
        <div className="form-row">
          <button onClick={pridetiNauja} className="save">
            Prideti!
          </button>
        </div>
      </div>
    </div>
  );
}

export default NaujasPaspirtukas;
