import { motion } from "framer-motion";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);
const countryList = Object.entries(countries.getNames("en"))
  .filter(([code]) => code !== "GB") // Remove UK from the original list
  .sort((a, b) => a[1].localeCompare(b[1])); // Sort remaining countries alphabetically

  const prioritizedCountries = [
    ["ENG", "England"],
    ["SCT", "Scotland"],
    ["WLS", "Wales"],
    ["NIR", "Northern Ireland"],
    ["IE", "Republic of Ireland"], // Manually place Republic of Ireland below the UK countries
    ...countryList.filter(([code]) => code !== "IE"), // Remove Ireland from the rest of the list
  ];  


function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const containerVariants = {
  initial: {},
  inView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: {
    x: -500,
    rotate: -30,
  },
  inView: {
    x: 0,
    rotate: 0,
  },
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isValidEmail(email)) {
      setIsLoading(false);
      return;
    }

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, city, country }),
    });

    if (res.ok) {
      setIsSuccess(true);
    }
    setIsLoading(false);
    setEmail("");
    setCountry("");
  };

  return (
    <section id="newsletter" className="flex border-y-4 bg-green">
      <div className="container flex flex-col items-center md:flex-row md:gap-20">
        <div className="flex h-full flex-1 items-center pb-10 pt-10 sm:pb-32 sm:pt-20">
          <motion.div
            className="relative"
            initial="initial"
            whileInView="inView"
            variants={containerVariants}
          >
            <motion.div
              className="bg-pink absolute -bottom-12 left-0 right-0 top-12 border-4 sm:-right-12 sm:left-12"
              variants={cardVariants}
            />
            <motion.div
              className="bg-orange absolute -bottom-8 left-0 right-0 top-8 border-4 sm:-right-8 sm:left-8"
              variants={cardVariants}
            />
            <motion.div
              className="absolute -bottom-4 left-0 right-0 top-4 border-4 bg-yellow sm:-right-4 sm:left-4"
              variants={cardVariants}
            />
            <motion.div
              className="relative min-w-0 border-4"
              variants={cardVariants}
            >
              <Image
                src="/images/ali-woods-greentee.png"
                alt="Ali Woods"
                width={450}
                height={450}
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="flex-1 px-4 py-12 text-copy  sm:px-6 md:px-8 lg:px-12 xl:px-28">
          <h2 className="text-heading text-white">
            Never miss a <span className="text-yellow">punchline</span>
          </h2>
          <p className="my-8 text-white">
            {`Be the first to know about upcoming gigs, special events, and all things Ali`}
          </p>
          {isSuccess ? (
            <p className=" text-black border-4 bg-yellow px-4 py-2 ">
              {`Thanks for signing up! You're on the list.`}
            </p>
          ) : (
            <form
              className="border-black flex w-full flex-col gap-4 text-sm sm:text-base"
              onSubmit={handleSubmit}
            >
              {/* Email Input */}
              <input
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="min-w-0 grow rounded-none bg-white-light px-5 py-3 text-gray-dark border-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Section Text */}
              <p className="text-white text-base sm:text-lg font-bold">
                Where do you want to see me perform?
              </p>

              {/* City Input */}
              <input
                type="text"
                placeholder="City"
                className="min-w-0 grow rounded-none bg-white-light px-5 py-3 text-gray-dark border-4"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              {/* Country Dropdown */}
              <select
                className="min-w-0 grow rounded-none bg-white-light px-5 py-3 text-gray-dark border-4"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="" disabled>Country</option>
                {prioritizedCountries.map(([code, name]) => (
                  <option key={code} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue border-black shrink-0 border-4 px-5 py-3 font-bold uppercase text-yellow"
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Sign up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
