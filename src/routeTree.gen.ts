/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as ChartsImport } from './routes/_charts'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutGameIndexImport } from './routes/_layout/game.index'
import { Route as LayoutSettingsExportImport } from './routes/_layout/settings.export'
import { Route as LayoutGameGameIdImport } from './routes/_layout/game.$gameId'
import { Route as ChartsChartGameIdImport } from './routes/_charts/chart.$gameId'

// Create Virtual Routes

const LayoutSettingsLazyImport = createFileRoute('/_layout/settings')()
const LayoutAboutLazyImport = createFileRoute('/_layout/about')()
const ChartsPragueLazyImport = createFileRoute('/_charts/prague')()
const LayoutSettingsImportLazyImport = createFileRoute(
  '/_layout/settings/import',
)()

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const ChartsRoute = ChartsImport.update({
  id: '/_charts',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutSettingsLazyRoute = LayoutSettingsLazyImport.update({
  path: '/settings',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/settings.lazy').then((d) => d.Route),
)

const LayoutAboutLazyRoute = LayoutAboutLazyImport.update({
  path: '/about',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() => import('./routes/_layout/about.lazy').then((d) => d.Route))

const ChartsPragueLazyRoute = ChartsPragueLazyImport.update({
  path: '/prague',
  getParentRoute: () => ChartsRoute,
} as any).lazy(() =>
  import('./routes/_charts/prague.lazy').then((d) => d.Route),
)

const LayoutGameIndexRoute = LayoutGameIndexImport.update({
  path: '/game/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutSettingsImportLazyRoute = LayoutSettingsImportLazyImport.update({
  path: '/import',
  getParentRoute: () => LayoutSettingsLazyRoute,
} as any).lazy(() =>
  import('./routes/_layout/settings.import.lazy').then((d) => d.Route),
)

const LayoutSettingsExportRoute = LayoutSettingsExportImport.update({
  path: '/export',
  getParentRoute: () => LayoutSettingsLazyRoute,
} as any)

const LayoutGameGameIdRoute = LayoutGameGameIdImport.update({
  path: '/game/$gameId',
  getParentRoute: () => LayoutRoute,
} as any)

const ChartsChartGameIdRoute = ChartsChartGameIdImport.update({
  path: '/chart/$gameId',
  getParentRoute: () => ChartsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_charts': {
      id: '/_charts'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ChartsImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_charts/prague': {
      id: '/_charts/prague'
      path: '/prague'
      fullPath: '/prague'
      preLoaderRoute: typeof ChartsPragueLazyImport
      parentRoute: typeof ChartsImport
    }
    '/_layout/about': {
      id: '/_layout/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof LayoutAboutLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/settings': {
      id: '/_layout/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof LayoutSettingsLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_charts/chart/$gameId': {
      id: '/_charts/chart/$gameId'
      path: '/chart/$gameId'
      fullPath: '/chart/$gameId'
      preLoaderRoute: typeof ChartsChartGameIdImport
      parentRoute: typeof ChartsImport
    }
    '/_layout/game/$gameId': {
      id: '/_layout/game/$gameId'
      path: '/game/$gameId'
      fullPath: '/game/$gameId'
      preLoaderRoute: typeof LayoutGameGameIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/settings/export': {
      id: '/_layout/settings/export'
      path: '/export'
      fullPath: '/settings/export'
      preLoaderRoute: typeof LayoutSettingsExportImport
      parentRoute: typeof LayoutSettingsLazyImport
    }
    '/_layout/settings/import': {
      id: '/_layout/settings/import'
      path: '/import'
      fullPath: '/settings/import'
      preLoaderRoute: typeof LayoutSettingsImportLazyImport
      parentRoute: typeof LayoutSettingsLazyImport
    }
    '/_layout/game/': {
      id: '/_layout/game/'
      path: '/game'
      fullPath: '/game'
      preLoaderRoute: typeof LayoutGameIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  ChartsRoute: ChartsRoute.addChildren({
    ChartsPragueLazyRoute,
    ChartsChartGameIdRoute,
  }),
  LayoutRoute: LayoutRoute.addChildren({
    LayoutAboutLazyRoute,
    LayoutSettingsLazyRoute: LayoutSettingsLazyRoute.addChildren({
      LayoutSettingsExportRoute,
      LayoutSettingsImportLazyRoute,
    }),
    LayoutIndexRoute,
    LayoutGameGameIdRoute,
    LayoutGameIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_charts",
        "/_layout"
      ]
    },
    "/_charts": {
      "filePath": "_charts.tsx",
      "children": [
        "/_charts/prague",
        "/_charts/chart/$gameId"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/about",
        "/_layout/settings",
        "/_layout/",
        "/_layout/game/$gameId",
        "/_layout/game/"
      ]
    },
    "/_charts/prague": {
      "filePath": "_charts/prague.lazy.tsx",
      "parent": "/_charts"
    },
    "/_layout/about": {
      "filePath": "_layout/about.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/settings": {
      "filePath": "_layout/settings.lazy.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/settings/export",
        "/_layout/settings/import"
      ]
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_charts/chart/$gameId": {
      "filePath": "_charts/chart.$gameId.tsx",
      "parent": "/_charts"
    },
    "/_layout/game/$gameId": {
      "filePath": "_layout/game.$gameId.tsx",
      "parent": "/_layout"
    },
    "/_layout/settings/export": {
      "filePath": "_layout/settings.export.tsx",
      "parent": "/_layout/settings"
    },
    "/_layout/settings/import": {
      "filePath": "_layout/settings.import.lazy.tsx",
      "parent": "/_layout/settings"
    },
    "/_layout/game/": {
      "filePath": "_layout/game.index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
