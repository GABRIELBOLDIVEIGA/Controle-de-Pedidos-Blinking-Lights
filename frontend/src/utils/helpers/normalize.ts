export const normalize = (str: string | undefined): string => {
  if (!str) return "";
  try {
    const string = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return string;
  } catch (error) {
    console.warn(error);
    return "";
  }
};
