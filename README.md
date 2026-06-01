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

- `@xtaskjs/common` `^1.0.47`
- `@xtaskjs/core` `^1.0.47`
- `@xtaskjs/express-http` `^1.0.44`

## Gestión de proyecto

Este starter está alineado con el workspace actual de xTaskJS:

- Gestor de paquetes: `pnpm` (`packageManager: pnpm@10.0.0`)
- Orquestación de tareas: `turbo` (archivo `turbo.json`)
- Workspace: `pnpm-workspace.yaml`

## Instalación

```bash
pnpm install
```

## Ejecutar

```bash
pnpm start
```

URL por defecto:

```text
http://127.0.0.1:3000
```

## Arranque paralelo (nuevo)

xTaskJS puede escanear autoload candidates en paralelo usando workers.

```bash
pnpm run start:parallel
```

Para depuración en modo single-worker:

```bash
pnpm run start:single-worker
```

Para ejecutar build + arranque de produccion con workers automaticos:

```bash
pnpm run start:prod:parallel
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
HOST=0.0.0.0 PORT=4000 pnpm start
XTASK_DI_STRATEGY=eager pnpm start
XTASK_DI_METRICS=false pnpm start
XTASK_HOT_DEBOUNCE_MS=120 pnpm start
XTASK_SCAN_WORKERS=1 pnpm start
```

## Scripts

- `pnpm start`: arranque normal
- `pnpm run start:parallel`: arranque con workers automáticos
- `pnpm run start:single-worker`: arranque forzando 1 worker
- `pnpm run start:prod:parallel`: build + arranque de producción con workers automáticos
- `pnpm run dev`: modo watch con nodemon
- `pnpm run typecheck`: chequeo de tipos vía `turbo`
- `pnpm run clean:dev`: borra `dist/` y `.xtask-manifest.json` para reset rápido de desarrollo
- `pnpm test`: todos los tests vía `turbo`
- `pnpm run test:unit`: solo unit tests
- `pnpm run test:integration`: solo integration tests
- `pnpm run build`: build de app vía `turbo`
- `pnpm run start:prod`: build y arranque desde `dist/`

## Turbo tasks

El proyecto expone tareas internas para orquestación con `turbo`:

- `build:app`
- `test:app`
- `typecheck:app`

Comandos directos:

```bash
pnpm run turbo:build
pnpm run turbo:test
```

## Troubleshooting del manifiesto

Si notas que no detecta nuevos controladores/servicios o cambios de decoradores:

1. Deten la app.
2. Elimina el manifiesto cacheado.
3. Arranca de nuevo.

```bash
rm -f .xtask-manifest.json
pnpm start
```

En desarrollo, `hotManifestWatcher` ya esta habilitado automaticamente, pero borrar el manifiesto sigue siendo util cuando hubo cambios estructurales grandes.

Reset rápido recomendado:

```bash
pnpm run clean:dev && pnpm start
```
