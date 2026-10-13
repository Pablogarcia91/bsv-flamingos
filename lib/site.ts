// Configuración general del sitio.
export const site = {
  name: "BSV Flamingos",
  shortName: "Flamingos",
  tagline: "Baloncesto amateur con estilo Miami Vice",
  city: "Valencia",
  email: "flamingosbasketball00@gmail.com",
  instagram: {
    handle: "@flamingosbasketball00",
    url: "https://www.instagram.com/flamingosbasketball00/",
  },
  sponsors: [
    {
      name: "Más que Ingenieros",
      description: "Engineering & consulting",
      logo: "masqueingenieros",
      url: "https://masqueingenieros.com/" as string | undefined,
      tier: "Principal",
    },
  ],
};

export type SponsorLogoKey = "masqueingenieros";

export function mailto(subject: string, body = "") {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}
