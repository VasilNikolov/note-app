import React, {PureComponent} from 'react'

export default class Users extends PureComponent {
	render() {

		let users = [];

		if (this.props.users) {

			let usersObj = this.props.users;

			Object.keys(usersObj).forEach((el) => {
				users.push(
					<li key={usersObj[el].id} className={'user'}>
						<div className={'user-elements'}>
							<span className={'user-element'}><span>Username: </span>{ usersObj[el].username }</span>
							<span className={'user-element'}><span>Role: </span>{ usersObj[el].admin ? 'Admin' : 'Normal User'}</span>
						</div>
						<div className={'user-control'}>
							<button onClick={() => this.props.editHandler(usersObj[el])}>Edit</button>
						</div>
						<div className={'user-control'}>
							<button onClick={() => this.props.deleteHandler(usersObj[el])}>Delete</button>
						</div>
					</li>
				)
			})
		}

		return (
			<div>
				<h3>Users</h3>
				<ul>
					{users}
				</ul>
			</div>
		)
	}
}