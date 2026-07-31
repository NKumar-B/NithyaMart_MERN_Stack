import luxury1 from "../assets/products/randompics/luxury-1.png";
import luxury2 from "../assets/products/randompics/luxury-2.png";
import luxury3 from "../assets/products/randompics/luxury-3.png";
import luxury4 from "../assets/products/randompics/luxury-4.png";
import luxuryPreview from "../assets/categories/luxury-handbags.jpg";

import school1 from "../assets/products/randompics/school-1.png";
import school2 from "../assets/products/randompics/school-2.png";
import school3 from "../assets/products/randompics/school-3.png";
import school4 from "../assets/products/randompics/school-4.png";
import schoolPreview from "../assets/categories/school-bags.jpg";

import office1 from "../assets/products/randompics/office-1.png";
import office2 from "../assets/products/randompics/office-2.png";
import office3 from "../assets/products/randompics/office-3.png";
import office4 from "../assets/products/randompics/office-4.png";
import officePreview from "../assets/categories/office-bags.jpg";

import travel1 from "../assets/products/randompics/travel-1.png";
import travel2 from "../assets/products/randompics/travel-2.png";
import travel3 from "../assets/products/randompics/travel-3.png";
import travel4 from "../assets/products/randompics/travel-4.png";
import travelPreview from "../assets/categories/travel-bags.jpg";

const categories = [
  {
    id: 1,
    slug: "luxury-handbags",
    title: "Luxury Handbags",
    previewImage: luxuryPreview,
    products: [
      { id: "luxury-1", name: "Monogram Classic", image: luxury1 },
      { id: "luxury-2", name: "Velvet Clutch", image: luxury2 },
      { id: "luxury-3", name: "Leather Satchel", image: luxury3 },
      { id: "luxury-4", name: "Golden Tote", image: luxury4 },
    ],
  },
  {
    id: 2,
    slug: "school-bags",
    title: "School Bags",
    previewImage: schoolPreview,
    products: [
      { id: "school-1", name: "Campus Backpack", image: school1 },
      { id: "school-2", name: "Student Rolltop", image: school2 },
      { id: "school-3", name: "Boarding Bag", image: school3 },
      { id: "school-4", name: "Geometry Satchel", image: school4 },
    ],
  },
  {
    id: 4,
    slug: "office-bags",
    title: "Office Bags",
    previewImage: officePreview,
    products: [
      { id: "office-1", name: "Executive Brief", image: office1 },
      { id: "office-2", name: "Laptop Portfolio", image: office2 },
      { id: "office-3", name: "Business Tote", image: office3 },
      { id: "office-4", name: "Conference Satchel", image: office4 },
    ],
  },
  {
    id: 5,
    slug: "travel-bags",
    title: "Travel Bags",
    previewImage: travelPreview,
    products: [
      { id: "travel-1", name: "Weekender Tote", image: travel1 },
      { id: "travel-2", name: "Passport Carrier", image: travel2 },
      { id: "travel-3", name: "Luggage Backpack", image: travel3 },
      { id: "travel-4", name: "Aviator Duffel", image: travel4 },
    ],
  },
];

export default categories;
