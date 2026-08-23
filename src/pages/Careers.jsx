import { useState } from "react";
import Seo from "../components/Seo";
import CareerHero from "../sections/CareerHero";
import CareerStats from "../sections/CareerStats";
import CareerOpenPositions from "../sections/CareerOpenPositions";
import CareerWhyJoin from "../sections/CareerWhyJoin";
import CareerHiringProcess from "../sections/CareerHiringProcess";
import CareerApplicationSection from "../sections/CareerApplicationSection";
import CareerLifeAtWise from "../sections/CareerLifeAtWise";
import CareerContact from "../sections/CareerContact";

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState("");

  return (
    <>
      <Seo
        title="Careers"
        description="Join WISE Engineering Consultants Pvt. Ltd. — explore open positions in structural engineering, project coordination, AutoCAD, analytics and more across Mumbai."
        path="/careers"
      />
      <CareerHero />
      <CareerStats />
      <CareerOpenPositions onApply={setSelectedPosition} />
      <CareerWhyJoin />
      <CareerHiringProcess />
      <CareerApplicationSection defaultPosition={selectedPosition} />
      <CareerLifeAtWise />
      <CareerContact />
    </>
  );
}
