import * as React from 'react';
import { fetchAPI } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export async function generateStaticParams() {
  const szlaki = await fetchAPI('/szlaki');
  return szlaki.data.map((szlak) => ({
    slug: szlak.attributes.slug,
  }));
}

export default async function Szlak({ params }) {
  const { slug } = params;
  const response = await fetchAPI(`/szlaki/${slug}`);
  const szlak = response.data;

  if (!szlak) {
    notFound();
  }

  const breadcrumbItems = [
    { href: '/szlaki', label: 'Szlaki' },
    { href: `/${szlak.attributes.slug}`, label: szlak.attributes.tytul },
  ];

  return (
    <div className="container mx-auto p-4">
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
      <h1 className="text-4xl font-bold mb-4">{szlak.attributes.opis}</h1>
      <div className="content mt-4">
        {szlak.attributes.zawartosc && szlak.attributes.zawartosc.map((section, index) => (
          <p key={index}>{section.children[0].text}</p>
        ))}
      </div>
    </div>
  );
}
