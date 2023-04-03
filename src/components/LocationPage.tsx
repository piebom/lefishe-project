import React from "react";
import LocationCard from "./LocationCard";
import LocationCard2 from "./LocationCard2";

function LocationPage() {
  const imagesSlide2 = ["niel1.jpg", "niel2.jpg", "niel3.jpg"];
  return (
    <section
      id="Locatie"
      className="relative flex h-screen w-screen snap-center flex-col items-center justify-center gap-x-10"
    >
      <h1 className="-translate-y-20 text-4xl font-bold">Waar vissen wij?</h1>
      <div className="flex gap-x-10">
        <LocationCard2 name="Niel" location="Antwerpen" img="/niel1.jpg" />
        <LocationCard2 name="Oude Durme" location="Hamme" img="/lake1.jpg" />
        <LocationCard2
          name="Het Fort van Bornem"
          location="Bornem"
          img="/bornem1.jpg"
        />
      </div>
    </section>
  );
}

export default LocationPage;
