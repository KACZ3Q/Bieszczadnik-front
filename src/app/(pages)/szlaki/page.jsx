"use client";
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import SzlakCard from '@/app/_components/Card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Szlaki() {
  const [szlaki, setSzlaki] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('wszystkie');

  useEffect(() => {
    const fetchSzlaki = async () => {
      let endpoint = '/szlaki?populate=*';
      if (selectedDifficulty !== 'wszystkie') {
        endpoint += `&filters[$and][0][Trudnosc][$eq]=${selectedDifficulty}`;
      }
      const response = await fetchAPI(endpoint);
      setSzlaki(response.data);
    };

    fetchSzlaki();
  }, [selectedDifficulty]);

  return (
    <div className="container mx-auto p-4 mt-24 min-h-screen">
      <div className="mb-4 flex justify-end">
        <Select onValueChange={(value) => setSelectedDifficulty(value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Wszystkie" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Trudność</SelectLabel>
              <SelectItem value="wszystkie">Wszystkie</SelectItem>
              <SelectItem value="łatwy">Łatwy</SelectItem>
              <SelectItem value="średni">Średni</SelectItem>
              <SelectItem value="trudny">Trudny</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {szlaki.map((szlak) => (
          <SzlakCard key={szlak.id} szlak={szlak} />
        ))}
      </div>
    </div>
  );
}
