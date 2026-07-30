import { useEffect, useState } from "react";
import "./Navbar.css";

import {
  categories,
  brands,
  navigationLinks,
} from "./navbarData";
import { useShop } from "../../context/ShopContext";
import BadgeCounter from "../UI/BadgeCounter/BadgeCounter";
import ShopDrawer from "../ShopDrawer/ShopDrawer";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);

  const [categoryMenu, setCategoryMenu] = useState(false);

  const [brandMenu, setBrandMenu] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [drawerType, setDrawerType] = useState(null);

  const { wishlist, cart, wishlistCount, cartCount } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchText.trim();
    window.dispatchEvent(
      new CustomEvent("luxe-bag-search", {
        detail: query,
      })
    );

    const target = query
      ? document.querySelector(
          `#${query.toLowerCase().replace(/\s+/g, "-")}`
        )
      : document.querySelector("#categories");

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    window.dispatchEvent(
      new CustomEvent("luxe-bag-search", {
        detail: "",
      })
    );
  };

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);

    setCategoryMenu(false);

    setBrandMenu(false);
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);

    setCategoryMenu(false);

    setBrandMenu(false);
  };

  const handleWishlistClick = () => {
    setDrawerType("wishlist");
  };

  const handleCartClick = () => {
    setDrawerType("cart");
  };

  const closeDrawer = () => {
    setDrawerType(null);
  };

  return (
    <header
      className={
        isScrolled
          ? "navbar navbar-scroll"
          : "navbar"
      }
    >
      <div className="navbar-container">

        {/* Logo */}

        <div className="logo">
          <a href="#">
            LuxeBags
          </a>
        </div>

        {/* Desktop Navigation */}

        <nav className="desktop-nav">

          <ul className="nav-links">

            {/* Search */}

            <li className="search-item">
              <form
                className="search-form"
                onSubmit={handleSearch}
              >
                <input
                  type="text"
                  placeholder="Search luxury bags..."
                  className="search-box"
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                />
                {searchText && (
                  <button
                    type="button"
                    className="search-clear"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="search-submit"
                >
                  Search
                </button>
              </form>
            </li>

            {/* Categories */}

            <li
              className="dropdown"
              onMouseEnter={() => setCategoryMenu(true)}
              onMouseLeave={() => setCategoryMenu(false)}
            >
              <button className="nav-button">
                Categories ▾
              </button>

              {categoryMenu && (
                <div className="dropdown-menu">

                  {categories.map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                    >
                      {item.name}
                    </a>
                  ))}

                </div>
              )}
            </li>

            {/* Brands */}

            <li
              className="dropdown"
              onMouseEnter={() => setBrandMenu(true)}
              onMouseLeave={() => setBrandMenu(false)}
            >
              <button className="nav-button">
                Brands ▾
              </button>

              {brandMenu && (
                <div className="dropdown-menu">

                  {brands.map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                    >
                      {item.name}
                    </a>
                  ))}

                </div>
              )}
            </li>

            {/* Normal Links */}

            {navigationLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  className="nav-link"
                >
                  {item.name}
                </a>
              </li>
            ))}

          </ul>

        </nav>

        {/* Right Icons */}

        <div className="nav-icons">

          <button
            type="button"
            className="icon-btn"
            title="Wishlist"
            onClick={handleWishlistClick}
          >
            ♡
            {drawerType === "wishlist" && wishlistCount > 0 && (
              <BadgeCounter count={wishlistCount} />
            )}
          </button>

          <button
            type="button"
            className="icon-btn"
            title="Cart"
            onClick={handleCartClick}
          >
            🛒
            {drawerType === "cart" && cartCount > 0 && (
              <BadgeCounter count={cartCount} />
            )}
          </button>

          <button
            className="hamburger"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>

        </div>

      </div>

      <ShopDrawer
        type={drawerType}
        items={drawerType === "wishlist" ? wishlist : cart}
        count={drawerType === "wishlist" ? wishlistCount : cartCount}
        onClose={closeDrawer}
      />

      {/* Mobile Menu */}

      <div
        className={
          mobileMenu
            ? "mobile-menu active"
            : "mobile-menu"
        }
      >

        <form
          className="mobile-search-wrapper"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="mobile-search"
            placeholder="Search luxury bags..."
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
          />
          {searchText && (
            <button
              type="button"
              className="search-clear mobile-clear"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="search-submit mobile-search-btn"
          >
            Go
          </button>
        </form>

        <button
          className="mobile-dropdown-btn"
          onClick={() =>
            setCategoryMenu(!categoryMenu)
          }
        >
          Categories ▾
        </button>

        {categoryMenu && (
          <div className="mobile-dropdown">

            {categories.map((item) => (
              <a
                key={item.id}
                href={item.link}
                onClick={closeMobileMenu}
              >
                {item.name}
              </a>
            ))}

          </div>
        )}

        <button
          className="mobile-dropdown-btn"
          onClick={() =>
            setBrandMenu(!brandMenu)
          }
        >
          Brands ▾
        </button>

        {brandMenu && (
          <div className="mobile-dropdown">

            {brands.map((item) => (
              <a
                key={item.id}
                href={item.link}
                onClick={closeMobileMenu}
              >
                {item.name}
              </a>
            ))}

          </div>
        )}

        {navigationLinks.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="mobile-link"
            onClick={closeMobileMenu}
          >
            {item.name}
          </a>
        ))}

      </div>

    </header>
  );
}

export default Navbar;