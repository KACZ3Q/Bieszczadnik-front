import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LimitedContent from './LimitedContent';

const SzlakCard = ({ szlak }) => {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338';
  
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
        <LimitedContent zawartosc={szlak.attributes.zawartosc} />
      </CardContent>
      <CardFooter className='underline'>
        <Link href={`/szlaki/${szlak.attributes.slug}`}>
            Czytaj więcej
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SzlakCard;
