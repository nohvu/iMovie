import React from 'react';
import { useParams } from 'react-router-dom';
import { apiConfig } from '../../api/apiConfig';
import { tmdbApi } from '../../api/tmdbApi';

interface CastListProps {
  id: number;
}

interface CastProps {
  name: string;
  profile_path: string;
}

export const CastList: React.FC<CastListProps> = (props) => {
  const { category } = useParams();
  const [casts, setCasts] = React.useState<CastProps[]>([]);
  React.useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts.map((cast, index) => (
        <div key={index} className="casts__item">
          <div
            className="casts__item__img"
            style={{ backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})` }}></div>

          <p className="cast__item__name">{cast.name}</p>
        </div>
      ))}
    </div>
  );
};
