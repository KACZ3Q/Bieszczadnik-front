import React from 'react';
import { fetchAPI } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import MapComponent from '@/app/_components/Map';
import Content from '@/app/_components/Content';


export async function generateStaticParams() {
  const szlaki = await fetchAPI('/szlaki');
  return szlaki.data.map((szlak) => ({
    slug: szlak.attributes.slug,
  }));
}

export default async function Szlak({ params }) {
  const { slug } = params;
  const response = await fetchAPI(`/szlaki?filters[slug][$eq]=${slug}&populate=*`);
  const szlak = response.data[0];

  if (!szlak) {
    notFound();
  }

  const breadcrumbItems = [
    { href: '/szlaki', label: 'Szlaki' },
    { href: `/szlaki/${szlak.attributes.slug}`, label: szlak.attributes.tytul },
  ];

  const startCoords = szlak.attributes.PoczatekSzlaku.coordinates;
  const endCoords = szlak.attributes.KoniecSzlaku.coordinates;

  return (
    <div className="container mx-auto p-4 mt-24 min-h-screen">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={breadcrumbItems[0].href}>{breadcrumbItems[0].label}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcrumbItems[1].label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Content zawartosc={szlak.attributes.zawartosc} />
      <div className="mt-8">
        <MapComponent startCoords={startCoords} endCoords={endCoords} />
      </div>
    </div>
  );
}
