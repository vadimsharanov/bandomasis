import { useEffect, useState } from "react";

function Paspirtukas({ data, trinti, openModal }) {
  const [uzimtas, setUzimtas] = useState("");
  console.log(data.is_busy);
  console.log(uzimtas);
  useEffect(() => {
    arUzimtas();
  }, [uzimtas]);
  const arUzimtas = () => {
    if (data.is_busy === 0) {
      setUzimtas("green");
    } else {
      setUzimtas("red");
    }
  };

  const dateFormat = (date) => {
    date = date.split("-");
    let day = [];
    day.push(date[2][0]);
    day.push(date[2][1]);
    day = day.join("");
    let newDate = [];
    newDate.push(date[0]);
    newDate.push(date[1]);
    newDate.push(day);
    date.push(day);
    return newDate.join(":");
  };

  return (
    <div
      className="vienas-paspirtukas"
      style={{ border: "solid 3px " + uzimtas }}
    >
      <div>ID:{data.id}</div>
      <div>Ar uzimtas: {data.is_busy}</div>
      <div>Paskutini karta naudotas : {dateFormat(data.last_use_time)}</div>
      <div>Registracijos Kodas : {data.registration_code}</div>
      <div>Rida : {data.total_ride_kilometres} km</div>
      <div className="redagavimo-mygtukai">
        <button className="trinimo-mygtukas" onClick={trinti}>
          trinti
        </button>
        <button className="redagavimo-mygtukas" onClick={() => openModal(data)}>
          redaguoti
        </button>
      </div>
    </div>
  );
}

export default Paspirtukas;
