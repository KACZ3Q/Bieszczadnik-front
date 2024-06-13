import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SzlakCard = ({ szlak }) => {
  const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1338';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {szlak.attributes.tytul}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {szlak.attributes.zdjecie && szlak.attributes.zdjecie.data && szlak.attributes.zdjecie.data.attributes.formats.small && (
          <img
            className='h-52 w-full object-cover mb-2 rounded-lg'
            src={`${API_URL}${szlak.attributes.zdjecie.data.attributes.formats.small.url}`}
            alt={szlak.attributes.tytul}
          />
        )}
        {szlak.attributes.opis}
      </CardContent>
      <CardFooter>
        <Link href={`/szlaki/${szlak.attributes.slug}`}>
          <u>
            Czytaj więcej
          </u>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SzlakCard;
