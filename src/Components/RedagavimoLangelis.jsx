import React, { useEffect, useState } from "react";

function RedagavimoLangelis({
  id,
  uzdarytiLangeli,
  redaguoti,
  data,
  closeModal,
}) {
  const [registrationCode, setRegistrationCode] = useState("");
  const [isBusy, setIsBusy] = useState();
  const [lastUseTime, setLastUseTime] = useState("");
  const [totalRide, setTotalRide] = useState("");
  const [check, setCheck] = useState("")
  useEffect(() => {
    setRegistrationCode(data.registrationCode);
    setIsBusy(data.isBusy);
    setLastUseTime(data.lastUseTime);
    setTotalRide(data.totalRide);
  }, [id]);

  const isChecked = () => {
      if (isBusy === true) {
          setCheck("on")
      }
      else {
        setCheck("")
    }
  }

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
  const postoRedagavimas = () => {
    const data1 = {
      registrationCode: registrationCode,
      isBusy: isBusy === false ? 0 : 1,
      lastUseTime: "2012-05-10",
      totalRide: totalRide,
    };
    redaguoti(data1, id);
    closeModal();
  };

  return id === 0 ? null : (
    <div className="redagavimo-langelis">
      <div className="close-container" onClick={closeModal}>
        <div className="leftright"></div>
        <div className="rightleft"></div>
      </div>

      <span>Paskutini karta naudotas:</span>
      <input
        onChange={(e) => controller(e, "lastUseTime")}
        value={lastUseTime}
        type="datetime-local"
      />
      <span>Rida: </span>
      <input
        onChange={(e) => controller(e, "totalRide")}
        value={totalRide}
        type="text"
      />
      <div className="checkbox-container" >
        <div>Ar uzimtas?</div>
      <input className="checkbox"
        onClick={isChecked}
        onChange={(e) => controller(e, "isBusy")}
        checked={check}
        type="checkbox"
      />
      </div>
      <div className="redagavimo-mygtukai">
        <button onClick={postoRedagavimas} className="done-button">
          Done!
        </button>
      </div>
    </div>
  );
}

export default RedagavimoLangelis;
