import React from 'react';
import { Link } from 'react-router-dom';
import './ibaco.css';

const categories = [
  {
    key: 'tub',
    label: 'Tubs',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-19.png'
  },
  {
    key: 'scoop',
    label: 'Single Scoops',
    image: 'https://www.ibaco.in/assets/img/sundaes/IBACO---Cotton-Candy.png'
  },
  {
    key: 'sundae',
    label: 'Sundaes',
    image: 'https://www.ibaco.in/assets/img/sundaes/IBACO---Bubblegum.png'
  },
  {
    key: 'cone',
    label: 'Cones',
    image: 'https://www.ibaco.in/assets/img/cones/Ibaco-Signature-Cones-2024.jpg'
  },
  {
    key: 'bar',
    label: 'Signature Bars',
    image: 'https://www.ibaco.in/assets/img/bars/Ibaco-%20Signature-Bars-New-Desktop.jpg'
  },
  {
    key: 'shake',
    label: 'Shakes',
    image: 'https://www.ibaco.in/assets/img/Ice-cream-shakes-mob1.jpg'
  },
  {
    key: 'cake',
    label: 'Cakes',
    image: 'https://www.ibaco.in/assets/img/cakes/cake1.png'
  },
  {
    key: 'combo',
    label: 'Combos',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-33.png'
  }
];

const IbacoHome = () => {
  return (
    <div className="ibaco-home">
      <div
        className="ibaco-banner"
        style={{
          backgroundImage:
            "linear-gradient(rgba(60,20,20,0.45), rgba(60,20,20,0.55)), url('https://www.ibaco.in/assets/img/cones/Ibaco-Signature-Cones-2024.jpg')"
        }}
      >
        <span className="ibaco-eyebrow">Est. in the Mall Food Court</span>
        <h1>Ibaco</h1>
        <p>Belgian Style Ice Creams, Crafted Daily</p>
        <Link to="menu" className="ibaco-btn">Explore the Menu</Link>
      </div>

      <div className="ibaco-section-heading">
        <h2>Our Collections</h2>
        <p>Hand-picked favourites, made fresh every day</p>
      </div>

      <div className="ibaco-categories">
        {categories.map((cat) => (
          <Link to={`/shops/ibaco/menu?category=${cat.key}`} className="ibaco-category-card" key={cat.key}>
            <img src={cat.image} alt={cat.label} />
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IbacoHome;
