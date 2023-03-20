import Image from "next/image";
import Link from "next/link";
import React from "react";

function Card({
  to,
  region,
  population,
  flag,
  capital,
  name,
}: {
  to: string;
  flag: {
    src: string;
    alt: string;
  };
  region: string;
  population: string;
  capital: string;
  name: string;
}) {
  const formatNumber = Intl.NumberFormat();
  const formattedPopulation = formatNumber.format(parseInt(population));
  const stringifiedPopulation = formattedPopulation.toString();

  return (
    <Link
      href={to}
      className=" dark:dark-element light-element   w-full rounded-sm shadow-gray-200 drop-shadow-md active:scale-95 dark:shadow-gray-700 sm:w-72"
    >
      <div className=" relative h-64 w-full sm:h-40 sm:w-72">
        <Image
          src={flag.src}
          alt={flag.alt || "image"}
          fill
          sizes="(max-width: 640px) 100%, 
              (max-width: 3000px) 288px,"
          className=" h-auto w-auto rounded-t-sm"
        />
      </div>

      <div className="p-5">
        <p className="text-2xl font-semibold">{name}</p>

        <div className="mt-2">
          <p>Population: {stringifiedPopulation}</p>
          <p>Region: {region}</p>
          <p>Capital: {capital}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
