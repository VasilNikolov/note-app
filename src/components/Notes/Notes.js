import React, {PureComponent} from 'react'

export default class Notes extends PureComponent {
		render() {

		let todoList;
		let users;


		if (this.props.notes) {
			todoList = this.props.notes.map((el) => {
				let owner;

				if (this.props.users) {
					users = JSON.parse(JSON.stringify(this.props.users));

					for (let key in users) {
						if (users[key].id === el.createdBy) {
							owner = key
						}
					}
				}

				return (
					<li key={el.id} className={'note'}>
						<div className={'note-elements'}>
							<span className={'note-element'}><span>Title: </span>{ el.title }</span>
							<span className={'note-element'}><span>Description: </span>{ el.description }</span>
							<span className={'note-element'}><span>Estimate: </span>{ el.estimation }</span>
							<span className={'note-element'}><span>Status: </span>{ el.done === true ? "Done" : "Pending"}</span>
							<span className={'note-element'} hidden={!this.props.users}><span>Owner: </span>{ owner }</span>
						</div>
						<div className={'note-control'}>
							<button onClick={() => this.props.editHandler(el)}>Edit</button>
						</div>
						<div className={'note-control'}>
							<button onClick={() => this.props.deleteHandler(el)}>Delete</button>
						</div>
					</li>
				)
			})
		}

		return (
			<div>
				<h3>Notes</h3>
				<ul>
					{todoList}
				</ul>
			</div>
		)
	}
}