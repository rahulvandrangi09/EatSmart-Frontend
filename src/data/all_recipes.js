// indian_recipes.js
const r1_img = "/assets/r1_img.jpg";
const r2_img = "/assets/r2_img.jpg";
const r3_img = "/assets/r3_img.jpg";
const r4_img = "/assets/r4_img.jpg";
const r5_img = "/assets/r5_img.jpg";
const r6_img = "/assets/r6_img.jpg";
const r7_img = "/assets/r7_img.jpg";
const r8_img = "/assets/r8_img.jpg";
const r9_img = "/assets/r9_img.jpg";
const r10_img = "/assets/r10_img.jpg";
const r11_img = "/assets/r11_img.jpg";
const r12_img = "/assets/r12_img.jpg";

let indian_recipes = [
  {
    id: "rec-1",
    name: "Chicken Biryani",
    category: "smartrecipes",
    image: r1_img,
    description: "Fragrant basmati rice cooked with spiced chicken.",
    procedure:
      "Wash rice and soak for 30 mins. Cook chicken with spices, ginger, and garlic. Add yogurt and let it cook. Half-boil rice separately. Layer rice and chicken, sprinkle fried onions, mint, and saffron water. Cook on low flame (dum) for 20 mins. Serve hot with raita.",
  },
  {
    id: "rec-2",
    name: "Paneer Butter Masala",
    category: "smartrecipes",
    image: r2_img,
    description: "Creamy tomato-based curry with paneer cubes.",
    procedure:
      "Fry onions, ginger, and garlic until golden. Add tomato puree, cook with spices. Blend into smooth gravy. Add butter and cream for richness. Toss in paneer cubes and simmer for 5–7 mins. Garnish with coriander and serve with naan or rice.",
  },
  {
    id: "rec-3",
    name: "Masala Dosa",
    category: "smartrecipes",
    image: r3_img,
    description: "Crispy rice crepe with spiced potato filling.",
    procedure:
      "Ferment dosa batter overnight. Prepare potato filling with boiled potatoes, onions, curry leaves, green chili, and turmeric. Heat dosa tawa, spread batter thin, drizzle oil. Place potato masala inside, fold dosa, and serve with chutney and sambar.",
  },
  {
    id: "rec-4",
    name: "Chole Bhature",
    category: "smartrecipes",
    image: r4_img,
    description: "Spicy chickpeas with fried fluffy bread.",
    procedure:
      "Soak chickpeas overnight, cook with onion, tomato, ginger, garlic, and chole masala. Knead dough with flour, yogurt, and baking soda, rest for 2 hrs. Roll into discs and deep fry to make bhature. Serve hot with chole, onions, and pickle.",
  },
  {
    id: "rec-5",
    name: "Rogan Josh",
    category: "smartrecipes",
    image: r5_img,
    description: "Kashmiri lamb curry rich in spices.",
    procedure:
      "Marinate lamb with yogurt, ginger, and garlic. Fry whole spices in oil, add onions, then lamb. Cook with Kashmiri chili and yogurt gravy. Simmer until meat is tender and flavors are absorbed. Garnish with coriander, serve with rice or naan.",
  },
  {
    id: "rec-6",
    name: "Butter Chicken",
    category: "smartrecipes",
    image: r6_img,
    description: "Creamy chicken curry with smoky flavor.",
    procedure:
      "Marinate chicken with yogurt, lemon, and spices. Grill or roast until slightly charred. Prepare tomato-based gravy with butter, cream, and spices. Add chicken pieces, simmer for 10–15 mins. Garnish with cream and coriander, serve with naan.",
  },
  {
    id: "rec-7",
    name: "Rajma Chawal",
    category: "smartrecipes",
    image: r7_img,
    description: "Red kidney beans curry served with rice.",
    procedure:
      "Soak rajma overnight, cook in pressure cooker. Prepare onion-tomato gravy with ginger, garlic, and spices. Add rajma and simmer until thick. Garnish with coriander. Serve with steamed rice and salad.",
  },
  {
    id: "rec-8",
    name: "Hyderabadi Haleem",
    category: "smartrecipes",
    image: r8_img,
    description: "Slow-cooked meat and lentil delicacy.",
    procedure:
      "Soak lentils, wheat, and rice. Cook mutton with ginger-garlic paste and spices. Blend lentils into paste. Mix meat and lentils, cook slowly while stirring. Garnish with fried onions, mint, lemon, and ghee. Serve hot in bowls.",
  },
  {
    id: "rec-9",
    name: "Idli Sambar",
    category: "smartrecipes",
    image: r9_img,
    description: "Soft rice cakes served with lentil soup.",
    procedure:
      "Ferment idli batter overnight. Steam in idli molds. Prepare sambar with toor dal, tamarind, and spices. Add drumsticks, brinjal, or veggies. Season with curry leaves and mustard seeds. Serve hot with coconut chutney.",
  },
  {
    id: "rec-10",
    name: "Pav Bhaji",
    category: "smartrecipes",
    image: r10_img,
    description: "Spicy mashed vegetable curry with buns.",
    procedure:
      "Boil potatoes, peas, and cauliflower. Mash and cook with butter, onions, tomatoes, capsicum, and pav bhaji masala. Toast pav buns with butter. Serve bhaji hot with chopped onions, coriander, lemon, and pav.",
  },
  {
    id: "rec-11",
    name: "Fish Curry (Goan Style)",
    category: "smartrecipes",
    image: r11_img,
    description: "Tangy coconut-based fish curry.",
    procedure:
      "Grind coconut with spices into a paste. Cook onions, tomatoes, and the paste. Add koku./assets/tamarind for sourness. Slide in fish pieces and simmer for 10 mins. Garnish with coriander. Serve with steamed rice.",
  },
  {
    id: "rec-12",
    name: "Gulab Jamun",
    category: "smartrecipes",
    image: r12_img,
    description: "Milk-solid dumplings soaked in syrup.",
    procedure:
      "Make dough with khoya, flour, and a little milk. Roll into balls, fry on low flame until golden. Prepare sugar syrup with cardamom and rose water. Soak fried balls in warm syrup for 2–3 hrs. Serve warm or cold.",
  },
];

export default indian_recipes;
