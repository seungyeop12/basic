import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const my_id = '164021883@N04';

	const fetchData = async (opt) => {
		let url = '';
		const api_key = '9283e96df728a0ba4e1f9b9bdc9ae785';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';

		const num = 50;

		//fetching함수 호출시 타입값이 있는 객체를 인수로 전달하면 해당 타입에 따라 호출 URL이 변경되고
		//해당URL을 통해 받아지는 데이터로 달라짐
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}

		const data = await fetch(url);
		const json = await data.json();
		console.log(json.photos.photo);
		setPics(json.photos.photo);
	};

	useEffect(() => {
		//type: 'interest' 인터레스트 방식 갤러리 호출
		//type: 'user' 사용자 아이디 계정의 갤러리 호출
		//type: 'search' 검색키워드로 갤러리 호출
		//fetchData({ type: 'user', id: my_id });
		//fetchData({ type: 'interest' });
		fetchData({ type: 'search', tags: 'ocean' });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<button onClick={() => fetchData({ type: 'user', id: my_id })}>My Gallery</button>
			<button onClick={() => fetchData({ type: 'interest' })}>Interest Gallery</button>

			<div className='picFrame'>
				<Masonry
					elementType={'div'}
					options={{ transitionDuration: '0.5s' }}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img
										className='pic'
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>
									<h2>{data.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
											alt={data.owner}
										/>
										<span onClick={() => fetchData({ type: 'user', id: data.owner })}>
											{data.owner}
										</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
