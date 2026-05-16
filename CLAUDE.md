# Proyecto: Cien años de soledad — Edición digital interactiva

## Objetivo
Crear una visualización interactiva inspirada en ladonacion.es para la
novela *Cien años de soledad* de Gabriel García Márquez. Cuatro dimensiones:
relaciones entre personajes, cronología, geografía y documentos/objetos.
Posible quinta capa: simbólica/motívica.


## Convenciones de IDs (homonimia)
Sistema obligatorio para distinguir personajes con nombres repetidos.
Formato: NOMBRE_APELLIDO_DESAMBIGUADOR.
Ejemplos:
- JOSE_ARCADIO_BUENDIA_FUNDADOR  (el patriarca)
- JOSE_ARCADIO_HIJO              (el del miembro tatuado)
- JOSE_ARCADIO_SEGUNDO           (gemelo, el de la matanza)
- AURELIANO_BUENDIA_CORONEL      (el coronel)
- AURELIANO_JOSE                 (hijo del coronel y Pilar)
- AURELIANO_SEGUNDO              (gemelo de José Arcadio Segundo)
- AURELIANO_BABILONIA            (el que descifra los pergaminos)

Cada ID debe ser único, estable y nunca reutilizado.

## Modelo de datos
Archivos JSON en /datos/:
- personajes.json
- lugares.json
- eventos.json (cronológicos, con fechas relativas o absolutas según el caso)
- documentos.json (pergaminos, cartas, edictos...)
- relaciones.json (aristas del grafo: parental, marital, amorosa, conflicto...)
- simbolos.json (capa opcional: mariposas amarillas, lluvia, oro, hielo...)

## Flujo de trabajo
1. Procesamos capítulo a capítulo (20 capítulos sin numerar; los identifico
   por su primera frase o un epígrafe de mi cosecha).
2. Por cada capítulo: añado entidades nuevas, registro eventos, actualizo
   relaciones. NUNCA modifico IDs ya asignados.
3. Tras cada capítulo, Claude debe ejecutar /datos/validar.py para
   comprobar coherencia (IDs únicos, referencias huérfanas, etc.).

## Stack técnico
- Datos: JSON
- Validación: Python con jsonschema
- Visualización: adaptación del motor de ladonacion.es, todo el codigo en github: https://github.com/JaimeObregon/ladonacion.es

## Lo que NO debe hacer Claude
- Inventar personajes, fechas o relaciones no atestiguadas en mi input.
- Modificar IDs existentes sin pedirme confirmación.
- Reproducir párrafos del texto en los datos JSON.
- Asumir cronologías sin marcarlas como "inferidas" cuando no son explícitas.
