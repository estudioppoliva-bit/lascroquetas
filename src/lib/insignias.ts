// Insignias del Pasaporte croquetero. Se calculan a partir de los sellos y las opiniones de cada persona.

export type SelloConLugar = { slug: string; nombre: string; estilo: string; zona: string; fecha: string };

export type Insignia = {
  clave: string;
  nombre: string;
  descripcion: string;
  meta: number;
  progreso: (s: SelloConLugar[], opiniones: number) => number;
};

const distintos = (lista: string[]) => new Set(lista).size;

export const INSIGNIAS: Insignia[] = [
  {
    clave: "primera",
    nombre: "Primera croqueta",
    descripcion: "Sella tu primera croqueta.",
    meta: 1,
    progreso: (s) => s.length,
  },
  {
    clave: "barrio",
    nombre: "Croquetera de barrio",
    descripcion: "Sella 5 lugares.",
    meta: 5,
    progreso: (s) => s.length,
  },
  {
    clave: "diez-cubanas",
    nombre: "Diez cubanas",
    descripcion: "Sella 10 lugares de croquetas cubanas.",
    meta: 10,
    progreso: (s) => s.filter((x) => x.estilo === "cu").length,
  },
  {
    clave: "miami",
    nombre: "Reina de Miami",
    descripcion: "Sella 10 lugares en Miami.",
    meta: 10,
    progreso: (s) => s.filter((x) => x.zona === "miami").length,
  },
  {
    clave: "viajera",
    nombre: "Croquetera viajera",
    descripcion: "Sella croquetas en 3 zonas de EE.UU.",
    meta: 3,
    progreso: (s) => distintos(s.map((x) => x.zona)),
  },
  {
    clave: "cinco-estilos",
    nombre: "Paladar internacional",
    descripcion: "Prueba 5 estilos distintos.",
    meta: 5,
    progreso: (s) => distintos(s.map((x) => x.estilo)),
  },
  {
    clave: "vuelta-al-mundo",
    nombre: "La vuelta al mundo",
    descripcion: "Prueba los 11 estilos de la Ruta.",
    meta: 11,
    progreso: (s) => distintos(s.map((x) => x.estilo)),
  },
  {
    clave: "critica",
    nombre: "Crítica croquetera",
    descripcion: "Escribe 5 opiniones.",
    meta: 5,
    progreso: (_s, opiniones) => opiniones,
  },
];
