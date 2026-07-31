import "./Categories.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImagePlaceholder from "../UI/ImagePlaceholder/ImagePlaceholder";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import categories from "../../data/categories";

function Categories() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleSearch = (event) => {
      setSearchQuery(event.detail || "");
    };

    window.addEventListener("luxe-bag-search", handleSearch);

    return () => {
      window.removeEventListener("luxe-bag-search", handleSearch);
    };
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section id="categories" className="categories-section">
      <div className="container">
        <SectionTitle
          subtitle="Browse Collections"
          title="Shop by Category"
        />

        <div className="categories-grid">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <article
                id={category.slug}
                className="category-card"
                key={category.id}
              >
                <div className="category-image">
                  {category.previewImage || category.products?.[0]?.image ? (
                    <img
                      src={category.previewImage || category.products[0].image}
                      alt={category.title}
                      className="category-card-image"
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>

                <div className="category-content">
                  <h3>{category.title}</h3>

                  <p>{category.description}</p>

                  <Link
                    to={`/category/${category.slug}`}
                    className="category-btn"
                  >
                    Explore Collection
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="no-results">
              No results found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Categories;