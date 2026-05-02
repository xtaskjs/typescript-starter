# typescript-starter

Starter en TypeScript para xTaskJS con adapter de Express.

Repositorio base de referencia:
https://github.com/xtaskjs/xtask

## Incluye

- Estructura TypeScript bajo `src/`
- Controladores y servicios con DI de xTaskJS
- Runtime HTTP con `@xtaskjs/express-http`
- Vistas en `views/` y assets estáticos en `public/`
- Tests unitarios e integración
- Build de producción a `dist/`

## Dependencias xTaskJS actualizadas

- `@xtaskjs/common` `^1.0.30`
- `@xtaskjs/core` `^1.0.30`
- `@xtaskjs/express-http` `^1.0.27`

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm start
```

URL por defecto:

```text
http://127.0.0.1:3000
```

## Arranque paralelo (nuevo)

xTaskJS puede escanear autoload candidates en paralelo usando workers.

```bash
npm run start:parallel
```

Para depuración en modo single-worker:

```bash
npm run start:single-worker
```

Para ejecutar build + arranque de produccion con workers automaticos:

```bash
npm run start:prod:parallel
```

## Configuración de arranque (nueva)

El starter ahora aplica el patrón moderno de bootstrap visto en los samples de `xtaskjs/xtask`:

- `container.resolutionStrategy` (`XTASK_DI_STRATEGY=eager|lazy`)
- `container.metricsEnabled` (`XTASK_DI_METRICS=false` para desactivar)
- `hotManifestWatcher.enabled` en `development`
- `hotManifestWatcher.debounceMs` (`XTASK_HOT_DEBOUNCE_MS`, default `60`)
- `prebuiltManifest.enabled` en `production`

El manifiesto generado por xTaskJS (`.xtask-manifest.json`) queda ignorado en git.

## Variables útiles

```bash
HOST=0.0.0.0 PORT=4000 npm start
XTASK_DI_STRATEGY=eager npm start
XTASK_DI_METRICS=false npm start
XTASK_HOT_DEBOUNCE_MS=120 npm start
XTASK_SCAN_WORKERS=1 npm start
```

## Scripts

- `npm start`: arranque normal
- `npm run start:parallel`: arranque con workers automáticos
- `npm run start:single-worker`: arranque forzando 1 worker
- `npm run start:prod:parallel`: build + arranque de producción con workers automáticos
- `npm run dev`: modo watch con nodemon
- `npm run typecheck`: chequeo de tipos
- `npm run clean:dev`: borra `dist/` y `.xtask-manifest.json` para reset rápido de desarrollo
- `npm test`: todos los tests
- `npm run test:unit`: solo unit tests
- `npm run test:integration`: solo integration tests
- `npm run build`: build a `dist/` + copia de assets
- `npm run start:prod`: build y arranque desde `dist/`

## Troubleshooting del manifiesto

Si notas que no detecta nuevos controladores/servicios o cambios de decoradores:

1. Deten la app.
2. Elimina el manifiesto cacheado.
3. Arranca de nuevo.

```bash
rm -f .xtask-manifest.json
npm start
```

En desarrollo, `hotManifestWatcher` ya esta habilitado automaticamente, pero borrar el manifiesto sigue siendo util cuando hubo cambios estructurales grandes.

Reset rápido recomendado:

```bash
npm run clean:dev && npm start
```
