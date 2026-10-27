// Contenido editorial: historia, fechas, festivales y congeladas.

export type Hito = { cuando: string; titulo: string; texto: string };

export const linea: Hito[] = [
  {
    cuando: "Siglo XVII",
    titulo: "Nace en Francia",
    texto:
      "El nombre viene del francés croquer, \"crujir\". A finales del siglo XVII, François Massialot, cocinero de la corte, ya recoge en su recetario unas \"croquets\": una manera elegante de aprovechar las sobras.",
  },
  {
    cuando: "Siglo XIX",
    titulo: "Llega la bechamel",
    texto:
      "La alta cocina francesa, con chefs como Antonin Carême, la refina: relleno ligado con bechamel y una capa empanizada que la deja crujiente por fuera y cremosa por dentro.",
  },
  {
    cuando: "Finales del XIX",
    titulo: "España la hace suya",
    texto:
      "En España se vuelve la forma de aprovechar el jamón, el pollo o la carne del cocido. De ahí sale la croqueta de bechamel cremosa que hoy es tapa en cualquier bar.",
  },
  {
    cuando: "Siglo XX",
    titulo: "Cuba le da su forma",
    texto:
      "Con la cocina española llega a Cuba, donde se vuelve alargada, de masa firme y con galleta molida. Panaderías y cafeterías la venden sola, en pan o por docenas para las fiestas.",
  },
  {
    cuando: "Desde los años 60",
    titulo: "La Calle 8",
    texto:
      "El exilio cubano la trae a Miami. Las ventanitas de la Pequeña Habana la sirven con cafecito, y la croqueta se convierte en un símbolo de la ciudad.",
  },
  {
    cuando: "1 oct 2018",
    titulo: "Miami le da su día",
    texto:
      "El alcalde Francis Suarez declara el 1 de octubre Día de la Croqueta en Miami, en homenaje a Sergio's, que acababa de servir su croqueta número 20 millones.",
  },
  {
    cuando: "16 ene 2027",
    titulo: "Nace la Ruta",
    texto: "La Ruta de la Croqueta se lanza en el Día Internacional de la Croqueta.",
  },
];

export const mundo = [
  { clave: "es", texto: "España: bechamel cremosa, la tapa por excelencia." },
  { clave: "pt", texto: "Portugal: bolinhos de bacalao, sin empanizar." },
  { clave: "br", texto: "Brasil: la coxinha, con forma de muslito de pollo." },
  { clave: "it", texto: "Italia: arancini de arroz en Sicilia y supplì en Roma." },
  { clave: "nl", texto: "Países Bajos: kroket de ragú, hasta en máquinas de pared." },
  { clave: "jp", texto: "Japón: korokke de papa, llegado en la era Meiji." },
  { clave: "lc", texto: "Luisiana: boudin balls de arroz con cerdo." },
  { clave: "su", texto: "Sur de EE.UU.: salmon croquettes de salmón en lata." },
];

export type Evento = { nombre: string; url: string; donde: string; cuando: string; que: string };

export const eventos: Evento[] = [
  {
    nombre: "Día Internacional de la Croqueta",
    url: "https://www.articulo14.es/estilo-vida/dia-internacional-de-la-croqueta-el-curioso-origen-de-una-delicia-insuperable-20260116.html",
    donde: "Sobre todo en España",
    cuando: "16 de enero",
    que: "Su origen no está bien documentado, pero se celebra cada año. Es la fecha de lanzamiento de la Ruta.",
  },
  {
    nombre: "Día de la Croqueta en Miami",
    url: "https://remezcla.com/culture/miami-official-croqueta-day/",
    donde: "Miami",
    cuando: "1 de octubre",
    que: "Declarado por la Ciudad de Miami en 2018. Ese día la Ruta anunciará sus premios anuales.",
  },
  {
    nombre: "Croqueta Palooza",
    url: "https://burgerbeast.com/croquetapalooza/",
    donde: "Miami",
    cuando: "Última edición documentada: diciembre de 2022",
    que: "Competencia organizada por Burger Beast desde 2014, en la que el público prueba y vota.",
  },
  {
    nombre: "Kroqueta Fest",
    url: "https://www.valenciabonita.es/2026/02/28/kroqueta-fest-valencia-2026/",
    donde: "Valencia, España",
    cuando: "Abril (en 2026, del 16 al 19)",
    que: "Croquetas clásicas y de autor, música y votación por QR.",
  },
  {
    nombre: "Alacroqueta",
    url: "https://www.alicante.es/es/noticias/festival-alacroqueta-alicante-regresa-14-propuestas-y-se-amplia-cinco-dias",
    donde: "Alicante, España",
    cuando: "Abril (en 2026, del 15 al 19)",
    que: "14 restaurantes, packs de 3 croquetas y votación por QR.",
  },
];

export const lecturas = [
  { titulo: "Miami Has Officially Declared October 1 Croqueta Day", fuente: "Remezcla", url: "https://remezcla.com/culture/miami-official-croqueta-day/" },
  { titulo: "It's Croqueta Day in the 305", fuente: "FIU News", url: "https://news.fiu.edu/2025/its-croqueta-day-in-the-305" },
  { titulo: "Croqueta Palooza", fuente: "Burger Beast", url: "https://burgerbeast.com/croquetapalooza/" },
  { titulo: "Medio siglo del restaurante Versailles", fuente: "CubaNet", url: "https://www.cubanet.org/medio-siglo-del-restaurante-versailles/" },
];

export type Marca = { nombre: string; url: string; producto: string; donde: string; tiendas: string[] };

export const marcas: Marca[] = [
  {
    nombre: "Catalina",
    url: "https://catalinafoods.com/",
    producto: "Croquetas cubanas de jamón: paquete de 15 y family pack de 40. Tiene línea para freidora de aire.",
    donde: "En supermercados",
    tiendas: ["Publix", "Sedano's", "Walmart", "Winn-Dixie"],
  },
  {
    nombre: "Goya",
    url: "https://www.walmart.com/ip/Goya-Ham-Croquettes-9-6-Ounce-12-per-case/979351022",
    producto: "Croquetas de jamón, 9.6 oz.",
    donde: "En línea, por cajas (vendedor externo)",
    tiendas: ["Walmart.com"],
  },
  {
    nombre: "Trader Joe's",
    url: "https://sporked.com/article/trader-joes-frozen-papas-rellenas-review/",
    producto: "Papas rellenas de inspiración cubana.",
    donde: "En sus tiendas",
    tiendas: ["Trader Joe's"],
  },
  {
    nombre: "José Andrés Foods",
    url: "https://shop.littlespain.com/products/chicken-croquetas-jose-andres-foods-bd-86",
    producto: "Croquetas de pollo al estilo español.",
    donde: "En línea",
    tiendas: ["Mercado Little Spain"],
  },
  {
    nombre: "Miami Croquetas",
    url: "https://miamicroquetas.com/",
    producto: "Croquetas de bechamel congeladas, crudas o prefritas.",
    donde: "Pedidos por teléfono, sobre todo para negocios",
    tiendas: ["Pedido directo"],
  },
  {
    nombre: "Porto's Bakery",
    url: "https://www.goldbelly.com/restaurants/portos-bakery/ham-croquette-2-dozen",
    producto: "Croquetas de jamón para terminar en casa.",
    donde: "Envío a todo el país",
    tiendas: ["Goldbelly"],
  },
];

export const marcasMundo = [
  { pais: "España", nombres: "La Cocinera, Fridela, Maheso" },
  { pais: "Países Bajos", nombres: "Van Dobben" },
  { pais: "Japón", nombres: "Nichirei" },
  { pais: "Brasil", nombres: "Vivenda do Camarão" },
];

// Apartado de humor: por qué la croqueta es reina en Cuba.
export const cubaIntro = [
  "Porque rinde. Con un poquito de jamón, mucha leche y harina salían croquetas para toda la familia, y para el vecino que \"pasaba por casualidad\" justo a la hora de freír.",
  "Porque estaba en todas partes: en la merienda, en el pan de la cafetería y en la cajita de los cumpleaños, junto al cake, la ensalada fría y los bocaditos. Una fiesta cubana sin croquetas no era fiesta, era una reunión.",
];

export const leyendasCubanas = [
  {
    titulo: "La croqueta de sustancia",
    texto:
      "En los tiempos flacos, la pregunta en la mesa no era \"¿de qué es la croqueta?\", sino \"¿de qué no es?\". La de sustancia sabía a algo que nadie supo nunca identificar, y es mejor así. Se comía, se repetía y nadie preguntaba dos veces.",
  },
  {
    titulo: "Las Prodal explosivas",
    texto:
      "Entraban al sartén tranquilitas y salían disparadas por toda la cocina. Freírlas pedía tapa de cazuela como escudo, distancia prudente y un familiar valiente. Cuentan que más de un techo quedó decorado para siempre.",
  },
  {
    titulo: "Las que se pegan al cielo de la boca",
    texto:
      "Las que no explotaban tenían otro talento: se quedaban pegadas al cielo de la boca. Comerse una era un ejercicio de diez minutos con la lengua haciendo horas extras. Remedio de la abuela: un buche de agua o, mejor, un cafecito.",
  },
];

export const cubaCierre =
  "Por eso, cuando en Miami muerdes una croqueta crujiente, cremosa y de jamón de verdad, no es solo una merienda: es justicia poética.";
