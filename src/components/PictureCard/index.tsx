import { Picture } from "../../constants/types";

const PictureCard = ({ picture, handleClick }: { picture: Picture; handleClick: Function; }) => {
  return (
    <div className="card" onClick={() => handleClick(picture.id)}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={picture.uri || ""} alt={picture.uri} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Author: {picture.author}</div>
          <div className="font-bold text-xl mb-2">Created: {picture.createAt}</div>
        </div>
      </div>
    </div>
  );
};

export default PictureCard;