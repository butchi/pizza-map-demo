// source: https://developers.google.com/maps/documentation/javascript/examples/streetview-custom-tiles?hl=ja

let panorama;

// const coordArr = [{
//   x: 0,
//   y: 3,
//   z: 0,
// }, {
//   x: 15,
//   y: 3,
//   z: 0,
// }, {
//   x: 15,
//   y: 3,
//   z: -15,
// }, {
//   x: 15,
//   y: 3,
//   z: -30,
// }, {
//   x: 30,
//   y: 3,
//   z: -30,
// }, {
//   x: 50,
//   y: 3,
//   z: -30,
// }, {
//   x: 50,
//   y: 3,
//   z: -15,
// }, {
//   x: 50,
//   y: 3,
//   z: 0,
// }, {
//   x: 65,
//   y: 3,
//   z: 0,
// }, {
//   x: 80,
//   y: 3,
//   z: 0,
// }, {
//   x: 80,
//   y: 3,
//   z: 20,
// }];

linkArr = [
  [{
    heading: 90,
    description: 'Forward',
    pano: `pano1`,
  }],
  [{
    heading: 180,
    description: 'Forward',
    pano: `pano2`,
  }, {
    heading: 270,
    description: 'Backward',
    pano: `pano0`,
  }],
  [{
    heading: 180,
    description: 'Forward',
    pano: `pano3`,
  }, {
    heading: 0,
    description: 'Backward',
    pano: `pano1`,
  }],
  [{
    heading: 90,
    description: 'Forward',
    pano: `pano4`,
  }, {
    heading: 0,
    description: 'Backward',
    pano: `pano2`,
  }],
  [{
    heading: 90,
    description: 'Forward',
    pano: `pano5`,
  }, {
    heading: 270,
    description: 'Backward',
    pano: `pano3`,
  }],
  [{
    heading: 0,
    description: 'Forward',
    pano: `pano6`,
  }, {
    heading: 270,
    description: 'Backward',
    pano: `pano4`,
  }],
  [{
    heading: 0,
    description: 'Forward',
    pano: `pano7`,
  }, {
    heading: 180,
    description: 'Backward',
    pano: `pano5`,
  }],
  [{
    heading: 90,
    description: 'Forward',
    pano: `pano8`,
  }, {
    heading: 180,
    description: 'Backward',
    pano: `pano6`,
  }],
  [{
    heading: 270,
    description: 'Backward',
    pano: `pano7`,
  }],
];

// StreetViewPanoramaData of a panorama just outside the Google Sydney office.
let outsideGoogle;

// StreetViewPanoramaData for a custom panorama: the Google Sydney reception.
const getReceptionPanoramaData = n => ({
  location: {
    pano: `pano${n}`,  // The ID for this custom panorama.
    description: `Panorama ${n}`,
  },
  links: linkArr[n],
  copyright: 'Imagery (c) 2019 IWABUCHI Yu(u)ki butchi',
  tiles: {
    tileSize: new google.maps.Size(1024, 512),
    worldSize: new google.maps.Size(8192, 4096),
    centerHeading: 105,
    getTileUrl: function(pano, zoom, tileX, tileY) {
      return `img/pano${n}/image-${zoom}-${tileX}-${tileY}.jpg`;
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
