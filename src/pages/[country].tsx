import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineWest } from "react-icons/md";

function Country({
  countriesData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //the countriesData comes in an array bc we sorted by name, im taking the first one as it's always the one in english.
  const countriesDataNew = countriesData[0];

  //yea i had to do this because Object had a type of unkown which stopped my code from working
  const object: any = Object;

  //nativename is an object with objects nested inside it so i got the first one there as well
  //gonna start spamming ternaries everywhere cuz some stuff like antarctica doesnt have these objects/valeus inside the api request
  const firstNativeName = object.values(countriesDataNew.name.nativeName)[0]
    ? object.values(countriesDataNew.name.nativeName)[0].common
    : "No native name";

  const currency = object.values(countriesDataNew.currencies)[0]
    ? object.values(countriesDataNew.currencies)[0].name
    : "No currency";

  const languages = object.values(countriesDataNew.languages);
  const languagesJsx = languages.map((language: JSX.Element, index: number) => (
    <p key={index}>{language}</p>
  ));

  const domain = countriesDataNew.tld[0];
  const formatNumber = Intl.NumberFormat();
  const formattedPopulation = formatNumber.format(
    parseInt(countriesDataNew.population)
  );
  const stringifiedPopulation = formattedPopulation.toString();

  //turned into a component because ill maybe need it later
  function Button({
    className,
    children,
  }: {
    className?: string;
    children: any;
  }) {
    return (
      <button
        className={`${className} light-element dark:dark-element  rounded-sm px-6  py-1 
        shadow-md outline-none active:scale-90 `}
      >
        {children}
      </button>
    );
  }

  const borders = countriesDataNew.borders.map((border, index) => {
    return <Button key={index}> {border}</Button>;
  });

  function Statistic(props: { title: string; children: string | undefined }) {
    return (
      <div className="mb-4  flex items-center gap-2">
        <p className="font-semibold">{props.title}: </p>
        <div className="flex items-center gap-1">{props.children}</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{countriesDataNew.name.common}</title>
        <meta
          name="description"
          content={`A handful of information about the country ${countriesDataNew.name.common}.`}
        />
      </Head>

      <div className=" flex flex-1 grid-cols-2  flex-col items-center p-8 px-10 lg:mt-10 lg:flex-row lg:gap-20  xl:gap-40 xl:px-20">
        <div className="relative flex   w-full flex-col lg:w-2/5">
          <Link href="/">
            <Button className=" mb-10 flex items-center gap-1 py-1 md:px-8 md:py-3">
              <MdOutlineWest />
              Back
            </Button>
          </Link>

          <div className="relative   w-full   py-10">
            <img
              src={countriesDataNew.flags.png}
              alt={countriesDataNew.flags.alt}
              className="max-h-[400px]  w-full max-w-[700px] bg-cover  "
            />
          </div>
        </div>

        {countriesDataNew.name.common === "Azerbaijan" ? (
          <p className="absolute left-1/2 top-0 -translate-x-1/2 text-xl font-semibold ">
            You're now on the page of my country :b
          </p>
        ) : null}

        <div className="   w-full lg:w-3/5 xl:w-2/5">
          <p className="pb-6 text-4xl font-semibold md:mb-4 lg:mt-20">
            {countriesDataNew.name.common}
          </p>

          <div className="flex flex-col justify-between sm:flex-row">
            <div>
              <Statistic title="Native Name">
                {countriesDataNew.name.nativeName === undefined
                  ? "No native name.."
                  : firstNativeName}
              </Statistic>

              <Statistic title="Capital">
                {countriesDataNew.capital.length === 0
                  ? "No capital"
                  : countriesDataNew.capital}
              </Statistic>

              <Statistic title="Population">{stringifiedPopulation}</Statistic>
              <Statistic title="Region">{countriesDataNew.region}</Statistic>
              <Statistic title="Sub Region">
                {countriesDataNew.subregion}
              </Statistic>
            </div>

            <div className="my-10 md:my-0">
              <Statistic title="Currency">{currency}</Statistic>
              <Statistic title="Domain">{domain}</Statistic>
              <Statistic title="Languages">{languagesJsx}</Statistic>
            </div>
          </div>

          <div className="   mt-10   flex items-center gap-3 lg:max-w-2xl">
            Bordering Countries:{" "}
            {borders.length === 0 ? (
              <p className=" italic text-gray-500">
                No bordering countries, probably an island lol
              </p>
            ) : (
              <div className="flex  flex-wrap items-center gap-2">
                {borders}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Country;

export async function getStaticPaths() {
  // lol i had been trying to do something like getstaticpaths on react router when i had first started but that just didnt exist,
  // seeing this in next makes me really happy as this is really great for SEO and gives u most of the MPA benefits while still having the SPA-like "feel".
  // really loving the next experience so far

  const res = await fetch("https://restcountries.com/v3.1/all?fields=name");

  const countriesData = await res.json();

  const paths = countriesData.map((country: { name: { common: string } }) => ({
    params: { country: country.name.common },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  countriesData: [
    {
      languages: {};
      subregion: string;
      borders: [];
      name: {
        nativeName: {};
        common: string;
        official: string;
      };
      tld: string[];
      currencies: {};
      flags: { png: string; alt: string };
      region: string;
      capital: string;
      population: string;
    }
  ];
}> = async function (context) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${context.params?.country}?fields=name,capital,borders,region,subregion,tld,currency,flags,currencies,population,languages`
  );
  const countriesData = await res.json();

  if (!countriesData) {
    return { notFound: true };
  }

  return { props: { countriesData } };
};
