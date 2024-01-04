import { useState } from "react";
import logo from "../../../assets/small-Image .jpeg";
import { Button } from "../../Buttons/Button";
import { ArrowLeft, Bell, Camera, Menu, Mic, Search, User } from "lucide-react";

function PageHeader(): JSX.Element {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      {/* LEFT: Logo and left-modal */}
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>

        <a href="/">
          <img
            src={logo}
            className="h-6"
            style={{ width: "100px", height: "auto" }}
          />
        </a>
      </div>

      {/* MIDDLE: Search input and button  */}
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}>
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
            title="Back">
            <ArrowLeft />
          </Button>
        )}

        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary
            py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>

        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>

      {/* RIGHT: Other buttons */}
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}>
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden">
          <Search />
        </Button>

        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>

        <Button size="icon" variant="ghost">
          <Camera />
        </Button>

        <Button size="icon" variant="ghost">
          <Bell />
        </Button>

        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

export default PageHeader;
