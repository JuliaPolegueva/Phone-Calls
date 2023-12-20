import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Audio.module.scss';

import Icons from '../Icons/Icons';
import { ICall } from '../../types/call.types';
import { getCallTime } from '../../utils/getDateFilter';
import { useGetAudioQuery } from '../../store/api/calls.api';

import play from '../../assets/images/play.svg';
import pause from '../../assets/images/pause.svg';

interface IAudioProps {
  call: ICall;
}

const Audio: FC<IAudioProps> = ({ call }: IAudioProps) => {
  const [duration, setDuration] = useState<number>(call.time);
  const [isPlay, setPlay] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState('');
  const [hoverTime, setHoverTime] = useState<string>('0:00');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data, isError, error } = useGetAudioQuery({ record: call.record, partnership_id: call.partnership_id });

  useEffect(() => {
    if (isPlay) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlay]);

  useEffect(() => {
    if (data) {
      setUrl(URL.createObjectURL(data));
    }
  }, [data]);

  const handleUpdateTime = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      setDuration(duration - currentTime);
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleDuration = () => {
    if (audioRef.current?.duration) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      const diff = duration - currentTime;
      setDuration(diff);
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const offset = event.clientX - rect.left;
      const barWidth = rect.width;
      const seekTime = (offset / barWidth) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress((seekTime / audioRef.current.duration) * 100);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const offset = event.clientX - rect.left;
      const barWidth = rect.width;
      const hoverTimeInSeconds = (offset / barWidth) * audioRef.current.duration;
      if (!isNaN(hoverTimeInSeconds)) {
        setHoverTime(getCallTime(hoverTimeInSeconds));
      }
      const hoverTimeElement = document.getElementById('hoverTime');

      if (hoverTimeElement) {
        hoverTimeElement.style.left = `${offset - hoverTimeElement.offsetWidth / 2}px`;
      }
    }
  };

  const barStyle = { width: `${progress}%` };

  if (isError) {
    if ('status' in error)
      return (
        <div>
          {error.status} {JSON.stringify(error.data)}
        </div>
      );
  }

  return (
    <div className={styles.audio}>
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onLoadedMetadata={handleDuration}
        onTimeUpdate={handleUpdateTime}
      ></audio>
      <div className={styles.timer}>{getCallTime(duration)}</div>
      <button className={styles.play} onClick={pla => setPlay(isPlay => !isPlay)}>
        {isPlay ? (
          <img src={pause} alt="Pause" className={styles.pauseIcon} />
        ) : (
          <img src={play} alt="Play" className={styles.playIcon} />
        )}
      </button>
      <div className={styles.bar} id={`${call.id}`} onMouseMove={handleMouseMove} onClick={handleSeek}>
        <div id="hoverTime" className={styles.hoverTime}>
          {hoverTime}
        </div>
        <div className={styles.bar__base}></div>
        <div className={styles.bar__line} style={barStyle}></div>
      </div>
      <button className={styles.download} onClick={() => setAdd(true)}>
        {isAdd ? <Icons name="download" direction="add" /> : <Icons name="download" />}
      </button>
      <button className={styles.close} onClick={() => setAdd(false)}>
        {isAdd && <Icons name="close" />}
      </button>
    </div>
  );
};

export default Audio;
