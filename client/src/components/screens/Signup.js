import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
	const history = useHistory()
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [image, setImage] = useState('')
	const [url, setUrl] = useState(undefined)
	useEffect(() => {
		if (url) {
			uploadFields()
		}
	}, [url])
	const uploadPic = () => {
		const data = new FormData()
		data.append('file', image)
		data.append('upload_preset', 'insta_clone_images')
		data.append('cloud_name', 'instacloneimages')
		fetch('https://api.cloudinary.com/v1_1/instacloneimages/image/upload', {
			method: 'post',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				setUrl(data.url)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const uploadFields = () => {
		// if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
		//     M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
		//     return
		// }
		fetch('/signup', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				password,
				email,
				pic: url,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					M.toast({ html: data.error, classes: '#c62828 red darken-3' })
				} else {
					M.toast({ html: data.message, classes: '#43a047 green darken-1' })
					history.push('/signin')
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const PostData = () => {
		if (image) {
			uploadPic()
		} else {
			uploadFields()
		}
	}

	return (
		<div className='mycard'>
			<div className='card auth-card input-field'>
				<h2>InstaClone</h2>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}></input>
				<br></br>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}></input>
				<br></br>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}></input>
				<br></br>
				<div className='file-field input-field'>
					<div className='btn waves-effect waves-light #000000 black button-submit'>
						<span>UPLOAD PROFILE PICTURE</span>
						<input
							type='file'
							onChange={(e) => setImage(e.target.files[0])}></input>
					</div>
					<div className='file-path-wrapper'>
						<input className='file-path validate' type='text'></input>
					</div>
				</div>
				<br></br>
				<button
					className='btn waves-effect waves-light #000000 black button-submit'
					type='submit'
					onClick={PostData}>
					SIGNUP
				</button>
				<br></br>
				<h5>
					<Link to='/signin'>Already have an account?</Link>
				</h5>
			</div>
		</div>
	)
}

export default Signup
