"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SzlakCard from "@/app/_components/Card"; // Importuj komponent SzlakCard

const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1338';

export default function Home() {
  const [szlaki, setSzlaki] = useState([]);

  useEffect(() => {
    const fetchSzlaki = async () => {
      const response = await fetch(`${API_URL}/api/szlaki?populate=*&pagination[limit]=3&sort[0]=createdAt:desc`);
      const data = await response.json();
      setSzlaki(data.data);
    };

    fetchSzlaki();
  }, []);

  return (
    <main className="mx-auto">
      <div className="relative h-[100vh]">
        <Image
          src="/bieszczady.jpg"
          alt="Bieszczady Background"
          quality={100}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, rgba(229, 231, 235, 1) 100%)" }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold">
            BIESZCZADY
          </h1>
        </div>
      </div>
      <div className="relative bg-gray-200 py-24 px-4">
        <div className="relative container mx-auto">
          <blockquote className="text-center text-xl italic text-gray-700">
            "W Bieszczadach nikogo nie interesuje, kim jesteś i skąd pochodzisz.
            Jeżeli się tu znalazłeś, to znaczy, że góry cię przywołały. Dla nich
            nie jest ważne twoje imię. Liczy się tylko, jak ciężko potrafisz
            pracować i czy umiesz żyć z nimi w zgodzie. W Bieszczadach można się
            ukryć, zmienić tożsamość, być wolnym. W Bieszczady przyjeżdża się raz,
            później tylko się wraca."
          </blockquote>
          <p className="text-center text-lg text-gray-500 mt-4">
            - Emilia Szelest
          </p>
        </div>
      </div>
      <div className="container mx-auto py-24 px-4">
        
        <h2 className="text-3xl font-bold mb-8"> Niektóre z Szlaków</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {szlaki.map((szlak) => (
            <SzlakCard key={szlak.id} szlak={szlak} />
          ))}
        </div>
      </div>
    </main>
  );
}
