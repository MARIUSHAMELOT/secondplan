import camille from "@/assets/arch-camille.jpg";
import hugo from "@/assets/arch-hugo.jpg";
import sarah from "@/assets/arch-sarah.jpg";

export type Architect = {
  id: string;
  name: string;
  title: string;
  city: string;
  rating: number;
  visits: number;
  tags: string[];
  startingPrice: number;
  availability: string;
  photo: string;
  bio: string;
  verified: boolean;
};

export const architects: Architect[] = [
  {
    id: "camille-martin",
    name: "Camille Martin",
    title: "Architecte HMONP",
    city: "Paris",
    rating: 4.9,
    visits: 128,
    tags: ["Appartements anciens", "Rénovation", "Optimisation d’espace"],
    startingPrice: 290,
    availability: "Disponible cette semaine",
    photo: camille,
    bio: "Spécialiste des appartements haussmanniens, j’aide acheteurs et propriétaires à révéler le potentiel d’un bien avant de prendre leur décision.",
    verified: true,
  },
  {
    id: "hugo-bernard",
    name: "Hugo Bernard",
    title: "Architecte DPLG",
    city: "Lyon",
    rating: 4.8,
    visits: 96,
    tags: ["Maisons", "Extensions", "Faisabilité travaux"],
    startingPrice: 350,
    availability: "Disponible sous 48h",
    photo: hugo,
    bio: "J’interviens sur des maisons individuelles et des projets d’extension. Mon objectif : vous donner une lecture technique claire du bien.",
    verified: true,
  },
  {
    id: "sarah-benali",
    name: "Sarah Benali",
    title: "Architecte d’intérieur",
    city: "Bordeaux",
    rating: 5.0,
    visits: 64,
    tags: ["Projection", "Agencement", "Valorisation immobilière"],
    startingPrice: 250,
    availability: "Disponible samedi",
    photo: sarah,
    bio: "J’accompagne particuliers et agents pour se projeter dans un bien et imaginer son agencement futur.",
    verified: true,
  },
];
