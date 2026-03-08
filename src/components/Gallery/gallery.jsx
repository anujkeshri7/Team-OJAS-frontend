import React from "react";

const data = [
  {
    title: "Mountain View",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    title: "City Night",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
  },
  {
    title: "Beach Sunset",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    title: "Forest Path",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
   {
    title: "Mountain View",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    title: "City Night",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
  },
  {
    title: "Beach Sunset",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    title: "Forest Path",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
   {
    title: "Mountain View",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    title: "City Night",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
  },
  {
    title: "Beach Sunset",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    title: "Forest Path",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
   {
    title: "Mountain View",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    title: "City Night",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
  },
  {
    title: "Beach Sunset",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    title: "Forest Path",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  }
];

export default function Gallery() {
  return (
    <div style={styles.grid}>
      {data.map((item, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.imageWrapper}>
            <img src={item.image} alt={item.title} style={styles.image} />
          </div>

          <div style={styles.title}>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
    gap: "16px",
    padding: "20px"
  },

  card: {
    borderRadius: "12px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  imageWrapper: {
    aspectRatio: "3 / 4", // fixed layout
    width: "100%",
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  title: {
    padding: "10px",
    fontWeight: "600",
    textAlign: "center"
  }
};