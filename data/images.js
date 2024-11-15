/*
This is the file to edit with new images.
-> Leave the blurHash property as an empty String.
The blurHashes are generated by running the script in src/scripts/encodeBlurHash.js
using "node path/to/encodeBlurHash.js" .
The script then generates a new file in src/data/updatedGalleryImages.js. This file is then used by the vue app to insert the images
and the blurHashes.
~~ WRITTEN IN COMMONJS SYNTAX ~~
*/

const img1 = "../assets/img/gallery-images/20231108_190940.jpg";
const img2 = "../assets/img/gallery-images/20231108_191105.jpg";
const img3 = "../assets/img/gallery-images/20231108_191248.jpg";
const img4 = "../assets/img/gallery-images/20231108_191340.jpg";
const img5 = "../assets/img/gallery-images/20231110_143443.jpg";
const img6 = "../assets/img/gallery-images/20231110_143926.jpg";
const img7 = "../assets/img/gallery-images/20231110_144523.jpg";
const img8 = "../assets/img/gallery-images/20231110_144720.jpg";
const img9 = "../assets/img/gallery-images/20231110_145031.jpg";
const img10 = "../assets/img/gallery-images/20231110_145506.jpg";
const img11 = "../assets/img/gallery-images/20231110_145749.jpg";
const img12 = "../assets/img/Ingride.jpg";
const img13 = "../assets/img/Ingride02.png";

const images = [
  {
    path: img1,
    blurHash: "U99tH6kQEnRW00t8MvIoyGs;%3NXwgWnNyn+",
    alt: "image 1",
    caption: "In der Zauberstube 1",
    category: "gallery",
  },
  {
    path: img2,
    blurHash: "U7E-:Y2c00j_4q$$JB%1rAOY_NwJIDWUS}X9",
    alt: "image 2",
    caption: "In der Zauberstube ",
    category: "gallery",
  },
  {
    path: img3,
    blurHash: "UDEf45|hy9+g_1ZqR*D-vW-.$#xXRrk:NJ$$",
    alt: "image 3",
    caption: "In der Zauberstube ",
    category: "gallery",
  },
  {
    path: img4,
    blurHash: "UVKKE0M{?^t7^+xuNHM{s:R*WVV@IUtRoLRj",
    alt: "image 4",
    caption: "In der Zauberstube ",
    category: "gallery",
  },
  {
    path: img5,
    blurHash: "U7AVpzDJ8w#ZLr%gvWOmzqHZo}.S+hrGRPVF",
    alt: "image 5",
    caption: "In der Zauberstube ",
    category: "gallery",
  },
  {
    path: img6,
    blurHash: "U2BFH?QND4D4*4-:r5g3EhATG8m9ERJ6yAIF",
    alt: "image 6",
    caption: "caption 6",
    category: "gallery",
  },
  {
    path: img7,
    blurHash: "U6D[eA4T3#2,ATRP[@=#K0,]^PNx||NZKNrt",
    alt: "image 7",
    caption: "caption 7",
    category: "gallery",
  },
  {
    path: img8,
    blurHash: "UDA-z_~BohD$I9R$t3%LHYY4tK%3tReotRt8",
    alt: "image 8",
    caption: "caption 8",
    category: "gallery",
  },
  {
    path: img9,
    blurHash: "UEBEZ^Dlm.RP~TRPoyM}Husmb[NHoya$M|xt",
    alt: "image 9",
    caption: "caption 9",
    category: "gallery",
  },
  {
    path: img10,
    blurHash: "UBD]@x~qLHR~0KEfm:n48Cbs+OkE}In5FqS^",
    alt: "image 10",
    caption: "caption 10",
    category: "gallery",
  },
  {
    path: img11,
    blurHash: "U7HnpatlwUuM_x?[xR$-3u5$vg+i8prVw6%N",
    alt: "image 11",
    caption: "caption 11",
    category: "gallery",
  },
  {
    path: img12,
    blurHash: "UXLD[J^+.SIp~qW?9Zs,o}RjROxtt8e:jZkD",
    alt: "Image of Artist",
    caption: "Ingride",
    category: "NotInUse",
  },
  {
    path: img13,
    blurHash: "hHo2X?a-;ai~po#W=RkxbWBM{j=bHayRjof",
    alt: "Image of Artist",
    caption: "Ingride",
    category: "AboutTheArtist",
  },
];

module.exports = images;
