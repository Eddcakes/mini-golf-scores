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
import { Route as LayoutGameGameIdImport } from './routes/_layout/game.$gameId'

// Create Virtual Routes

const LayoutSettingsLazyImport = createFileRoute('/_layout/settings')()
const LayoutAboutLazyImport = createFileRoute('/_layout/about')()
const ChartsPragueLazyImport = createFileRoute('/_charts/prague')()

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

const LayoutGameGameIdRoute = LayoutGameGameIdImport.update({
  path: '/game/$gameId',
  getParentRoute: () => LayoutRoute,
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
    '/_layout/game/$gameId': {
      id: '/_layout/game/$gameId'
      path: '/game/$gameId'
      fullPath: '/game/$gameId'
      preLoaderRoute: typeof LayoutGameGameIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/game/': {
      id: '/_layout/game/'
      path: '/game/'
      fullPath: '/game/'
      preLoaderRoute: typeof LayoutGameIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  ChartsRoute: ChartsRoute.addChildren({ ChartsPragueLazyRoute }),
  LayoutRoute: LayoutRoute.addChildren({
    LayoutAboutLazyRoute,
    LayoutSettingsLazyRoute,
    LayoutIndexRoute,
    LayoutGameGameIdRoute,
    LayoutGameIndexRoute,
  }),
})

/* prettier-ignore-end */
