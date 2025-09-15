import seroja1 from '../../assets/properties/prop1.jpg'
import seroja2 from '../../assets/properties/prop2.jpg'
import dahlia1 from '../../assets/properties/prop3.jpg'
import dahlia2 from '../../assets/properties/prop4.jpg'
import studio1 from '../../assets/properties/prop5.jpg'
import studio2 from '../../assets/properties/prop6.jpg'


const propertiesData = [
  {
    id:1,
    title:"Taman Seroja",
    price:"RM200 ",
    location:"Taman Seroja, Bandar Baru Salak Tinggi , 43900, Sepang,Selangor",
    bedrooms: 3,
    bathrooms: 2,
    image: [
      seroja1,
      seroja2
    ],
    slug:'taman-seroja-bbst'
  },
    {
    id:2,
    title:"Taman Dahlia",
    price:"RM300 ",
    location:"Taman Dahlia, Bandar Baru Salak Tinggi , 43900, Sepang,Selangor",
    bedrooms: 4,
    bathrooms: 2,
    image: [
      dahlia1,
      dahlia2
    ],
    slug:'taman-dahlia-bbst'
  },
   {
    id:3,
    title:"Standard Studio",
    price:"RM160 ",
    location:"Studio apartment, Bandar Baru Salak Tinggi , 43900, Sepang,Selangor",
    bedrooms: 1,
    bathrooms: 2,
    image: [
      studio1,
      studio2
    ],
    slug:'taman-dahlia-bbst'
  },
]


export default propertiesData;
// implementing dummy properties data only for developement progress