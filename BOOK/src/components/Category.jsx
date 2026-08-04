import "./Category.css";

function Category({ category, setCategory, categories = ["All", "Fiction", "Self Help", "Finance"] }) {
  return (
    <div className="category-buttons">
      {categories.map((cat) => (
        <button
          key={cat}
          className={category === cat ? "active" : ""}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Category;
