import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
  const Navigation = [
    {
      label: "Tv Shows",
      href: "tv",
    },
    {
      label: "Movies",
      href: "movies",
    },
  ];

  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/search?q=${searchInput}`);
  }, [searchInput]);

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75">
      <div className="container mx-auto px-3 flex items-center h-full">
        <div className="">
          <img src={logo} alt="" width={120} />
        </div>
        <nav className="hidden lg:flex items-center gap-2 ml-5">
          {Navigation.map((item, index) => {
            return (
              <div>
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={(isActive) =>
                    `px-2 hover:text-neutral-300 $(isActive)`
                  }
                >
                  {item.label}
                </NavLink>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-5 ">
          <form action="" className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search Here ..."
              className="bg-transparent px-4 py-1 "
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>

          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
            <img src={userIcon} className="w-full h-full" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
