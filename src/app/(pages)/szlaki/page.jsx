import { fetchAPI } from '@/lib/api';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default async function Szlaki() {
  const szlaki = await fetchAPI('/szlaki');

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {szlaki.data.map((szlak) => (
          <Card key={szlak.id}>
            <CardHeader>
              <h2 className="text-2xl font-bold mb-2">{szlak.attributes.tytul}</h2>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{szlak.attributes.opis}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/szlaki/${szlak.attributes.slug}`}>
                Czytaj więcej
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
