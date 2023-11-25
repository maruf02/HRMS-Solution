import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Blockchain from "../../../assets/Image/Blockchain.png";
import data from "../../../assets/Image/data.png";
import DevOps from "../../../assets/Image/DevOps.png";
import IoT from "../../../assets/Image/IoT.png";
import security from "../../../assets/Image/security.png";
import Software from "../../../assets/Image/Software.png";
import UIDesign from "../../../assets/Image/UIDesign.png";
import Web from "../../../assets/Image/Web.png";

const ServiceSection = () => {
  return (
    <div>
      <div className="text-center text-5xl pt-10">
        <h2 className="text-[#00b359] font-bold ">Our Service</h2>
        <p className="border-b-4 w-1/4 relative left-[38%] mt-3 border-black"></p>
      </div>
      <div className=" pl-[15%] md:pl-[10%] lg:pl-[5%] my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center  w-full">
        {/*  */}
        <div
          className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
        >
          <div className="card w-full   shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={Software}
                alt="Shoes"
                className="rounded-xl w-20 h-20"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">Software Development:</h2>
              <p className="h-20">
                Tailored solutions based on specific business needs and
                requirements.
              </p>

              <Link to="/jobs">
                <div className="flex ">
                  <p className=" text-lg text-white font-bold">Click Here</p>
                  <p>
                    <FaArrowCircleRight className="mt-2 ml-2 text-white text-lg "></FaArrowCircleRight>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div
          className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
        >
          <div className="card w-full   shadow-xl">
            <figure className="px-10 pt-10">
              <img src={Web} alt="Shoes" className="rounded-xl w-20 h-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">Web Development:</h2>
              <p className="h-20">
                Creation of scalable and interactive web applications.
              </p>

              <Link to="/jobs">
                <div className="flex ">
                  <p className=" text-lg text-white font-bold">Click Here</p>
                  <p>
                    <FaArrowCircleRight className="mt-2 ml-2 text-white text-lg "></FaArrowCircleRight>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div
          className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
        >
          <div className="card w-full   shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={UIDesign}
                alt="Shoes"
                className="rounded-xl w-20 h-20"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">UI/UX Design:</h2>
              <p className="h-20">
                User interface and user experience design for intuitive and
                engaging applications.
              </p>

              <Link to="/jobs">
                <div className="flex ">
                  <p className=" text-lg text-white font-bold">Click Here</p>
                  <p>
                    <FaArrowCircleRight className="mt-2 ml-2 text-white text-lg "></FaArrowCircleRight>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div
          className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
        >
          <div className="card w-full   shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={Blockchain}
                alt="Shoes"
                className="rounded-xl w-20 h-20"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">Blockchain Development:</h2>
              <p className="h-20">
                Development of decentralized applications (DApps) and blockchain
                solutions
              </p>

              <Link to="/jobs">
                <div className="flex ">
                  <p className=" text-lg text-white font-bold">Click Here</p>
                  <p>
                    <FaArrowCircleRight className="mt-2 ml-2 text-white text-lg "></FaArrowCircleRight>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div
          className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
        >
          <div className="card w-full   shadow-xl">
            <figure className="px-10 pt-10">
              <img src={IoT} alt="Shoes" className="rounded-xl w-20 h-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">
                IoT (Internet of Things) Solutions:
              </h2>
              <p className="h-20">
                Development of applications and platforms for IoT devices.
              </p>

              <Link to="/jobs">
                <div className="flex ">
                  <p className=" text-lg text-white font-bold">Click Here</p>
                  <p>
                    <FaArrowCircleRight className="mt-2 ml-2 text-white text-lg "></FaArrowCircleRight>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div
          className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
        >
          <div className="card w-full   shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={security}
                alt="Shoes"
                className="rounded-xl w-20 h-20"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">Cybersecurity Services:</h2>
              <p className="h-28">
                Protection against cyber threats with security assessments and
                solutions
              </p>

              <Link to="/jobs">
                <div className="flex ">
                  <p className=" text-lg text-white font-bold">Click Here</p>
                  <p>
                    <FaArrowCircleRight className="mt-2 ml-2 text-white text-lg "></FaArrowCircleRight>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div
          className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
        >
          <div className="card w-full   shadow-xl">
            <figure className="px-10 pt-10">
              <img src={data} alt="Shoes" className="rounded-xl w-20 h-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">
                Data Analytics Services:
              </h2>
              <p className="h-28">
                Collection, analysis, and visualization of data to derive
                insights.
              </p>

              <Link to="/jobs">
                <div className="flex ">
                  <p className=" text-lg text-white font-bold">Click Here</p>
                  <p>
                    <FaArrowCircleRight className="mt-2 ml-2 text-white text-lg "></FaArrowCircleRight>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div
          className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
        >
          <div className="card w-full   shadow-xl">
            <figure className="px-10 pt-10">
              <img src={DevOps} alt="Shoes" className="rounded-xl w-20 h-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">DevOps Consulting:</h2>
              <p className="h-28">
                Implementation of DevOps practices for streamlined development
                and operations.
              </p>

              <Link to="/jobs">
                <div className="flex ">
                  <p className=" text-lg text-white font-bold">Click Here</p>
                  <p>
                    <FaArrowCircleRight className="mt-2 ml-2 text-white text-lg "></FaArrowCircleRight>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default ServiceSection;
