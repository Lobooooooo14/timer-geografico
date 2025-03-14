import "leaflet"

declare module "leaflet" {
  interface Map {
    setBearing(bearing: number): void
    getBearing(): number
  }

  interface MapOptions {
    rotate?: boolean
    rotateControl?: boolean
  }
}
