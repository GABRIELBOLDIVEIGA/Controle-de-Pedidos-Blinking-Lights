import { useEffect, useMemo, useState } from "react";

function useMediaQuery(query: string) {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [mediaQuery]);

  return match;
}

export function useMediaQueries() {
  const menor_640 = useMediaQuery("(max-width: 639px)");
  const mobile = menor_640;

  const maior_640 = useMediaQuery("(min-width: 640px)");
  const menor_1024 = useMediaQuery("(max-width: 1023px)");
  const tablet = maior_640 && menor_1024 ? true : false;

  const maior_1024 = useMediaQuery("(min-width: 1024px)");
  const menor_1280 = useMediaQuery("(max-width: 1599px)");
  const laptop = maior_1024 && menor_1280 ? true : false;

  const desktop = useMediaQuery("(min-width: 1600px)");

  return { mobile, tablet, laptop, desktop };
}
