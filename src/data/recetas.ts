// Recetas base de la Ruta, una por estilo. Redactadas por la Ruta; pendientes de probar y fotografiar.

export type Ingrediente = { cantidad?: number; unidad?: string; nombre: string };
export type GrupoIngredientes = { grupo: string; items: Ingrediente[] };
export type Variante = { nombre: string; texto: string };

export type Receta = {
  clave: string; // coincide con la clave del estilo en catalogo.json
  titulo: string;
  origen: string;
  resumen: string;
  historia: string[];
  base: string;
  rinde: number;
  unidadRinde: string;
  tiempos: { etiqueta: string; valor: string }[];
  ingredientes: GrupoIngredientes[];
  pasos: string[];
  variantes: Variante[];
};

const empanizado = (pan: string, huevos = 2): GrupoIngredientes => ({
  grupo: "Para empanizar y freír",
  items: [
    { cantidad: huevos, nombre: "huevos batidos" },
    { cantidad: 2, unidad: "tazas", nombre: pan },
    { nombre: "Aceite vegetal para freír" },
  ],
});

export const recetas: Receta[] = [
  {
    clave: "cu",
    titulo: "Croquetas cubanas de jamón",
    origen: "Cuba y Miami",
    resumen: "Alargadas, de masa firme y empanizadas con galleta molida: la croqueta de la ventanita.",
    historia: [
      "La croqueta llegó a Cuba con la cocina española, pero allí cambió de forma: se hizo alargada, de masa más firme y con un empanizado de galleta molida que la deja muy crujiente. Se convirtió en un clásico de panaderías y cafeterías, sola, en pan o para fiestas por docenas.",
      "Con el exilio cubano llegó a Miami, donde es el bocado de las ventanitas junto al cafecito. En 2018 la Ciudad de Miami declaró el 1 de octubre Día de la Croqueta, en homenaje a Sergio's, que acababa de servir su croqueta número 20 millones.",
    ],
    base: "Bechamel firme con jamón molido",
    rinde: 24,
    unidadRinde: "croquetas",
    tiempos: [
      { etiqueta: "Preparación", valor: "40 min" },
      { etiqueta: "Reposo", valor: "4 h o toda la noche" },
      { etiqueta: "Fritura", valor: "3 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para la masa",
        items: [
          { cantidad: 1, unidad: "lb", nombre: "jamón cocido, molido fino" },
          { cantidad: 4, unidad: "cdas", nombre: "mantequilla" },
          { cantidad: 0.5, nombre: "cebolla pequeña, picada muy fina" },
          { cantidad: 1, unidad: "taza", nombre: "harina de trigo" },
          { cantidad: 2, unidad: "tazas", nombre: "leche entera" },
          { cantidad: 2, unidad: "cdas", nombre: "vino seco (opcional)" },
          { cantidad: 0.25, unidad: "cdta", nombre: "nuez moscada" },
          { nombre: "Sal y pimienta al gusto (el jamón ya sala)" },
        ],
      },
      empanizado("galleta molida (cracker meal)"),
    ],
    pasos: [
      "Derrite la mantequilla a fuego medio y sofríe la cebolla hasta que esté transparente, sin dorar.",
      "Añade la harina de golpe y cocínala 2 minutos sin dejar de mover, para quitarle el sabor a crudo.",
      "Agrega la leche poco a poco, batiendo, hasta tener una masa muy espesa que se despega del fondo de la cazuela.",
      "Incorpora el jamón, el vino y la nuez moscada. Cocina 5 minutos más, moviendo. Prueba de sal.",
      "Extiende la masa en una fuente, cúbrela con plástico pegado a la superficie y refrigérala al menos 4 horas.",
      "Con las manos un poco engrasadas, forma cilindros de unas 2½ pulgadas de largo.",
      "Pásalos por galleta molida, luego por huevo y otra vez por galleta. Refrigéralos 30 minutos para que el empanizado agarre.",
      "Fríelos en aceite a 350 °F, pocos a la vez, unos 3 minutos hasta que estén dorados. Escúrrelos sobre papel.",
    ],
    variantes: [
      { nombre: "De pollo", texto: "Cambia el jamón por pollo cocido y molido; añade un poco de su caldo a la leche." },
      { nombre: "De pescado o bacalao", texto: "Usa pescado blanco cocido o bacalao desalado, desmenuzado, con perejil." },
      { nombre: "De queso", texto: "Sustituye el jamón por 2 tazas de queso rallado (gouda o suizo) y añade una pizca de pimentón." },
      { nombre: "De espinaca, o jamón y espinaca", texto: "Saltea 10 oz de espinaca picada y bien escurrida; úsala sola o mitad y mitad con el jamón." },
      { nombre: "De chorizo", texto: "Cambia la mitad del jamón por chorizo español picado muy fino." },
      { nombre: "Croqueta preparada", texto: "En pan cubano con jamón, queso suizo, pepinillo, mostaza y dos o tres croquetas, todo prensado a la plancha." },
    ],
  },
  {
    clave: "es",
    titulo: "Croquetas españolas de jamón ibérico",
    origen: "España",
    resumen: "Bechamel cremosa, casi líquida por dentro, y un empanizado fino de pan rallado.",
    historia: [
      "La croqueta francesa llegó a España en el siglo XIX y allí encontró su casa: se convirtió en la manera de aprovechar el jamón, el pollo o la carne que sobraban del cocido.",
      "Hoy es tapa de bar, plato de abuela y concurso de cocineros. La española se distingue por su bechamel cremosa, que casi se derrama al morderla. España celebra cada 16 de enero el Día Internacional de la Croqueta y tiene festivales dedicados, como el Kroqueta Fest de Valencia y el Alacroqueta de Alicante.",
    ],
    base: "Bechamel cremosa",
    rinde: 30,
    unidadRinde: "croquetas",
    tiempos: [
      { etiqueta: "Preparación", valor: "45 min" },
      { etiqueta: "Reposo", valor: "Toda la noche" },
      { etiqueta: "Fritura", valor: "2 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para la bechamel",
        items: [
          { cantidad: 3, unidad: "cdas", nombre: "mantequilla" },
          { cantidad: 3, unidad: "cdas", nombre: "aceite de oliva" },
          { cantidad: 0.5, nombre: "cebolla, picada muy fina" },
          { cantidad: 0.66, unidad: "taza", nombre: "harina de trigo" },
          { cantidad: 3, unidad: "tazas", nombre: "leche entera, caliente" },
          { cantidad: 5, unidad: "oz", nombre: "jamón ibérico o serrano, picado a cuchillo" },
          { nombre: "Sal y nuez moscada al gusto" },
        ],
      },
      empanizado("pan rallado fino"),
    ],
    pasos: [
      "Calienta la mantequilla con el aceite y pocha la cebolla a fuego suave unos 8 minutos.",
      "Añade el jamón y dale una vuelta de 1 minuto; si se fríe demasiado se endurece.",
      "Incorpora la harina y tuéstala 3 minutos, moviendo.",
      "Agrega la leche caliente en tres veces, batiendo, y cocina a fuego bajo 15 minutos hasta que la bechamel esté espesa pero suave. Ajusta sal y nuez moscada.",
      "Pásala a una fuente, cúbrela con plástico en contacto y deja que repose en el refrigerador toda la noche.",
      "Forma bolitas o huevitos con dos cucharas, pásalas por huevo y pan rallado.",
      "Fríelas a 360 °F en aceite abundante, pocas a la vez, hasta que estén doradas, unos 2 minutos.",
    ],
    variantes: [
      { nombre: "De bacalao", texto: "Bacalao desalado y desmigado, sofrito con ajo y perejil antes de la harina." },
      { nombre: "De pollo (o de cocido)", texto: "Pollo asado o del cocido, picado fino; usa parte de caldo en vez de leche." },
      { nombre: "De setas", texto: "Champiñones o setas salteadas con ajo y un chorrito de vino blanco." },
      { nombre: "De queso de cabra", texto: "Añade 5 oz de queso de cabra a la bechamel al final, fuera del fuego." },
      { nombre: "De espinacas con piñones", texto: "Espinacas salteadas y escurridas con piñones tostados; a veces con pasas." },
      { nombre: "De chorizo", texto: "Chorizo picado y sofrito; su grasa pinta la bechamel de rojo." },
    ],
  },
  {
    clave: "pt",
    titulo: "Bolinhos de bacalhau",
    origen: "Portugal",
    resumen: "Bacalao y papa, sin empanizar, moldeados con dos cucharas.",
    historia: [
      "En Portugal el bacalao es casi religión, y estos bolinhos (también llamados pastéis de bacalhau) son su versión para picar: masa de papa y bacalao desmenuzado, sin pan rallado, frita hasta quedar dorada.",
      "En Estados Unidos se encuentran sobre todo en panaderías y marisquerías de las comunidades portuguesas de Massachusetts y Nueva Jersey, y en Miami en casas como Old Lisbon.",
    ],
    base: "Papa con bacalao",
    rinde: 24,
    unidadRinde: "bolinhos",
    tiempos: [
      { etiqueta: "Desalar", valor: "24 a 48 h" },
      { etiqueta: "Preparación", valor: "45 min" },
      { etiqueta: "Fritura", valor: "3 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para la masa",
        items: [
          { cantidad: 1, unidad: "lb", nombre: "bacalao salado, desalado" },
          { cantidad: 1, unidad: "lb", nombre: "papas harinosas (russet)" },
          { cantidad: 3, nombre: "huevos" },
          { cantidad: 0.5, nombre: "cebolla, rallada" },
          { cantidad: 3, unidad: "cdas", nombre: "perejil picado" },
          { nombre: "Pimienta y nuez moscada al gusto" },
        ],
      },
      { grupo: "Para freír", items: [{ nombre: "Aceite vegetal" }] },
    ],
    pasos: [
      "Desala el bacalao en agua fría en el refrigerador de 24 a 48 horas, cambiando el agua 3 o 4 veces.",
      "Hierve el bacalao 10 minutos; escúrrelo, quítale piel y espinas y desmenúzalo muy fino con un tenedor o un paño.",
      "Cocina las papas con piel, pélalas y hazlas puré sin leche ni mantequilla.",
      "Mezcla el puré con el bacalao, la cebolla y el perejil. Añade los huevos uno a uno hasta tener una masa firme. Sazona.",
      "Con dos cucharas soperas, da forma de quenelle (un óvalo con tres caras) pasando la masa de una cuchara a otra.",
      "Fríelos a 350 °F hasta que estén dorados por todos lados, unos 3 minutos.",
    ],
    variantes: [
      { nombre: "Croquete de carne", texto: "Carne guisada molida con cebolla y perejil, ligada con bechamel y empanizada con pan rallado." },
      { nombre: "Pastéis de camarão", texto: "Masa de harina rellena de camarón en salsa blanca, en forma de media luna." },
    ],
  },
  {
    clave: "br",
    titulo: "Coxinha de frango",
    origen: "Brasil",
    resumen: "Masa de caldo con relleno de pollo y catupiry, en forma de gota.",
    historia: [
      "La coxinha (\"muslito\") nació en São Paulo y su nombre viene de su forma, que imita un muslo de pollo. Una leyenda popular dice que se inventó para un niño de la familia imperial que solo quería comer muslos.",
      "Hoy es el salgado más famoso de Brasil, en cualquier lanchonete y en todas las fiestas. En Florida se consigue en las panaderías brasileñas de Pompano Beach, Boca Raton y Orlando.",
    ],
    base: "Masa de caldo y harina",
    rinde: 20,
    unidadRinde: "coxinhas",
    tiempos: [
      { etiqueta: "Preparación", valor: "1 h 15 min" },
      { etiqueta: "Enfriar la masa", valor: "30 min" },
      { etiqueta: "Fritura", valor: "4 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para el relleno",
        items: [
          { cantidad: 1, unidad: "lb", nombre: "pechuga de pollo" },
          { cantidad: 1, nombre: "cebolla, picada" },
          { cantidad: 2, nombre: "dientes de ajo" },
          { cantidad: 2, unidad: "cdas", nombre: "perejil y cebollín picados" },
          { cantidad: 4, unidad: "oz", nombre: "catupiry o queso crema" },
        ],
      },
      {
        grupo: "Para la masa",
        items: [
          { cantidad: 2, unidad: "tazas", nombre: "caldo de cocer el pollo" },
          { cantidad: 2, unidad: "cdas", nombre: "mantequilla" },
          { cantidad: 2, unidad: "tazas", nombre: "harina de trigo" },
          { nombre: "Sal al gusto" },
        ],
      },
      empanizado("pan rallado"),
    ],
    pasos: [
      "Cocina el pollo en agua con sal, media cebolla y el ajo, 20 minutos. Guarda 2 tazas del caldo y desmecha el pollo.",
      "Sofríe la otra media cebolla, añade el pollo, el perejil y el cebollín. Deja enfriar.",
      "Para la masa, hierve el caldo con la mantequilla y la sal, echa la harina de golpe y mueve con fuerza hasta que se despegue de la olla.",
      "Pasa la masa a la mesa y amásala aún tibia hasta que esté lisa.",
      "Toma una bolita de masa, aplánala en la mano, pon una cucharada de pollo y un poco de catupiry, cierra y dale forma de gota.",
      "Pásalas por huevo y pan rallado, y fríelas a 350 °F hasta que estén doradas, unos 4 minutos.",
    ],
    variantes: [
      { nombre: "Mini coxinhas", texto: "Del tamaño de un bocado, las de las fiestas de cumpleaños." },
      { nombre: "Coxinha de papa", texto: "Se añade papa en puré a la masa para que quede más suave." },
    ],
  },
  {
    clave: "it",
    titulo: "Arancini sicilianos al ragú",
    origen: "Sicilia, Italia",
    resumen: "Arroz con azafrán relleno de ragú y queso, del tamaño de una naranjita.",
    historia: [
      "Arancini significa \"naranjitas\", por su forma y su color. Son de Sicilia, donde el arroz con azafrán se suele asociar a la herencia árabe de la isla, y hasta su forma cambia de ciudad en ciudad: redondos en Palermo, cónicos en Catania.",
      "En el resto de Italia tienen primos: los supplì de Roma, rellenos de mozzarella que se estira como un cable de teléfono, y las crocchè de papa de Nápoles.",
    ],
    base: "Arroz",
    rinde: 12,
    unidadRinde: "arancini",
    tiempos: [
      { etiqueta: "Preparación", valor: "1 h 30 min" },
      { etiqueta: "Enfriar el arroz", valor: "3 h" },
      { etiqueta: "Fritura", valor: "5 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para el arroz",
        items: [
          { cantidad: 2, unidad: "tazas", nombre: "arroz arborio" },
          { cantidad: 4, unidad: "tazas", nombre: "caldo de pollo" },
          { nombre: "Una pizca de azafrán" },
          { cantidad: 2, unidad: "cdas", nombre: "mantequilla" },
          { cantidad: 0.5, unidad: "taza", nombre: "parmesano rallado" },
        ],
      },
      {
        grupo: "Para el relleno",
        items: [
          { cantidad: 0.5, unidad: "lb", nombre: "carne de res molida" },
          { cantidad: 0.5, nombre: "cebolla, picada" },
          { cantidad: 2, unidad: "cdas", nombre: "pasta de tomate" },
          { cantidad: 0.5, unidad: "taza", nombre: "guisantes" },
          { cantidad: 4, unidad: "oz", nombre: "mozzarella o caciocavallo en dados" },
        ],
      },
      {
        grupo: "Para empanizar y freír",
        items: [
          { cantidad: 0.75, unidad: "taza", nombre: "harina mezclada con agua (pastella)" },
          { cantidad: 2, unidad: "tazas", nombre: "pan rallado" },
          { nombre: "Aceite vegetal para freír" },
        ],
      },
    ],
    pasos: [
      "Cocina el arroz en el caldo con el azafrán hasta que se absorba, unos 18 minutos. Añade mantequilla y parmesano, extiéndelo en una bandeja y déjalo enfriar por completo.",
      "Para el ragú, sofríe la cebolla, dora la carne, añade la pasta de tomate y un poco de agua y cocina 20 minutos. Agrega los guisantes y deja enfriar.",
      "Con las manos mojadas, toma un puñado de arroz, haz un hueco, pon una cucharada de ragú y unos dados de queso, y cierra en forma de bola.",
      "Mezcla harina y agua hasta tener una pasta como de crepe. Pasa cada arancino por la pastella y luego por pan rallado.",
      "Fríelos a 350 °F, dos o tres a la vez, unos 5 minutos hasta que estén dorados.",
    ],
    variantes: [
      { nombre: "Al burro", texto: "Rellenos de jamón cocido, mozzarella y un poco de bechamel." },
      { nombre: "Supplì romanos", texto: "Alargados, con arroz al tomate y un corazón de mozzarella." },
      { nombre: "Crocchè napolitanas", texto: "De puré de papa con queso, las primas italianas de la croqueta de papa francesa." },
    ],
  },
  {
    clave: "jp",
    titulo: "Korokke de papa y carne",
    origen: "Japón",
    resumen: "Papa con carne, empanizada en panko y servida con salsa tonkatsu.",
    historia: [
      "El korokke llegó a Japón con la cocina occidental (yōshoku) en la era Meiji, a finales del siglo XIX, y a principios del XX ya era comida popular. Su nombre viene del francés croquette.",
      "Se compra recién hecho en carnicerías y tiendas de barrio. Además de la versión de papa existe la kani cream korokke, de cangrejo con bechamel, la más parecida a la croqueta española.",
    ],
    base: "Papa con panko",
    rinde: 12,
    unidadRinde: "korokke",
    tiempos: [
      { etiqueta: "Preparación", valor: "50 min" },
      { etiqueta: "Enfriar", valor: "30 min" },
      { etiqueta: "Fritura", valor: "3 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para la masa",
        items: [
          { cantidad: 1.5, unidad: "lb", nombre: "papas harinosas" },
          { cantidad: 0.5, unidad: "lb", nombre: "carne molida (res o mezcla)" },
          { cantidad: 1, nombre: "cebolla, picada fina" },
          { cantidad: 1, unidad: "cda", nombre: "salsa de soya" },
          { cantidad: 1, unidad: "cdta", nombre: "azúcar" },
          { nombre: "Sal y pimienta al gusto" },
        ],
      },
      {
        grupo: "Para empanizar y freír",
        items: [
          { cantidad: 0.5, unidad: "taza", nombre: "harina" },
          { cantidad: 2, nombre: "huevos batidos" },
          { cantidad: 2, unidad: "tazas", nombre: "panko" },
          { nombre: "Aceite vegetal para freír" },
          { nombre: "Salsa tonkatsu y repollo en tiras para servir" },
        ],
      },
    ],
    pasos: [
      "Cocina las papas hasta que estén tiernas, pélalas y aplástalas dejando algún trozo.",
      "Sofríe la cebolla, añade la carne y cocínala hasta que se dore. Sazona con soya, azúcar, sal y pimienta.",
      "Mezcla la carne con la papa y deja enfriar la masa.",
      "Forma tortitas ovaladas y gruesas. Pásalas por harina, huevo y panko.",
      "Fríelas a 340 °F hasta que estén doradas, unos 3 minutos. Sírvelas con salsa tonkatsu y repollo.",
    ],
    variantes: [
      { nombre: "Kare korokke", texto: "Añade 1 cda de curry en polvo japonés a la masa." },
      { nombre: "Kani cream korokke", texto: "Bechamel con carne de cangrejo, empanizada en panko." },
      { nombre: "De kabocha", texto: "Con calabaza japonesa en vez de papa, ligeramente dulce." },
    ],
  },
  {
    clave: "nl",
    titulo: "Kroket holandés de ragú",
    origen: "Países Bajos",
    resumen: "Ragú de res con bechamel firme y doble empanizado, para comer en pan con mostaza.",
    historia: [
      "Los holandeses adoptaron la croqueta francesa y la hicieron suya con un relleno de ragú de res. Se come sola, en un panecillo con mostaza (broodje kroket) o en bitterballen, las bolitas de los bares.",
      "Es famosa por venderse en máquinas de pared, las automatiek, y por marcas como Van Dobben. En Estados Unidos la encuentras en la panadería holandesa de Holland, Michigan.",
    ],
    base: "Ragú de res",
    rinde: 12,
    unidadRinde: "kroketten",
    tiempos: [
      { etiqueta: "Preparación", valor: "2 h" },
      { etiqueta: "Reposo", valor: "4 h" },
      { etiqueta: "Fritura", valor: "4 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para el ragú",
        items: [
          { cantidad: 1, unidad: "lb", nombre: "carne de res para guisar" },
          { cantidad: 3, unidad: "tazas", nombre: "caldo de res" },
          { cantidad: 4, unidad: "cdas", nombre: "mantequilla" },
          { cantidad: 0.66, unidad: "taza", nombre: "harina" },
          { cantidad: 1, unidad: "cda", nombre: "gelatina en polvo sin sabor" },
          { cantidad: 2, unidad: "cdas", nombre: "perejil picado" },
          { nombre: "Sal, pimienta y nuez moscada" },
        ],
      },
      empanizado("pan rallado fino", 3),
    ],
    pasos: [
      "Cocina la carne en el caldo a fuego bajo 1 hora y media, hasta que se deshaga. Desmenúzala y guarda 2 tazas del caldo.",
      "Hidrata la gelatina en un poco de agua fría.",
      "Haz un roux con la mantequilla y la harina, añade el caldo caliente poco a poco y cocina hasta que espese. Incorpora la gelatina, la carne y el perejil. Sazona.",
      "Extiende el ragú en una fuente y refrigéralo 4 horas, hasta que esté firme.",
      "Forma cilindros, pásalos por huevo y pan rallado dos veces: el doble empanizado evita que revienten.",
      "Fríelos a 350 °F unos 4 minutos. Sírvelos con mostaza.",
    ],
    variantes: [
      { nombre: "Bitterballen", texto: "La misma masa en bolitas, para picar con cerveza." },
      { nombre: "Garnalenkroket", texto: "Con camarón en vez de carne." },
    ],
  },
  {
    clave: "be",
    titulo: "Croquetas belgas de queso",
    origen: "Bélgica",
    resumen: "Kaaskroketten: bechamel con mucho queso, servidas con perejil frito y limón.",
    historia: [
      "En las brasseries de Bélgica las croquetas son entrada clásica, de dos en dos, con perejil frito y un gajo de limón. Las dos más famosas son las de queso (kaaskroketten) y las de camarón gris del mar del Norte (garnaalkroketten).",
    ],
    base: "Bechamel con queso",
    rinde: 16,
    unidadRinde: "croquetas",
    tiempos: [
      { etiqueta: "Preparación", valor: "40 min" },
      { etiqueta: "Reposo", valor: "Toda la noche" },
      { etiqueta: "Fritura", valor: "3 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para la masa",
        items: [
          { cantidad: 5, unidad: "cdas", nombre: "mantequilla" },
          { cantidad: 0.66, unidad: "taza", nombre: "harina" },
          { cantidad: 2, unidad: "tazas", nombre: "leche entera" },
          { cantidad: 2, nombre: "yemas de huevo" },
          { cantidad: 7, unidad: "oz", nombre: "queso gruyère o gouda añejo, rallado" },
          { nombre: "Nuez moscada, sal y una pizca de cayena" },
        ],
      },
      empanizado("pan rallado fino", 3),
    ],
    pasos: [
      "Haz una bechamel espesa con la mantequilla, la harina y la leche.",
      "Fuera del fuego, añade el queso y luego las yemas, batiendo rápido. Sazona.",
      "Extiende la masa en un molde con plástico, tápala y refrigérala toda la noche.",
      "Corta rectángulos, pásalos por huevo y pan rallado dos veces.",
      "Fríelos a 350 °F unos 3 minutos. Sírvelos con perejil frito y limón.",
    ],
    variantes: [
      { nombre: "Garnaalkroketten", texto: "Cambia el queso por camarón pequeño y usa parte de caldo de camarón en la bechamel." },
    ],
  },
  {
    clave: "fr",
    titulo: "Croquettes de jamón y queso",
    origen: "Francia",
    resumen: "La original: bechamel con jamón de París y gruyère, al estilo croque-monsieur.",
    historia: [
      "Francia es la cuna de la croqueta: el nombre viene de croquer, \"crujir\". Los recetarios de la corte francesa ya la recogían a finales del siglo XVII, y en el XIX la alta cocina la refinó con bechamel y empanizado.",
      "Hoy se ven poco en Francia comparadas con las pommes croquettes, de puré de papa, que acompañan los asados. En Nueva York, Le Bistroquet las sirve como Croquettes Monsieur.",
    ],
    base: "Bechamel o papa",
    rinde: 20,
    unidadRinde: "croquetas",
    tiempos: [
      { etiqueta: "Preparación", valor: "40 min" },
      { etiqueta: "Reposo", valor: "4 h" },
      { etiqueta: "Fritura", valor: "3 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para la masa",
        items: [
          { cantidad: 4, unidad: "cdas", nombre: "mantequilla" },
          { cantidad: 0.5, unidad: "taza", nombre: "harina" },
          { cantidad: 2, unidad: "tazas", nombre: "leche entera" },
          { cantidad: 5, unidad: "oz", nombre: "jamón cocido (jambon de Paris), picado" },
          { cantidad: 3, unidad: "oz", nombre: "gruyère rallado" },
          { cantidad: 1, unidad: "cdta", nombre: "mostaza de Dijon" },
          { nombre: "Sal, pimienta y nuez moscada" },
        ],
      },
      empanizado("pan rallado fino"),
    ],
    pasos: [
      "Haz una bechamel espesa con la mantequilla, la harina y la leche, cocinándola 10 minutos.",
      "Añade la mostaza, el jamón y el gruyère. Sazona.",
      "Extiende y refrigera 4 horas.",
      "Forma cilindros pequeños, pásalos por huevo y pan rallado.",
      "Fríelos a 350 °F hasta que estén dorados.",
    ],
    variantes: [
      { nombre: "Pommes croquettes", texto: "Puré de papa espeso con yema y nuez moscada, en cilindros empanizados." },
      { nombre: "Croquettes de volaille", texto: "Con pollo y champiñones en la bechamel." },
    ],
  },
  {
    clave: "lc",
    titulo: "Boudin balls de Luisiana",
    origen: "Luisiana, EE.UU.",
    resumen: "Arroz con cerdo y especias cajún, en bolitas empanizadas y fritas.",
    historia: [
      "El boudin es la salchicha de arroz y cerdo de la cocina cajún, heredera de los colonos francófonos de Acadiana, en Luisiana. Se vende en carnicerías y hasta en gasolineras.",
      "Las boudin balls sacan el relleno de la tripa y lo convierten en bolitas empanizadas: la croqueta de Luisiana. En Nueva Orleans se piden con mostaza criolla.",
    ],
    base: "Arroz con cerdo",
    rinde: 20,
    unidadRinde: "bolitas",
    tiempos: [
      { etiqueta: "Preparación", valor: "2 h 30 min" },
      { etiqueta: "Enfriar", valor: "1 h" },
      { etiqueta: "Fritura", valor: "4 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para el relleno",
        items: [
          { cantidad: 1.5, unidad: "lb", nombre: "paleta de cerdo en trozos" },
          { cantidad: 1, nombre: "cebolla, picada" },
          { cantidad: 1, nombre: "rama de apio, picada" },
          { cantidad: 1, nombre: "pimiento verde, picado" },
          { cantidad: 3, nombre: "dientes de ajo" },
          { cantidad: 1, unidad: "cda", nombre: "sazón cajún" },
          { cantidad: 3, unidad: "tazas", nombre: "arroz blanco cocido" },
          { cantidad: 0.5, unidad: "taza", nombre: "cebollín y perejil picados" },
        ],
      },
      empanizado("pan rallado o harina de maíz"),
    ],
    pasos: [
      "Cubre el cerdo con agua y cocínalo con la cebolla, el apio, el pimiento, el ajo y el sazón 2 horas, hasta que esté muy tierno. Guarda el caldo.",
      "Pica o muele el cerdo con las verduras.",
      "Mézclalo con el arroz, el cebollín y el perejil, mojando con caldo hasta que la masa se mantenga unida. Ajusta el picante.",
      "Enfría la masa 1 hora y forma bolitas del tamaño de una pelota de golf.",
      "Pásalas por huevo y pan rallado, y fríelas a 350 °F unos 4 minutos.",
    ],
    variantes: [
      { nombre: "Con boudin comprado", texto: "Saca 1½ lb de boudin de su tripa y empieza en el paso 4." },
      { nombre: "Con pepper jack", texto: "Esconde un dadito de queso pepper jack en el centro de cada bolita." },
    ],
  },
  {
    clave: "su",
    titulo: "Salmon croquettes sureñas",
    origen: "Sur de EE.UU.",
    resumen: "Tortitas de salmón en lata, doradas en sartén. Desayuno con grits.",
    historia: [
      "Las salmon croquettes son un clásico de la cocina sureña y afroamericana de Estados Unidos. Se hacían con salmón en lata, barato y fácil de guardar, sobre todo en tiempos difíciles como la Gran Depresión.",
      "Más que croquetas son tortitas, doradas en sartén. Se comen en el desayuno con grits o en la cena con arroz y verduras.",
    ],
    base: "Salmón",
    rinde: 8,
    unidadRinde: "croquettes",
    tiempos: [
      { etiqueta: "Preparación", valor: "15 min" },
      { etiqueta: "Cocción", valor: "8 min por tanda" },
    ],
    ingredientes: [
      {
        grupo: "Para la masa",
        items: [
          { cantidad: 14.75, unidad: "oz", nombre: "salmón en lata, escurrido" },
          { cantidad: 1, nombre: "huevo" },
          { cantidad: 0.25, unidad: "taza", nombre: "cebolla picada fina" },
          { cantidad: 0.25, unidad: "taza", nombre: "pimiento picado fino" },
          { cantidad: 0.5, unidad: "taza", nombre: "galletas saladas molidas o harina de maíz" },
          { cantidad: 1, unidad: "cda", nombre: "mayonesa" },
          { cantidad: 1, unidad: "cdta", nombre: "mostaza" },
          { nombre: "Sal, pimienta y sazón al gusto" },
        ],
      },
      { grupo: "Para la sartén", items: [{ cantidad: 3, unidad: "cdas", nombre: "aceite vegetal" }] },
    ],
    pasos: [
      "Escurre el salmón y desmenúzalo; puedes dejar las espinas blandas, que se deshacen.",
      "Mezcla todos los ingredientes hasta que la masa se mantenga unida.",
      "Forma 8 tortitas de media pulgada de grosor.",
      "Dóralas en el aceite caliente a fuego medio, 3 o 4 minutos por cada lado.",
    ],
    variantes: [
      { nombre: "Con salmón fresco", texto: "Usa salmón cocido y desmenuzado; añade un poco más de pan para ligar." },
    ],
  },
];

export const otrasFormasGenerales = [
  "Al horno: rocía las croquetas empanizadas con aceite y hornéalas a 425 °F unos 15 minutos, volteándolas a la mitad.",
  "En freidora de aire: rocíalas con aceite y cocínalas a 390 °F de 8 a 10 minutos, volteándolas a la mitad.",
  "Sin gluten: espesa con harina de arroz o maicena y empaniza con pan rallado sin gluten.",
  "Para congelar: congélalas ya empanizadas, separadas en una bandeja, y luego guárdalas en bolsa. Se fríen sin descongelar.",
];

export const obtenerReceta = (clave: string) => recetas.find((r) => r.clave === clave);
