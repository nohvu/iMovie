import React from 'react';
import { useParams } from 'react-router-dom';
import { tmdbApi } from '../../api/tmdbApi';

interface VideoListProps {
  id: number;
}

export const VideoList: React.FC<VideoListProps> = (props) => {
  const { category } = useParams();
  const [videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, props.id);
      setVideos(response.results.slice(0, 5));
    };
    getVideos();
  }, [category, props.id]);

  return (
    <>
      {videos.map((video, index) => (
        <Video key={index} item={video} />
      ))}
    </>
  );
};

interface ItemProps {
  name: string;
  key: string;
}
interface VideoProps {
  key: number;
  item: ItemProps;
}
const Video: React.FC<VideoProps> = (props) => {
  const iframeRef = React.useRef<any>(null);

  React.useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{props.item.name}</h2>
      </div>
      <div className="frame">
        <iframe
          src={`https://www.youtube.com/embed/${props.item.key}`}
          ref={iframeRef}
          width="70%"
          title="video"></iframe>
      </div>
    </div>
  );
};
