import useSound from 'use-sound';

export const useAppSounds = () => {
  // Sound URLs - Clean UI sounds
  const clickSfx = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
  const hoverSfx = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
  const transitionSfx = 'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3';

  const [playClick] = useSound(clickSfx, { volume: 0.5 });
  const [playHover] = useSound(hoverSfx, { volume: 0.2 });
  const [playTransition] = useSound(transitionSfx, { volume: 0.4 });

  return {
    playClick,
    playHover,
    playTransition
  };
};
