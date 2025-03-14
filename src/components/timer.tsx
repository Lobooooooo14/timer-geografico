import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { convertMsToTimeMatrix } from "@/utils/converter"
import Digit from "./digit"

const TIMER_API_URL = "https://subathon-api.justdavi.dev/api/time-left"

interface TimerResponse {
  timeLeft: number
}

async function getTimerTime(): Promise<TimerResponse> {
  const response = await fetch(TIMER_API_URL)
  const data: TimerResponse = await response.json()

  return data
}

function Timer() {
  const timerResponse = useQuery({
    queryKey: ["timer"],
    queryFn: getTimerTime,
    refetchInterval: 10000,
  })

  const [timeLeft, setTimeLeft] = useState(0)
  const [timeMatrix, setTimeMatrix] = useState<number[][]>([
    [0, 0],
    [0, 0],
    [0, 0],
  ])

  useEffect(() => {
    if (timerResponse.data?.timeLeft) {
      setTimeLeft(timerResponse.data.timeLeft)
    }
  }, [timerResponse.data])

  useEffect(() => {
    const timeMatrix = convertMsToTimeMatrix(timeLeft)

    // 10 -> : (gambiarra)
    timeMatrix[1].unshift(10)
    timeMatrix[2].unshift(10)

    setTimeMatrix(timeMatrix)
  }, [timeLeft])

  return (
    <>
      <div className="timer w-full justify-center">
        {timeMatrix[0].map((digit, index) => (
          <div key={`${index}_${digit}`} className="digit">
            <Digit digit={digit} />
          </div>
        ))}

        {[...timeMatrix[1], ...timeMatrix[2]].map((digit, index) => (
          <div key={`${index}_${digit}`} className="digit">
            <Digit digit={digit} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Timer
