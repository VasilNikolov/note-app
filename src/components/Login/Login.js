import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
	state = {

	}

	onUsernameChange = (e) => {
		this.setState({ username: e.target.value });
	}

	onPasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	loginHandler = (e) => {
		e.preventDefault();

		if (this.state.username !== '') {
			if (this.state.password !== '') {

				let users = JSON.parse(localStorage.getItem('users'));

				let currentUser = users[this.state.username];

				if (currentUser.password === this.state.password) {
					this.props.history.push({
						pathname: '/logged-in',
						state: { currentUser: currentUser }
					});
				}
			} else {
				alert('Password not empty!')
			}
		} else {
			alert('Username must not be empty!')
		}

	};

	render() {
		return (
			<div>
				<h3>Login</h3>
				<form onSubmit={this.loginHandler}>
					<div>
						<input type="text" onChange={this.onUsernameChange} name={'username'} placeholder={'Username'}/>
					</div>
					<div style={{marginTop: '10px'}}>
						<input type="password" onChange={this.onPasswordChange} name={'password'} placeholder={'Password'}/>
					</div>
					<div style={{marginTop: '10px'}}>
						<input type="submit" value={'Submit'}/>
					</div>
				</form>

				<Link to={'/register'} style={{ display: 'block' ,marginTop: '20px'}} >Register</Link>

			</div>
		)
	}
}