import { motion } from "motion/react";

const photos = [
  {
    src: "/assets/generated/gallery-first-date.dim_400x400.jpg",
    caption: "Our First Date ♥",
  },
  {
    src: "/assets/generated/gallery-rome.dim_400x400.jpg",
    caption: "Rome, Summer '21",
  },
  {
    src: "/assets/generated/gallery-wedding.dim_400x400.jpg",
    caption: "Our Wedding Day",
  },
  {
    src: "/assets/generated/gallery-movie-night.dim_400x400.jpg",
    caption: "Movie Nights at Home",
  },
  {
    src: "/assets/generated/gallery-adventure.dim_400x400.jpg",
    caption: "Mountain Adventures",
  },
  {
    src: "/assets/generated/gallery-birthday.dim_400x400.jpg",
    caption: "Celebrations Together",
  },
];

export function PhotoGallery() {
  return (
    <section id="gallery" className="max-w-6xl mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="font-playfair text-3xl font-semibold text-foreground mb-1">
          Our Journey in Pictures
        </h2>
        <div className="w-16 h-0.5 bg-gold" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ rotate: 1, scale: 1.02 }}
            className="polaroid cursor-pointer"
            data-ocid={`gallery.item.${photos.indexOf(photo) + 1}`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full aspect-square object-cover"
            />
            <p className="font-dancing text-lg text-center text-foreground/80 mt-2 px-1">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
