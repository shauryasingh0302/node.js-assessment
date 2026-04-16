function degToRad(degree) {
  return (degree * Math.PI) / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const radius = 6371; // distance in km

  const latDiff = degToRad(lat2 - lat1);
  const lonDiff = degToRad(lon2 - lon1);

  const part1 = Math.sin(latDiff / 2) * Math.sin(latDiff / 2);
  const part2 =
    Math.cos(degToRad(lat1)) *
    Math.cos(degToRad(lat2)) *
    Math.sin(lonDiff / 2) *
    Math.sin(lonDiff / 2);

  const value = part1 + part2;
  const angle = 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));

  return radius * angle;
}

module.exports = calculateDistance;