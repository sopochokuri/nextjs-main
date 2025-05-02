import Footer1 from "@/components/footers/Footer1";
import ContactForm2 from "@/components/othersPages/contact/ContactForm2";
import Map2 from "@/components/othersPages/contact/Map2";
import React from "react";

export const metadata = {
  title: "Contact 2 || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <div className="tf-page-title style-2 ">
        <div className="container-full paddingtopdiv mainfont">
          <div className="heading text-center">კონტაქტი</div>
        </div>
      </div>
      <Map2 />
      <ContactForm2 />
    </>
  );
}
