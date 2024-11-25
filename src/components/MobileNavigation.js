import React from "react";
import { mobileNavigation } from "../contants/Navigation";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <section className="lg:hidden h-16 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full">
      <div className="flex items-center justify-between h-full text-neutral-400 ">
        {mobileNavigation.map((nav) => {
          return (
            <NavLink
              to={nav.href} // Ensure each NavLink has a `to` prop
              key={nav.label + "mobilenavigation"}
              className={({ isActive }) =>
                `px-3 flex h-full items-center flex-col justify-center ${
                  isActive && "text-white"
                }`
              }
            >
              <div className="text-2xl">{nav.icon}</div>
              <p className="text-sm">{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNavigation;
