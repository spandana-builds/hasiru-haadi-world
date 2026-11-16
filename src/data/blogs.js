import gardenHero from "../assets/garden/hero.jpeg";
import gardenBed from "../assets/garden/bed.jpg";
import gardenTrellis from "../assets/garden/ridge-gaurd-on-trellis.jpg";
import gardenHarvest from "../assets/garden/harvest-radish.jpg";
import gardenMethi from "../assets/garden/methi-harvest.jpg";

import villageHero from "../assets/village/hero-village.jpg";
import villageField1 from "../assets/village/fields-1.jpg";
import villageField2 from "../assets/village/fields-2.jpg";
import villageLife from "../assets/village/village-life.jpg";
import villageSky from "../assets/village/village-sky.jpg";
import villageDetail from "../assets/village/village-5.jpg";

import farmHero from "../assets/farm/hero-img2.jpg";
import farm1 from "../assets/farm/eee.jpg";
import farm2 from "../assets/farm/img2.jpg";
import farm3 from "../assets/farm/img3.jpg";
import farm4 from "../assets/farm/img4.jpg";
import farm5 from "../assets/farm/img5.jpg";

import plantsHero from "../assets/plants/img10.jpg";
import plant1 from "../assets/plants/img1.jpg";
import plant2 from "../assets/plants/img2.jpg";
import plant3 from "../assets/plants/img3.jpg";
import plant4 from "../assets/plants/img4.jpg";
import plant5 from "../assets/plants/img5.jpg";
import plant6 from "../assets/plants/img6.jpg";
import plant7 from "../assets/plants/img7.jpg";
import plant8 from "../assets/plants/img8.jpg";
import plant9 from "../assets/plants/img9.jpg";

export const blogs = [
  {
    slug: "yerigenahalli",
    category: "VILLAGE CHRONICLES",
    title: "Yerigenahalli – A Place That Feels Like Peace",
    excerpt: "Quiet roads, green fields, familiar faces and the little things that make a place feel like home.",
    readTime: "3 min read",
    cover: villageHero,
    coverAlt: "Yerigenahalli village at dusk",
    introduction: "Some places stay with you not because they are grand, but because of how they make you feel. Yerigenahalli is one of those places for me.",
    paragraphs: [
      "Yerigenahalli is one of the most beautiful villages I have ever seen. Surrounded by cultivated fields, gentle mountains, and open skies, it offers sunrises and sunsets that quietly stay with you. It is my brother-in-law’s native place, and every visit reminds me how lucky my sister is to call this place home.",
      "They have cows, and honestly, the calves are one of the main reasons I keep coming back — I simply love them. There is a softness in the way life exists here, unhurried and sincere. The people of Yerigenahalli are kind-hearted and selfless, treating everyone like their own, with a warmth that doesn’t need words.",
      "The village is about 16 km from our home. On early mornings, I ride my scooty there. The journey itself feels like therapy — quiet roads, green crops on either side, little traffic, and the gentle glow of the sunrise. In those moments, everything feels peaceful and whole."
    ],
    closingThought: "Yerigenahalli reminds me that a simple life, lived close to nature and people, is often the richest.",
    gallery: [
      { src: villageField1, alt: "Cultivated crop fields in the village" },
      { src: villageField2, alt: "Farming work and a tractor" },
      { src: villageLife, alt: "Cows and calves in the village" },
      { src: villageSky, alt: "The village sky at sunset" },
      { src: villageDetail, alt: "A quiet village water body" }
    ]
  },
  {
    slug: "garden-we-built",
    category: "GARDEN DIARIES",
    title: "A Little Garden We Built Together",
    excerpt: "A story of two sisters, eight garden beds and the joy of growing something with our own hands.",
    readTime: "3 min read",
    cover: gardenHero,
    coverAlt: "A harvest from the Hasiru Haadi vegetable garden",
    introduction: "A garden does not have to begin with a perfect plan. Ours began with two sisters, a little space and the willingness to try.",
    paragraphs: [
      "My sister and I built our backyard garden with our own hands and a lot of patience. What began as a small experiment slowly grew into a space that feels deeply ours.",
      "We have eight garden beds in total. Four of them are shaped using coconut husk boundaries, while the other four are built with leftover cement bricks from our home construction. In these beds, we grow leafy greens like spinach, coriander, methi, dill, and pudina, along with peas, bitter gourd, radish, tomato, beans, ladies’ finger, chilli, and other seasonal crops.",
      "Each bed has its own drip irrigation system. We don’t rush the process—we let nature grow at its own pace. Some days bring a harvest, and other days are simply about checking the soil and noticing a little new growth."
    ],
    closingThought: "We lovingly call this space Hasiru Haadi Vegetable Garden — a green path that we walk every day.",
    gallery: [
      { src: gardenBed, alt: "Garden bed with a coconut husk boundary" },
      { src: gardenTrellis, alt: "Ridge gourd growing on a trellis" },
      { src: gardenHarvest, alt: "Freshly harvested radish" },
      { src: gardenMethi, alt: "Fresh methi harvest" }
    ]
  },
  {
    slug: "our-farm",
    category: "FARM STORIES",
    title: "The Land That Keeps Us Rooted",
    excerpt: "A little about our family farm, the trees we nurture and the care behind every new sapling.",
    readTime: "3 min read",
    cover: farmHero,
    coverAlt: "A view of our family farm",
    introduction: "For us, the farm is more than a piece of land. It is part of everyday life, shaped by the people who care for it.",
    paragraphs: [
      "Living in the heart of Kalpataru Naadu, our lives are shaded by the grace of coconut palms. Our farm, located just a walkable distance from our home, forms the center of our daily life. While the land provides, it is my father who nurtures it — he is the backbone of every development here.",
      "We cultivate a diverse ecosystem. Alongside the abundant coconut trees, we grow areca nut, mango, and cashew nut trees. Staying true to our roots, we also grow seasonal crops like ragi — our staple food — and green gram.",
      "Recently, taking a step toward further development, my father expanded the plantation by planting new saplings. To ensure the land thrives sustainably, we rely on a drip irrigation system sourced through a borewell, making careful and efficient use of every drop of water."
    ],
    closingThought: "It is a labor of love that sustains us, ensuring that our land flourishes for generations to come.",
    gallery: [
      { src: farm2, alt: "Coconut trees in our farm" },
      { src: farm3, alt: "Areca nut trees growing in the farm" },
      { src: farm1, alt: "Ragi crop growing in the field" },
      { src: farm4, alt: "The farm drip irrigation system" },
      { src: farm5, alt: "A view across the farm" }
    ]
  },
  {
    slug: "my-green-journey",
    category: "MY GREEN JOURNEY",
    title: "How a Lockdown Hobby Became My Green World",
    excerpt: "It began with a few reused containers, a terrace and the excitement of watching a new leaf appear.",
    readTime: "3 min read",
    cover: plantsHero,
    coverAlt: "Potted plants from my collection",
    introduction: "My plant journey did not begin in a nursery. It began at home, during a time when the world had slowed down.",
    paragraphs: [
      "My interest in growing plants started during the COVID-19 lockdown. With time slowing down, I began experimenting with a small terrace garden using plastic bottles and reused plastic boxes. It wasn’t planned or perfect, but it felt meaningful.",
      "I still remember the very first gardening video I watched on YouTube — “Plant Propagation in Soil and Water” by GardenUp (Ekta Chaudhary). Watching plants grow from simple cuttings inspired me deeply, and that’s where my journey truly began.",
      "From then on, I started collecting plants wherever I went — from relatives’ homes, friends’ houses, nurseries, and every place I could. Since my home was outside the village and I didn’t have many friends nearby, plants slowly became my closest companions.",
      "Every morning, I woke up with excitement to look for new growth — tiny leaves, fresh shoots, flowers blooming, and sometimes harvesting. Gardening became my therapy, my peace, and my quiet joy."
    ],
    closingThought: "Plants taught me patience, observation, and how small care can create something beautiful.",
    gallery: [
      { src: plant1, alt: "A young plant growing" },
      { src: plant2, alt: "New leaves emerging" },
      { src: plant3, alt: "A healthy potted plant" },
      { src: plant4, alt: "Plants from my home collection" },
      { src: plant5, alt: "A plant in the collection" },
      { src: plant6, alt: "Another plant from the collection" },
      { src: plant7, alt: "A leafy plant" },
      { src: plant8, alt: "A potted plant" },
      { src: plant9, alt: "A plant growing at home" }
    ]
  }
];

export function getBlogBySlug(slug) {
  return blogs.find((blog) => blog.slug === slug);
}
