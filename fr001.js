/* FR-001 · definición del formulario. La usan visita.html (llenar) e informe.html (PDF).
   Transcrito de la foto del formato: compáralo con el papel y corrige textos aquí si hace falta. */

const EMPRESA = {
  n: 'J&M INSPECCIÓN Y CERTIFICACIÓN S.A.S', sub: 'Organismo de inspección y certificación',
  l1: 'NIT 901.522.884-7 · Calle 47A Sur # 84-57, Barrio Bretaña, Bogotá D.C.',
  l2: 'Tel. Bogotá 3106276626 · Medellín 3106200664 · Línea nacional 3106276626',
  acred: 'ISO/IEC 17020:2012 · 13-OIN-023',
  fr: 'FR-001', ft: 'Inspección a instalaciones en servicio', ver: 'Versión 2 · 25/01/2024'
};
const TRI = ['SI', 'NO', 'N/A'], L = 'ABCDEFGHIJ';

/* [nombre, etiqueta, tipo | lista de opciones] */
const ID_CAMPOS = [
  ['repl', 'Este informe reemplaza el informe número'], ['nombre', 'Nombre usuario'], ['idu', 'ID usuario (cuenta)'], ['ciudad', 'Ciudad / Municipio'],
  ['dir', 'Dirección'], ['mail', 'Correo electrónico', 'email'], ['tel', 'Teléfonos', 'tel'], ['dist', 'Distribuidor'],
  ['cat', 'Categoría'], ['nmed', 'Nro. medidor'], ['mmed', 'Marca medidor'], ['lmed', 'Lectura medidor (m³)'],
  ['uso', 'Uso', ['Residencial', 'Comercial']], ['etapa', 'Etapa del regulador', ['Única Et', '1ra Et', '2da Et', '3ra Et']], ['gas', 'Tipo de gas', ['GN', 'GLP']],
  ['instancia', 'Instancia', ['Primera visita', 'Visita complementaria']], ['motivo', 'Motivo de inspección', ['Revisión periódica', 'Solicitud del usuario']], ['viv', 'Tipo de vivienda', ['Unifamiliar', 'Multifamiliar']],
  ['riesgos', 'Riesgos validados (I-004 Instructivo Inspección Segura)', ['SI', 'NO']], ['ant', 'Informe de inspección anterior', ['SI', 'NO']], ['antf', 'Fecha del informe anterior', 'date'],
  ['antoi', 'Emitido por OI'], ['fps', 'Fecha de puesta en servicio', 'date']];

/* Secciones con ítems: [c=crítico / n=no crítico, descripción, campos extra opcionales] */
const SEC = [
  {
    id: 'he', t: 'Hermeticidad', it: [
      ['c', 'Hermeticidad con medidor, 12 minutos: lectura final mayor que la lectura inicial', [['li', 'Lectura inicial'], ['lf', 'Lectura final']]],
      ['c', 'Detector de fugas: concentración de gas mayor a 0 ppm', [['fug', 'Cantidad (ppm)']]]]
  },
  {
    id: 'vc', t: 'Existencia y operatividad de las válvulas de corte', it: [
      ['c', 'Inexistencia de la válvula a la entrada del medidor de la instalación'],
      ['c', 'La válvula que controla toda la instalación no suspende totalmente el paso de gas cuando se cierra'],
      ['n', 'Inexistencia de válvula que controla el flujo de gas para un artefacto'],
      ['n', 'La válvula que controla el flujo de gas a un artefacto no suspende totalmente el paso'],
      ['n', 'Válvula que controla el flujo de gas no es de fácil acceso'],
      ['n', 'Inexistencia parcial o total del maneral de la válvula que controla el flujo de gas a la instalación o a un artefacto']]
  },
  {
    id: 'tr', t: 'Trazado general de la instalación', it: [
      ['c', 'Regulador con mecanismo de control de sobrepresión descarga el gas al interior de la vivienda o recinto'],
      ['n', 'Tramos de tubería a la vista carentes de protección contra daño mecánico o pérdida de conformidad de la protección'],
      ['n', 'Paso de tuberías a la vista por dormitorios o cuartos de baño, con tramos que tienen uniones roscadas y no están encamisadas'],
      ['n', 'Dispositivos de anclaje no aseguran el soporte de la instalación a la vista'],
      ['n', 'Paso por conductos de aire, chimeneas, fosos de ascensores, sótanos y similares sin ventilación; cuartos de basuras, o por áreas con transformadores eléctricos o combustibles líquidos o sustancias cuyos vapores sean corrosivos']]
  },
  {
    id: 'ma', t: 'Materiales', it: [
      ['c', 'Se tendrá conformidad de los materiales si la instalación no ha sido reformada desde su última inspección; solo se podrá declarar reformada en el caso de que se disponga del último informe de resultados de inspección o certificado de conformidad que presente diferencias con la que se va a inspeccionar']]
  },
  {
    id: 've', t: 'Ventilación', it: [
      ['c', 'La concentración de monóxido de carbono medida en el ambiente es mayor a 0 ppm'],
      ['c', 'No se satisfacen las condiciones de ventilación del recinto según lo establecido en la NTC 3631'],
      ['n', 'Las condiciones de ventilación del recinto, voluntaria o involuntariamente, han sido obstruidas por parte del usuario']]
  },
  {
    id: 'co', t: 'Medición de monóxido de carbono', it: [
      ['c', 'Concentración de monóxido de carbono diluido en el ambiente del recinto mayor o igual a cincuenta (50) ppm en volumen'],
      ['c', 'Ausencia de ductos de evacuación o extracción de los productos de la combustión en aquellos artefactos a gas que así lo requieran, conforme a la reglamentación técnica aplicable o a las recomendaciones del fabricante'],
      ['n', 'Concentración de monóxido de carbono (CO) diluido en el ambiente del recinto mayor a 15 ppm y menor a 50 ppm en volumen']]
  },
  {
    id: 'ub', t: 'Ubicación de los artefactos a gas', it: [
      ['c', 'Artefactos a gas de circuito abierto ubicados en recintos destinados a dormitorio, baño o ducha, o en armarios, clósets, al interior de la vivienda, o en compartimientos fabricados con material combustible'],
      ['c', 'Existencia y uso de artefactos eléctricos convertidos a gas'],
      ['c', 'La potencia instalada supera la considerada en el diseño'],
      ['c', 'Existencia de calentadores especiales ubicados al interior de la edificación cuando estos no cuenten con ductos de evacuación o extracción de los productos de la combustión']]
  }];

const METODOS = ['Estándar', 'Comunicación entre espacios', 'Comunicación entre piezas', 'Volumen adyacente', 'Método 1', 'Método 2', 'Al exterior'];
const ANEXOS = ['Vacío 1 a 6 pisos', 'Vacío > 7 pisos', 'Ventilación', 'Evacuación', 'Combinado'];
const MATERIALES = ['Cobre flexible', 'Cobre rígido', 'Acero galvanizado', 'Acero corrugado flexible', 'Acero al carbón', 'Aluminio', 'Aleación de aluminio', 'PEALPE', 'PE'];
const DIAM = ['1/2"', '5/8"', '3/4"', '1"', '1 1/4"', '1 1/2"', '2"', '> 2"'];
const ACCIONES = ['Se toman registros fotográficos', 'Se brinda al cliente la información de las condiciones del servicio', 'Se informa al cliente el resultado de la inspección', 'Se informa al usuario acerca de dispositivos de CO', 'Se pega etiqueta de certificación', 'Se informa al distribuidor de inmediato los defectos críticos', 'Se realiza reconexión temporal del servicio'];
const EQUIPOS = [['codet', 'Detector de CO (serial)'], ['gasdet', 'Detector de gas (serial)'], ['flex', 'Flexómetro (ref.)']];

/* Fotos obligatorias. "after"+"min": la foto final se habilita pasados X minutos de la inicial */
const GRUPOS = [
  {
    n: 'Instalación', p: [
      { k: 'fachada', t: 'Fachada de la casa', h: 'Que se vea el frente del inmueble.' },
      { k: 'valvulas', t: 'Válvulas de corte interiores', h: 'Las válvulas de corte de la instalación.' },
      { k: 'sitio', t: 'Sitio donde están los artefactos', h: 'Foto general del recinto.' },
      { k: 'artefacto', t: 'Artefacto', h: 'Foto del artefacto a gas.' }]
  },
  {
    n: 'Prueba de hermeticidad', p: [
      { k: 'herm_ini', t: 'Lectura inicial del medidor', h: 'Al tomar esta foto arranca el cronómetro de 12 minutos.' },
      { k: 'herm_fin', t: 'Lectura final del medidor', h: 'La lectura debe ser la misma que la inicial.', after: 'herm_ini', min: 12 }]
  },
  {
    n: 'Prueba de monóxido de carbono (CO)', p: [
      { k: 'co_off', t: 'Detector de CO con artefactos apagados', h: 'Foto del detector con los artefactos apagados.' },
      { k: 'co_ini', t: 'Artefactos encendidos: foto inicial', h: 'Ej.: estufa con los cuatro fogones prendidos. Arranca el cronómetro de 5 minutos.' },
      { k: 'co_fin', t: 'Artefactos encendidos: foto final', h: 'Foto del detector pasados 5 minutos.', after: 'co_ini', min: 5 }]
  },
  {
    n: 'Conexiones', p: [
      { k: 'conexiones', t: 'Conexiones de los artefactos', h: 'Foto de las conexiones de cada artefacto.' }]
  }];
const PASOS = GRUPOS.flatMap(g => g.p);