import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Notes from '../Notes/Notes'
import Users from "../Users/Users";

export default class Admin extends Component {
	state = {
		noteData: [],
		currentNote: {
			name: '',
			description: '',
			estimate: '',
			done: false,
		},
		update: false,
		usersUpdate: false,
		users: {},
		selectedUser: {},
		usersForm: {
			first: '',
			second: '',
			third: false,
			fourth: '',
		}
	};

	componentWillMount() {

		if (!this.props.location.state) {
			this.props.history.push('/login')
		}

		// if (this.props.location.state.currentUser.admin === false) {
		// 	this.props.history.push('/logged-in')
		// }

		if (localStorage.getItem('notes') !== null) {
			this.setState({
				noteData: JSON.parse(localStorage.getItem('notes'))
			})
		}

		if (localStorage.getItem('users') !== null) {
			this.setState({
				users: JSON.parse(localStorage.getItem('users'))
			})
		}
	}

	handleInputChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			currentNote: {
				...this.state.currentNote,
				[name]: value
			}
		});
	};

	usersHandleInputChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			usersForm: {
				...this.state.usersForm,
				[name]: value
			}
		});
	};

	noteEditHandler = (el) => {
		console.log(el)

		this.setState({
			...this.state,
			currentNote: el,
			update: true
		})
	};

	noteDeleteHandler = (el) => {

		let notes = this.state.noteData;

		let newNotes = notes.filter((item) => {
			return item.id !== el.id
		});

		this.setState({
			...this.state,
			noteData: newNotes
		});

		localStorage.setItem('notes', JSON.stringify(newNotes));
	};

	formHandler = (e) => {
		e.preventDefault();

		if (this.state.update) {

			let currentNote = this.state.currentNote;

			let newTodoData = this.state.noteData.map((el) =>{
				return el.id === currentNote.id ? currentNote : el;
			});

			this.setState({
				noteData: newTodoData,
				currentNote: {
					name: '',
					description: '',
					estimate: '',
					done: false,
				},
				update: false,
			});

			localStorage.setItem('notes', JSON.stringify(newTodoData));

		} else {
			let newTodoData = [
				...this.state.noteData
			];

			let currentNote = this.state.currentNote;
			let user = this.props.location.state.currentUser;


			currentNote.id = new Date().getTime();
			currentNote.createdBy = user.id;

			newTodoData.push(currentNote);

			this.setState({
				noteData: newTodoData
			});

			localStorage.setItem('notes', JSON.stringify(newTodoData));
		}

	};

	usersFormHandler = (e) => {
		e.preventDefault();

		if (this.state.usersUpdate) {

			let selectedUser = { ...this.state.selectedUser };

			let users = JSON.parse(JSON.stringify(this.state.users));

			for (let key in users) {
				if (key === selectedUser.username && users[key].id === selectedUser.id) {


					users[this.state.usersForm.first] = {
						username: this.state.usersForm.first,
						password: this.state.usersForm.second,
						admin: this.state.usersForm.third,
						id: users[key].id
					};

					delete users[key];
				}
			}

			this.setState({
				users: users,
				usersForm: {
					first: '',
					second: '',
					third: false,
					fourth: '',
				},
				usersUpdate: false,
			});

			localStorage.setItem('users', JSON.stringify(users));

		} else {
			let newUsersData = JSON.parse(JSON.stringify(this.state.users));

			let newUser = {
				username: this.state.usersForm.first,
				password: this.state.usersForm.second,
				admin: this.state.usersForm.third,
			};

			newUser.id = new Date().getTime();

			newUsersData[newUser.username] = {...newUser};

			this.setState({
				users: newUsersData
			});

			localStorage.setItem('users', JSON.stringify(newUsersData));
		}

	};

	userEditHandler = (el) => {
		this.setState({
			...this.state,
			selectedUser: el,
			usersForm: {
				first: el.username,
				second: el.password,
				third: el.admin
			},
			usersUpdate: true
		})
	};

	userDeleteHandler = (el) => {

		let users = JSON.parse(JSON.stringify(this.state.users));

		let notes = JSON.parse(localStorage.getItem('notes'));

		let newNotes = notes.filter(item => {
			return item.createdBy !== el.id
		});

		localStorage.setItem('notes', JSON.stringify(newNotes));

		for (let key in users) {
			if (key === el.username && users[key].id === el.id) {
				delete users[key]
			}
		}

		this.setState({
			...this.state,
			users: users
		});

		localStorage.setItem('users', JSON.stringify(users));

		this.forceUpdate()
	};

	render() {

		let formTitle = 'Create a note';

		if (this.state.update) {
			formTitle = 'Update a note'
		}

		let usersFormTitle = 'Add user';

		if (this.state.usersUpdate) {
			usersFormTitle = 'Update user'
		}

		let form,
			user;

		if (!this.props.location.state) {
			form = '';
			this.props.history.push('/login')
		} else {
			user = this.props.location.state.currentUser;

			form = (
				<div>
					<h2>Hello, {user.username}</h2>

					<Link to={'/login'}>Logout</Link>

					<h3>{formTitle}</h3>
					<form onSubmit={this.formHandler}>
						<div>
							<input type="text" onChange={this.handleInputChange} value={this.state.currentNote.title} name={'title'} placeholder={'Title'}/>
						</div>
						<div style={{marginTop: '10px'}}>
							<textarea onChange={this.handleInputChange} name={'description'} value={this.state.currentNote.description} placeholder={'Description'}/>
						</div>
						<div style={{marginTop: '10px'}}>
							<input type="text" onChange={this.handleInputChange} name={'estimation'} value={this.state.currentNote.estimation} placeholder={'Estimate(h)'}/>
						</div>
						<div style={{marginTop: '10px'}}>
							<label htmlFor="done">Done: </label>
							<input type="checkbox" onChange={this.handleInputChange} id="done" name={'done'} value={this.state.currentNote.done} checked={this.state.currentNote.done}/>
						</div>
						<div style={{marginTop: '10px'}}>
							<input type="submit" value={'Save'}/>
						</div>
					</form>

					<Notes users={this.state.users} notes={this.state.noteData} deleteHandler={(el) => this.noteDeleteHandler(el)} editHandler={(el) => this.noteEditHandler(el)}/>

					<h3>{usersFormTitle}</h3>
					<form onSubmit={this.usersFormHandler}>
						<div>
							<input type="text" onChange={this.usersHandleInputChange} value={this.state.usersForm.first} name={'first'} placeholder={'Username'}/>
						</div>
						<div style={{marginTop: '10px'}}>
							<textarea onChange={this.usersHandleInputChange} name={'second'} value={this.state.usersForm.second} placeholder={'Password'}/>
						</div>
						<div style={{marginTop: '10px'}} hidden={false}>
							<label htmlFor="third">Admin:</label>
							<input type="checkbox" onChange={this.usersHandleInputChange} name={'third'} value={this.state.usersForm.third} checked={this.state.usersForm.third}/>
						</div>
						<div style={{marginTop: '10px'}} hidden={true}>
							<input type="text" onChange={this.usersHandleInputChange} name={'fourth'} value={this.state.usersForm.fourth} placeholder={'Estimate(h)'}/>
						</div>
						<div style={{marginTop: '10px'}}>
							<input type="submit" value={'Save'}/>
						</div>
					</form>

					<Users users={this.state.users} deleteHandler={(el) => this.userDeleteHandler(el)} editHandler={(el) => this.userEditHandler(el)} />

				</div>
			);
		}

		return (
			<div>
				{form}
			</div>
		)
	}
}