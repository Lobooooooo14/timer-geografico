import { convertDigitToLocation } from "@/utils/converter"
import { useQuery } from "@tanstack/react-query"
import { memo, useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import cordinatesUrl from "/cordinates.json?url"
import "leaflet-rotate"

export type LocationType = {
  cords: number[]
  angle: number
  zoom: number
}

export interface CordinatesResponse {
  [key: number]: LocationType[]
}

async function getCordinates(): Promise<CordinatesResponse> {
  const response = await fetch(cordinatesUrl)
  const data: CordinatesResponse = await response.json()

  return data
}

function Digit({ digit }: { digit: number }) {
  const { data: cordinates } = useQuery({
    queryKey: ["cordinates"],
    queryFn: getCordinates,
  })

  const [location, setLocation] = useState<LocationType>({
    cords: [0, 0],
    angle: 0,
    zoom: 1,
  })

  useEffect(() => {
    if (cordinates) {
      setLocation(convertDigitToLocation(digit, cordinates))
    }
  }, [digit, cordinates])

  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
      scrollWheelZoom={true}
      zoomControl={false}
      attributionControl={false}
      minZoom={1}
      maxZoom={20}
      style={{ width: "100%", height: "100%" }}
      doubleClickZoom={false}
      rotate={true}
      rotateControl={false}
    >
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      <MapGo to={location.cords} angle={location.angle} zoom={location.zoom} />
    </MapContainer>
  )
}

function MapGo({
  to,
  angle,
  zoom,
}: {
  to: LocationType["cords"]
  angle?: LocationType["angle"]
  zoom: LocationType["zoom"]
}) {
  const map = useMap()
  if (angle) {
    map.setBearing(angle)
  }

  map.flyTo([to[0], to[1]], zoom, {
    duration: 5,
  })

  return null
}

export default memo(Digit)
