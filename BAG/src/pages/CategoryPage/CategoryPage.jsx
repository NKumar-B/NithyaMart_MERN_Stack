import { useParams, Link } from "react-router-dom";
import categories from "../../data/categories";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./CategoryPage.css";

function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return (
      <>
        <Navbar />
        <main className="category-page">
          <div className="container">
            <div className="category-empty">
              <h1>Category not found</h1>
              <Link to="/" className="back-link">
                Return to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="category-page">
        <div className="container">
          <div className="category-header">
            <h1>{category.title}</h1>
            <Link to="/" className="back-link">
              ← Back to Categories
            </Link>
          </div>

          <div className="category-gallery">
            {category.products.slice(0, 4).map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CategoryPage;
