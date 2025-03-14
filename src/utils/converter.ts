import type { CordinatesResponse, LocationType } from "@/components/digit"
import { choice } from "./tools"

export function convertMsToTimeMatrix(ms: number): number[][] {
  const totalSeconds = Math.floor(ms / 1000)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [
    toDigitsArray(hours),
    toTwoDigitsArray(minutes),
    toTwoDigitsArray(seconds),
  ]
}

export function convertDigitToLocation(
  digit: number,
  cordnates: CordinatesResponse
): LocationType {
  const location = choice(cordnates[digit])

  return location
}

function toDigitsArray(n: number) {
  return String(n)
    .split("")
    .map(digit => Number(digit))
}

function toTwoDigitsArray(n: number) {
  return String(n)
    .padStart(2, "0")
    .split("")
    .map(digit => Number(digit))
}
