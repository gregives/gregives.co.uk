import { twMerge } from "tailwind-merge";

const { OPENWEATHER_API_KEY } = process.env;

if (OPENWEATHER_API_KEY === undefined) {
  throw new Error("Missing OpenWeather API key");
}

const aliases: Record<string, string> = {
  Thunderstorm: "Stormy",
  Rain: "Rainy",
  Snow: "Snowy",
  Mist: "Misty",
  Smoke: "Smoky",
  Haze: "Hazy",
  Dust: "Dusty",
  Fog: "Foggy",
  Sand: "Sandy",
  Clouds: "Cloudy",
};

const backgrounds: Record<string, string> = {
  "01d": "from-blue-500 to-blue-200 dark:to-blue-700",
  "01n": "from-gray-600 to-gray-800",
  "02d": "from-blue-500 to-blue-200 dark:to-blue-700",
  "02n": "from-gray-600 to-gray-800",
  "03d": "from-gray-400 to-gray-200 dark:to-gray-700",
  "03n": "from-gray-600 to-gray-800",
  "04d": "from-gray-400 dark:from-gray-600 to-gray-200 dark:to-gray-700",
  "04n": "from-gray-600 to-gray-800",
  "09d": "from-gray-400 dark:from-gray-600 to-gray-200 dark:to-gray-700",
  "09n": "from-gray-600 to-gray-800",
  "10d": "from-blue-400 dark:from-blue-500 to-gray-200 dark:to-gray-700",
  "10n": "from-gray-600 to-gray-800",
  "11d": "from-gray-600 dark:from-gray-600 to-gray-200 dark:to-gray-700",
  "11n": "from-gray-900 dark:from-gray-800 to-gray-800 dark:to-gray-900",
  "13d": "from-gray-400 to-gray-200 dark:to-gray-600",
  "13n": "from-gray-500 to-gray-800",
  "50d": "from-gray-400 dark:from-gray-600 to-gray-200 dark:to-gray-700",
  "50n": "from-gray-600 to-gray-800",
};

export async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=52.95&lon=-1.15&appid=${OPENWEATHER_API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  ).then((response) => response.json());

  const weather = response.weather[0];

  return {
    description: aliases[weather.main] ?? weather.main,
    icon: `https://openweathermap.org/img/wn/${weather.icon}@4x.png`,
    background: twMerge(
      "bg-gradient-to-b before:opacity-25 dark:before:opacity-25",
      weather.icon.endsWith("n") && "text-white",
      backgrounds[weather.icon]
    ),
  };
}
