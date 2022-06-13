import React from "react";

function DateInSpanish() {

    const date = new Date();

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    
    const dateInSpanish = date.toLocaleDateString('es-ES', options)

    return <div style={{ fontSize: "1vw", margin: "1vw" }}>{dateInSpanish}</div>;
}

export default DateInSpanish;
