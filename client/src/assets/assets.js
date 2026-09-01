import logo from "./logo.png";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg from "./main_banner_bg.jpg";
import main_banner_bg_sm from "./main_banner_bg_sm.png";
import bottom_banner_image from "./bottom_banner_image.png";
import bottom_banner_image_sm from "./bottom_banner_image_sm.png";
import add_address_image from "./add_address_image.svg";
import bracelet from "./bracelet.png";
import necklace from "./necklace.png";
import men from "./men.png";
// import party from "./party.png";
import crochet from "./crochet.png";
import couple from "./couple.png";

export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_image,
  box_icon,
};

export const categories = [
  {
    text: "Bracelets",
    path: "Bracelets",
    image: bracelet,
    bgColor: "#E8D6E2",
  },
  {
    text: "Necklaces",
    path: "Necklaces",
    image: necklace,
    bgColor: "#E8D6E2",
  },
  {
    text: "For Men",
    path: "Men",
    image: men,
    bgColor: "#E8D6E2",
  },
  {
    text: "Couple Bracelets",
    path: "Couple",
    image: couple,
    bgColor: "#E8D6E2",
  },
  {
    text: "Crochet",
    path: "Crochet",
    image: crochet,
    bgColor: "#E8D6E2",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "/" },
      { text: "Best Sellers", url: "/products" },
      { text: "Offers & Deals", url: "/products" },
      { text: "Contact Us", url: "/contact" },
      { text: "FAQs", url: "/faqs" },
    ],
  },

  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "/delivery-information" },
      { text: "Return & Refund Policy", url: "/return-refund-policy" },
      { text: "Payment Methods", url: "/payment-methods" },
      { text: "Track your Order", url: "/my-orders" },
      { text: "Contact Us", url: "/contact" },
    ],
  },

  {
    title: "Follow Us",
    links: [
      {
        text: "Instagram",
        url: "https://www.instagram.com/stylic.pk",
        target: "_blank",
      },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fast & Reliable Delivery",
    description:
      "Beautiful jewelry delivered safely to your doorstep.",
  },
  {
    icon: leaf_icon,
    title: "Quality You Can Trust",
    description:
      "Carefully selected jewelry made to elevate your style.",
  },
  {
    icon: coin_icon,
    title: "Affordable Elegance",
    description:
      "Trendy and stylish jewelry at prices you'll love.",
  },
  {
    icon: trust_icon,
    title: "Made for Every Moment",
    description:
      "Perfect pieces for everyday looks, celebrations, and special moments.",
  },
];