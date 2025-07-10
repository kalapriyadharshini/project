function ExampleCarouselImage({ src, alt }) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        width: '100%',
        height: '600px',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay',
      }}
    />
  );
}
export default ExampleCarouselImage;

