function initGlobe() {
  const container = document.getElementById('globeViz');

  if (typeof Globe !== "function") {
    console.error("Globe not loaded");
    return;
  }

  const world = Globe()(container)
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
    .backgroundColor('#0b0f19')
    .showAtmosphere(true)
    .atmosphereColor('lightskyblue')
    .atmosphereAltitude(0.25);

  world.controls().autoRotate = true;
  world.controls().autoRotateSpeed = 0.6;

  let points = [];

  const regions = [
    { lat: 37.7749, lng: -122.4194 },
    { lat: 51.5074, lng: -0.1278 },
    { lat: 35.6762, lng: 139.6503 },
    { lat: 1.3521, lng: 103.8198 },
    { lat: -33.8688, lng: 151.2093 },
    { lat: 13.7563, lng: 100.5018 }
  ];

  function addPoint() {
    const r = regions[Math.floor(Math.random() * regions.length)];

    points.push({
      lat: r.lat + (Math.random() - 0.5) * 2,
      lng: r.lng + (Math.random() - 0.5) * 2,
      size: 0.4 + Math.random() * 0.6,
      color: '#ff4d4d',
      life: 1
    });

    world.pointsData(points)
      .pointAltitude(d => d.size)
      .pointColor(d => d.color);

    points = points.filter(p => (p.life -= 0.03) > 0);
  }

  setInterval(addPoint, 800);
}

document.addEventListener("DOMContentLoaded", initGlobe);
