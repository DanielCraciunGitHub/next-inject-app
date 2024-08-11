import { Star } from "./SVG/Star"

interface FiveStarsProps {}

export const FiveStars = ({}: FiveStarsProps) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} />
      ))}
    </div>
  )
}
