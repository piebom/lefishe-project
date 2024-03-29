import React from "react";
import UserCard from "./UserCard";

function WiePage() {
  return (
    <section
      id="Wie"
      className="relative flex h-screen w-screen snap-center flex-col items-center justify-center"
    >
      <h1 className="-translate-y-10 text-4xl font-bold">Wie zijn wij?</h1>
      <div className="min-w-screen relative flex h-fit snap-x snap-mandatory space-x-10 overflow-x-auto overflow-y-hidden lg:overflow-x-hidden">
        <UserCard
          imageURL="/jonas.jpg"
          naam="Jonas Van De Velde"
          bijnaam="Njörd Günderson"
          bio="Ik ben Jonas, a.k.a Njörd Günderson. Mijn visserij is heel allround en zo ben ik ben van alle markten een beetje thuis. Mijn passie ligt bij het vissen in Frankrijk op de grote meren, rivieren en kanaaltjes. 
                    Eén doel: 20kg+"
        />
        <UserCard
          imageURL="/brendon.jpg"
          naam="Brendon Poppe"
          bijnaam="Andrew Tate / Pop-up master"
          bio="Ik ben Brendon, ook gekend als andrew teedt of pop-up master. Hoewel ik nog zeer nieuw ben in het vissen heb ik al op verschillende wateren mijn vis gevangen. Dit jaar wordt voor mij veel experimenteren zo doe ik dit bv al met mijn pop-ups aan te passen. Mijn doel: dubbel run 25+"
        />
        <UserCard
          imageURL="/dries.jpg"
          naam="Dries Van Havermaet"
          bijnaam="Jonathan DuPrince"
          bio="Ik ben Dries a.k.a. Jonathan DuPrince. Als volledige nieuweling ben ik al blij met elke vis die ik kan binnenhalen, al heb ik liever geen dwergmeerval aan de haak. Mijn focus zal dan ook vooral op de lokale waters gezicht zijn. Mijn doel: 15+."
        />
      </div>
    </section>
  );
}

export default WiePage;
