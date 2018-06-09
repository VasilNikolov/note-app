import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Notes from '../Notes/Notes'

export default class LoggedIn extends Component {
	state = {
		noteData: [],
		currentNote: {
			name: '',
			description: '',
			estimate: '',
		},
		update: false,
	};

	componentWillMount() {

		if (!this.props.location.state) {
			this.props.history.push('/login')
		}

		if (localStorage.getItem('notes') !== null) {
			this.setState({
				noteData: JSON.parse(localStorage.getItem('notes'))
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

	noteEditHandler = (el) => {
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

	render() {

		let formTitle = 'Create a note';

		if (this.state.update) {
			formTitle = 'Update a note'
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
							<input type="submit" value={'Save'}/>
						</div>
					</form>

					<Notes notes={this.state.noteData} deleteHandler={(el) => this.noteDeleteHandler(el)} editHandler={(el) => this.noteEditHandler(el)}/>

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