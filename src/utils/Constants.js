import imagesFile from '../../assets/imagesFile';


//========= LOCAL URL =========
// export const BASE_URL = 'http://192.168.29.155/api/'

// export const BASE_URL = 'https://a78e-2405-201-300b-e18d-eb30-e1f8-f84f-1500.ngrok.io/api/'

//========= DEVELOPMENT URL =========
// export const BASE_URL = 'http://ec2-15-206-23-26.ap-south-1.compute.amazonaws.com:3000/api/'
// export const BASE_URL = 'https://dev.myfitmantra.com/api/'

// ========= STAGING URL =========
export const BASE_URL = 'https://stage.myfitmantra.com/api/'


// ========= PRODUCTION URL =========
// export const BASE_URL = 'https://api.myfitmantra.com/api/'
// export const BASE_URL = 'https://636d-2405-201-300b-e0d3-8b68-e1e8-9f7c-80ad.ngrok.io/api/'


// ========= NGROK LOCAL =========
// export const BASE_URL = 'https://8191-2405-201-300b-e072-1ab6-cccc-f4d2-b897.ngrok.io/'



export const Colors = {
    inputGrey: '#F0F0F0',
    white: '#FFFFFF',
    blue: '#3B22F8',
    black: '#000000',
    pink: "#EE1CFF",
    green: '#009B3C',
    light_red: "#FF8484",
    yellow: "#FFA700",
    off_white: '#F2F2F2',
    lightGrey: "#FAFAFA",
    lightGreen: "#00E28B",
    deepRed: '#A50000',
    newGrey: '#C3B9B9',
    redGrey: '#A5A5A5',
    tainerGrey: '#F2F2F2',
    peacockBlue: '#6200FF',
    lightBlue: '#312EF0',
    ProfileDetail_Grey: '#F5F5F5',
    lightGreenShade: '#DDFFE6',
    lightGreenShadeBorder: '#B5FFD5',
    Goal_BorderGrey: '#E3E3E3',
    palceHolder_grey: '#707070',
    commentGrey: '#F8F8F8',
    nutritionColor: 'rgb(199,144,143)',
    progressPhoto: "rgb(129,28,25)",
    appointment: 'rgb(87,0,241)',
    restBlue: 'rgb(61,180,243)',
    yell: "rgb(248,184,53)"

}

export const Fonts = {
    gilroy_Bold: 'Gilroy-Bold',
    gilroy_Regular: 'Gilroy-Regular',
    gilroy_SemiBold: 'Gilroy-SemiBold',
    gilroy_Medium: 'Gilroy-Medium'
}

export const CommonConstants = {
    PROTEIN: 'Protein',
    CARBS: 'Carbs',
    FATS: 'Fats',
    REMAINING: 'Remaining',

}

export const DATA = [
    {
        title: "Star Jumps",
        image: imagesFile.ic_demo1,
        data: [{ id: 1, weight: "5 kg", time: "00:30" }, { id: 2, weight: "6 kg", time: "00:30" }, { id: 3, weight: "7 kg", time: "00:30" }]
    },
    {
        title: "Bodyweight Walking Lunge",
        image: imagesFile.ic_demo1,
        data: [{ id: 1, weight: "5 kg", time: "00:30" }, { id: 2, weight: "6 kg", time: "00:30" }, { id: 3, weight: "7 kg", time: "00:30" }]
    },
    {
        title: "Press Ups",
        image: imagesFile.ic_demo1,
        data: [{ id: 1, weight: "5 kg", time: "00:30" }, { id: 2, weight: "6 kg", time: "00:30" }, { id: 3, weight: "7 kg", time: "00:30" }]
    },
    {
        title: "Mountain Climbers",
        image: imagesFile.ic_demo1,
        data: [{ id: 1, weight: "5 kg", time: "00:30" }, { id: 3, weight: "6 kg", time: "00:30" }, { id: 3, weight: "7 kg", time: "00:30" }]
    }
];

export const NtritionData = [
    {
        title: "Breakfast",
        subTitle: "Calories",
        value: "587 kcal",
        data: [{ id: 1, name: "Tesco Salmon Fillets", quantity: "1 Servings of fillet", amount: "270", isChecked: true }, { id: 2, name: "Egg", quantity: "2 Large", amount: "148", isChecked: false }, { id: 3, name: "Rye Bread", quantity: "50 g", amount: "130", isChecked: false }]
    },
    {
        title: "Lunch",
        subTitle: "Calories",
        value: "587 kcal",
        data: [{ id: 1, name: "Tesco Salmon Fillets", quantity: "1 Servings of fillet", amount: "270", isChecked: true }, { id: 2, name: "Egg", quantity: "2 Large", amount: "148", isChecked: false }, { id: 3, name: "Rye Bread", quantity: "50 g", amount: "130", isChecked: false }]
    },
    {
        title: "Dinner",
        subTitle: "Calories",
        value: "587 kcal",
        data: [{ id: 1, name: "Tesco Salmon Fillets", quantity: "1 Servings of fillet", amount: "270", isChecked: true }, { id: 2, name: "Egg", quantity: "2 Large", amount: "148", isChecked: false }, { id: 3, name: "Rye Bread", quantity: "50 g", amount: "130", isChecked: false }]
    },
    {
        title: "Snacks",
        subTitle: "Calories",
        value: "587 kcal",
        data: [{ id: 1, name: "Tesco Salmon Fillets", quantity: "1 Servings of fillet", amount: "270", isChecked: true }, { id: 2, name: "Egg", quantity: "2 Large", amount: "148", isChecked: false }, { id: 3, name: "Rye Bread", quantity: "50 g", amount: "130", isChecked: false }]
    },
    {
        title: "Liquid",
        subTitle: "Calories",
        value: "587 kcal",
        data: [{ id: 1, name: "Tesco Salmon Fillets", quantity: "1 Servings of fillet", amount: "270", isChecked: true }, { id: 2, name: "Egg", quantity: "2 Large", amount: "148", isChecked: false }, { id: 3, name: "Rye Bread", quantity: "50 g", amount: "130", isChecked: false }]
    },

];

export const data = [
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Ahmedabad' },
    { key: '3', value: 'hello' },
    { key: '4', value: 'gjgj' },
]



export const Capitalize = str => {
    // console.log('str: ', str);
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const HEX_LETTERS = "0123456789ABCDEF";

export const getRandomColor = () => {
    const colorArr = Array(6)
        .fill(0)
        .map(_ => HEX_LETTERS[Math.floor(Math.random() * 16)]);
    return ["#", ...colorArr].join("");
};