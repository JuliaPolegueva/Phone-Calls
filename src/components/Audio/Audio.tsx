import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Audio.module.scss';
import classNames from 'classnames/bind';
import Icons from '../Icons/Icons';
import { ICall } from '../../types/call.types';
import { getCallTime } from '../../utils/getDateFilter';

import play from '../../assets/images/play.svg';
import pause from '../../assets/images/pause.svg';
import { useGetAudioQuery } from '../../store/api/calls.api';

interface IAudioProps {
  call: ICall;
  //isHovered: boolean;
  // isChecked: boolean;
  // activeId: number | null;
  // setActiveId: (id: number) => void;
}

const Audio: FC<IAudioProps> = ({ call }: IAudioProps) => {
  const [duration, setDuration] = useState<number>(call.time);
  const [isPlay, setPlay] = useState(false);
  const [isAdd, setAdd] = useState(false);

  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data, isSuccess } = useGetAudioQuery({ record: call.record, partnership_id: call.partnership_id });

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
      setDuration(Math.round(duration - currentTime));
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleDuration = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      const diff = duration - currentTime;
      setDuration(Math.floor(diff));
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


  const barStyleWidth = { width: `${progress}%` };

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onLoadedMetadata={handleDuration}
        onTimeUpdate={handleUpdateTime}
      ></audio>
      <div className={styles.time}>{getCallTime((duration))}</div>
      <button className={styles.control} onClick={pla => setPlay(isPlay => !isPlay)}>
        {isPlay ? (
          <img src={pause} alt="Pause" className={styles.pauseIcon} />
        ) : (
          <img src={play} alt="Play" className={styles.playIcon} />
        )}
      </button>
      <div className={styles.bar} id={`${call.id}`} onClick={ handleSeek}>
        <div className={styles.barBase}></div>
        <div className={styles.barTop} style={barStyleWidth}></div>
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
