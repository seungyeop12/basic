import { useSelector } from 'react-redux';
import './Info.scss';
function Info() {
	const { data } = useSelector((store) => store.flickr);
	return (
		<section className='Info'>
			<div className='wrap'>
				{data.map((pic, idx) => {
					if (idx >= 6) return null;
					return (
						<article key={idx}>
							<div className='inner'>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
									alt={pic.title}
								/>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
export default Info;
