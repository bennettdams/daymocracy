import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<{
    x: number | null
    y: number | null
  }>({
    x: null,
    y: null,
  })

  useEffect(() => {
    function updateMousePosition(ev: MouseEvent) {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return mousePosition
}

function useElementPostition<TElementType extends HTMLElement>() {
  const elementRef = useRef<TElementType | null>(null)
  const [elementPosition, setElementPosition] = useState<DOMRect | null>(null)

  function calculateElementPosition() {
    if (elementRef.current) {
      const positionNew = elementRef.current.getBoundingClientRect()
      const scrollX = window.scrollX
      const scrollY = window.scrollY

      const positionNewWithScrollOffset = {
        ...positionNew.toJSON(),
        left: positionNew.left + scrollX,
        top: positionNew.top + scrollY,
      }

      if (
        JSON.stringify(positionNewWithScrollOffset) !==
        JSON.stringify(elementPosition)
      ) {
        setElementPosition(positionNewWithScrollOffset)
      }
    }
  }

  // calculate on scroll
  useLayoutEffect(() => {
    window.addEventListener('scroll', calculateElementPosition)

    return () => {
      window.removeEventListener('scroll', calculateElementPosition)
    }
  }, [])

  calculateElementPosition()

  return { elementRef, elementPosition }
}

export function useMouseDistance<TElementType extends HTMLElement>() {
  const mousePosition = useMousePosition()
  const { elementPosition, elementRef } = useElementPostition<TElementType>()

  const [distance, setDistance] = useState<{ x: number; y: number } | null>(
    null,
  )

  function calculateDistanceFromMouseToCenter() {
    if (
      elementPosition &&
      mousePosition &&
      mousePosition.x &&
      mousePosition.y
    ) {
      const { elementHorizontalCenter, elementVerticalCenter } =
        getElementCenters(elementPosition)

      const scrollX = window.scrollX
      const scrollY = window.scrollY

      const distanceNew = {
        x: mousePosition.x + scrollX - elementHorizontalCenter,
        y: mousePosition.y + scrollY - elementVerticalCenter,
      }

      if (JSON.stringify(distanceNew) !== JSON.stringify(distance)) {
        setDistance(distanceNew)
      }
    }
  }

  calculateDistanceFromMouseToCenter()

  const distanceSum = !distance
    ? null
    : Math.abs(distance.x) + Math.abs(distance.y)

  return { distance: distanceSum, elementRef }
}

function getElementCenters(elementPosition: DOMRect) {
  const horizontalCenterOffset = elementPosition.width / 2
  const verticalCenterOffset = elementPosition.height / 2

  const elementHorizontalCenter = elementPosition.left + horizontalCenterOffset
  const elementVerticalCenter = elementPosition.top + verticalCenterOffset

  return { elementHorizontalCenter, elementVerticalCenter }
}
