import { useSelector } from 'react-redux';

const path = process.env.PUBLIC_URL;

function Footer() {
	const members = useSelector((store) => store.memberReducer.members);

	return (
		<footer>
			<div className='inner'>
				<h1>LOGO</h1>
				<address>
					address : Lorem ipsum dolor sit.
					<br />
					e-mail : minhwaisgood@naver.com
					<br />
					Tel : +82 -123-1234-1234
				</address>
				<p>2022 DCODELAB &copy; ALL RIGHTS RESERVED.</p>

				{/* <div className='members'>
					{members.map((member, idx) => (
						<img key={idx} src={`${path}/img/${member.pic}`} />
					))}
				</div> */}
			</div>
		</footer>
	);
}

export default Footer;
