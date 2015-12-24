const instagramRoot = 'https://www.instagram.com';

const urls = {
  user: (name)=> { return `${instagramRoot}/${name}` },
  explore: (id)=> { return `${instagramRoot}/explore/locations/${id}`; }
}

export default urls;
