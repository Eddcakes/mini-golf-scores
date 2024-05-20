/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as GameGameIdImport } from './routes/game.$gameId'

// Create Virtual Routes

const SettingsLazyImport = createFileRoute('/settings')()
const PragueLazyImport = createFileRoute('/prague')()
const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const SettingsLazyRoute = SettingsLazyImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/settings.lazy').then((d) => d.Route))

const PragueLazyRoute = PragueLazyImport.update({
  path: '/prague',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/prague.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const GameGameIdRoute = GameGameIdImport.update({
  path: '/game/$gameId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/prague': {
      id: '/prague'
      path: '/prague'
      fullPath: '/prague'
      preLoaderRoute: typeof PragueLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsLazyImport
      parentRoute: typeof rootRoute
    }
    '/game/$gameId': {
      id: '/game/$gameId'
      path: '/game/$gameId'
      fullPath: '/game/$gameId'
      preLoaderRoute: typeof GameGameIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AboutLazyRoute,
  PragueLazyRoute,
  SettingsLazyRoute,
  GameGameIdRoute,
})

/* prettier-ignore-end */