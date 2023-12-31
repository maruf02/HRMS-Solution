import React from "react";
import BannerSection from "../BannerSection/BannerSection";
import ServiceSection from "../ServiceSection/ServiceSection";
import TestimonialSection from "../TestimonialSection/TestimonialSection";
import ContactUs from "../ContactUs/ContactUs";
import JobFair from "../JobFair/JobFair";
import WhyChooseUS from "../../WhyChooseUS/WhyChooseUS";

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <WhyChooseUS></WhyChooseUS>
      <ServiceSection></ServiceSection>
      <JobFair></JobFair>
      <TestimonialSection></TestimonialSection>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
