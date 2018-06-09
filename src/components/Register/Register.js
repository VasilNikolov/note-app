import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class Register extends Component {
	state = {
		username: '',
		password: '',
		repeatPassword: '',
	};

	onUsernameChange = (e) => {
		this.setState({ username: e.target.value });
	}

	onPasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	onRepeatPasswordChange = (e) => {
		this.setState({ repeatPassword: e.target.value });
	}

	registerHandler = (e) => {
		e.preventDefault();

		if (this.state.username !== '') {
			if (this.state.password === this.state.repeatPassword) {

				let users = JSON.parse(localStorage.getItem('users'));

				let id = new Date().getTime();

				let updatedUsers = {
					...users,
					[this.state.username]: {
						id: id,
						password: this.state.password,
						username: this.state.username,
						admin: false
					}
				};

				localStorage.setItem( 'users' , JSON.stringify(updatedUsers));

				this.props.history.push('/login')

			} else {
				alert('Passwords do not match!')
			}
		} else {
			alert('Username must not be empty!')
		}

	};

	render() {
		return (
			<div>
				<h2>Register</h2>

				<h4>Already registered? <Link to={'/login'}>Login</Link></h4>

				<form onSubmit={this.registerHandler}>
					<div>
						<input type="text" onChange={this.onUsernameChange} name={'username'} placeholder={'Username'}/>
					</div>
					<div style={{marginTop: '10px'}}>
						<input type="password" onChange={this.onPasswordChange} name={'password'} placeholder={'Password'}/>
					</div>
					<div style={{marginTop: '10px'}}>
						<input type="password" onChange={this.onRepeatPasswordChange} name={'password'} placeholder={'Repeat Password'}/>
					</div>
					<div style={{marginTop: '10px'}}>
						<input type="submit" value={'Submit'}/>
					</div>
				</form>
			</div>
		)
	}
}