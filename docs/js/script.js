// source: https://developers.google.com/maps/documentation/javascript/examples/streetview-custom-tiles?hl=ja

let panorama;

// StreetViewPanoramaData of a panorama just outside the Google Sydney office.
let outsideGoogle;

// StreetViewPanoramaData for a custom panorama: the Google Sydney reception.
const getReceptionPanoramaData = n => ({
  location: {
    pano: `pano${n}`,  // The ID for this custom panorama.
    description: `Panorama ${n}`,
  },
  links: [{
    heading: 0,
    description: 'Forward',
    pano: `pano${n + 1}`
  }, {
    heading: 180,
    description: 'Backward',
    pano: `pano${n - 1}`
  }],
  copyright: 'Imagery (c) 2019 IWABUCHI Yu(u)ki butchi',
  tiles: {
    tileSize: new google.maps.Size(1024, 512),
    worldSize: new google.maps.Size(2048, 1024),
    centerHeading: 105,
    getTileUrl: function(pano, zoom, tileX, tileY) {
      return `img/pano${n % 2}/image-${zoom}-${tileX}-${tileY}.jpg`;
    }
  }
});

const initPanorama = _ => {
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('street-view'),
    {pano: 'pano0'});
  // Register a provider for the custom panorama.
  panorama.registerPanoProvider(pano => {
    for (let i = 0; i < 99; i++) {
      if (pano === `pano${i}`) {
        return getReceptionPanoramaData(i);
      }
    }
    return null;
  });
}

const initialize = _ => {
  initPanorama();
}

window.initialize = initialize;
