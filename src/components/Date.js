import React from "react";

function DateInSpanish() {

    const date = new Date();

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    
    const dateInSpanish = date.toLocaleDateString('es-ES', options)

    return <div style={{ fontSize: "1.3vw", margin: "1vw" }}>El clima hoy, {dateInSpanish}</div>;
}

export default DateInSpanish;
