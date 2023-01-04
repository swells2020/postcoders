import axios from 'axios';

export const getAreaData = async (submitOutcode) => {
    const { data } = await axios.get(`https://api.zippopotam.us/GB/${submitOutcode}`);

    return data.places;
};
