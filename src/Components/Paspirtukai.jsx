import NaujasPaspirtukas from "./NaujasPaspirtukas";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Paspirtukas from "./Paspirtukas";
import RedagavimoLangelis from "./RedagavimoLangelis";


function Paspirtukai() {
    const [paspirtukai, setPaspirtukai] = useState([]);
    const [postuKeitimoLaikas, setPostuKeitimoLaikas] = useState(Date.now());
    const [open, setOpen] = useState(0);
    const modalPost = useRef({registrationCode:"", isBusy:"",lastUseTime:"", totalRide:"" })

    useEffect(() => {
        axios.get('http://localhost:3002/paspirtukai')
        .then(function (response) {
            setPaspirtukai(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [postuKeitimoLaikas])
    


    const prideti = (data) => {
        axios.post("http://localhost:3002/paspirtukai/", {data} 
        )
        .then(function (response) {
            setPostuKeitimoLaikas(Date.now())
        })
        .catch(function (error) {
            console.log(error);
          })
    }

    const trinimas = (id) => {
        axios.delete("http://localhost:3002/paspirtukai/" + id)
        .then(function (response) {
        setPostuKeitimoLaikas(Date.now())    
        })
        .catch(function (error) {
            console.log(error);
          })
    
    }

    const crud = {
        delete: trinimas,
    }


    const redaguoti = (data,id) => {
        console.log(data);
        axios.put("http://localhost:3002/paspirtukai/" + id, {data} 
        )
        .then(function (response) {
            setPostuKeitimoLaikas(Date.now())
        })
        .catch(function (error) {
            console.log(error);
          })
    }
    
    const openModal = (data) => {
        console.log(data);
        modalPost.current = 
        {
            registrationCode:data.registration_code,
            isBusy:data.is_busy === 1? false : true,
            lastUseTime:data.last_use_time,
            totalRide:data.total_ride_kilometres,
        }
        setOpen(data.id);
    }
    const closeModal = () => {
        setOpen(0);
    }

    return (
    <>
    <RedagavimoLangelis  data={modalPost.current}  id={open} closeModal={closeModal} redaguoti={redaguoti} ></RedagavimoLangelis>
    <NaujasPaspirtukas prideti={prideti}  ></NaujasPaspirtukas>
    <div className="paspirtukai" >
    {paspirtukai.map(item=> <Paspirtukas openModal={openModal} trinti={()=>trinimas(item.id)} key={item.id} data={item} ></Paspirtukas> )}
    </div>
    </>

)
}
{/* <RedagavimoLangelis id={open} redaguoti={redaguoti} uzdarytiLangeli={closeModal} data={modalPost.current}  ></RedagavimoLangelis>
<NaujasPostas   prideti={prideti} ></NaujasPostas>
<div className="postu-container" >
    {postai.map(postas=>  <Postas redagavimoLangelis={openModal} index={postai.indexOf(postas)} key={postas.id} data={postas} crud={crud} ></Postas>  )}
</div> */}

export default Paspirtukai