import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingStarProps {
   maxRating: number,
   rating: number
}

export default function RatingStar({maxRating, rating}: Readonly<RatingStarProps>) {
   return (
      {
         Array.from({length: maxRating}).map((_, index) =>{
            return <div className="flex gap-2">
            </div>
         })
      }
   );
}
