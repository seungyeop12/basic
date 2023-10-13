import { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';

export default function Community() {
	const refInput = useRef(null);
	const refTextarea = useRef(null);

	return (
		<Layout title={'Community'}>
			<div className='inputBox'>
				<input ref={refInput} type='type' placeholder='제목을 입력하세요' />
				<br />
				<textarea ref={refTextarea} cols='' rows='' placeholder='본문을 입력하세요'></textarea>

				<nav className='btnSet'>
					<button>cancle</button>
					<button>write</button>
				</nav>
			</div>
		</Layout>
	);
}
