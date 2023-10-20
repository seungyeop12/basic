import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const api_key = 'AIzaSyA4iVjYFWaYcsCq0z7a2Ey2FO9MTtXA6QI';
	const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const pid = 'PLMMMmfSQpakSd6WsuPqYUflXHqd1YJliN';
	const num = 6;
	const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	const { data } = await axios.get(resultURL);
	return data.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['youtubeData'], fetchYoutube);
};
