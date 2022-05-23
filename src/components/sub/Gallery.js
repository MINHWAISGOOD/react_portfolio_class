import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';
import { useSelector } from 'react-redux';

function Gallery() {
	const [index, setIndex] = useState(0);
	const pics = useSelector((store) => store.galleryReducer.gallery);
	const pop = useRef(null);

	return (
		<>
			<Layout name={'Gallery'}>
				<ul>
					{pics.map((pic, idx) => {
						return (
							<li
								key={idx}
								onClick={() => {
									pop.current.open();
									setIndex(idx);
								}}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										/>
									</div>
									<p>{pic.title}</p>
									<div className='profile'>
										<img
											src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
										/>
										<span>{pic.owner}</span>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</Layout>

			{pics.length !== 0 && (
				<Popup ref={pop}>
					<img
						src={`https://live.staticflickr.com/${pics[index].server}/${pics[index].id}_${pics[index].secret}_b.jpg`}
					/>
					<span className='close' onClick={() => pop.current.close()}>
						close
					</span>
				</Popup>
			)}
		</>
	);
}

export default Gallery;
