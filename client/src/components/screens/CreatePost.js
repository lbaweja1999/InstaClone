import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'
const CreatePost = () => {
	const history = useHistory()
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [image, setImage] = useState('')
	const [url, setUrl] = useState('')
	useEffect(() => {
		if (url) {
			fetch('/createpost', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
				body: JSON.stringify({
					title,
					body,
					pic: url,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						M.toast({ html: data.error, classes: '#c62828 red darken-3' })
					} else {
						M.toast({
							html: 'Post created successfully!!',
							classes: '#43a047 green darken-1',
						})
						history.push('/')
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}, [url])

	const postDetails = () => {
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

	return (
		<div className='mycard'>
			<div className='card auth-card input-field' style={{ maxWidth: '600px' }}>
				<h2>InstaClone</h2>

				<input
					type='text'
					placeholder='Title'
					onChange={(e) => setTitle(e.target.value)}
					value={title}></input>
				<br></br>
				<input
					type='text'
					placeholder='Body'
					onChange={(e) => setBody(e.target.value)}
					value={body}></input>
				<br></br>

				<div className='file-field input-field'>
					<div className='btn waves-effect waves-light #000000 black button-submit'>
						<span>UPLOAD IMAGE</span>
						<input
							type='file'
							onChange={(e) => setImage(e.target.files[0])}></input>
					</div>
					<div className='file-path-wrapper'>
						<input className='file-path validate' type='text'></input>
					</div>
				</div>
				<button
					className='btn waves-effect waves-light #000000 black button-submit'
					type='submit'
					onClick={() => postDetails()}>
					ADD POST
				</button>
			</div>
		</div>
	)
}

export default CreatePost
