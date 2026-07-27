import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // The frames are from 000 to 101
  const imageIndex = Math.min(
    Math.max(0, Math.floor(frame)),
    durationInFrames - 1
  );
  
  const paddedIndex = String(imageIndex).padStart(3, '0');
  const imageSrc = `/frames/1/Trendy_oversized_hoodie_and_sk_${paddedIndex}.png`;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={imageSrc}
        alt={`Frame ${paddedIndex}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        onError={(e) => {
          // Fallback if image doesn't exist during dev
          e.currentTarget.style.display = 'none';
        }}
      />
    </AbsoluteFill>
  );
};
