import { Sevillana, Michroma, Roboto, Montserrat } from "next/font/google";
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], style: "italic" });
export const sevillana = Sevillana({ weight: ["400"], subsets: ["latin"] });
export const michroma = Michroma({ weight: ["400"], subsets: ["latin"] });
export const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
