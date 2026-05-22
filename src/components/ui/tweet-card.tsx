'use client';

import { CSSProperties } from 'react';
import { Tweet } from 'react-tweet';
import anshProfile from '@/assets/ansh-profile.jpg';

interface TweetCardProps {
  id: string;
  className?: string;
  style?: CSSProperties;
}

const CustomAvatarImg = ({ alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
  <img
    src={anshProfile}
    alt={alt}
    width={width}
    height={height}
    style={{ borderRadius: '50%', objectFit: 'cover' }}
  />
);

export function TweetCard({ id, className, style }: TweetCardProps) {
  return (
    <div className={className} style={style}>
      <Tweet id={id} components={{ AvatarImg: CustomAvatarImg }} />
    </div>
  );
}

export function ClientTweetCard({ id, className, style }: TweetCardProps) {
  return (
    <div className={className} style={style}>
      <Tweet id={id} components={{ AvatarImg: CustomAvatarImg }} />
    </div>
  );
}
