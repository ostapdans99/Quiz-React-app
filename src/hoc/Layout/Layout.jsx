import React, { Component } from "react"
import classes from "./Layout.module.css"
import { MenuToggle } from "../../components/Navigation"
import { Drawer } from "../../components/Navigation"

export default class Layout extends Component {
	state = {
		menu: false,
	}

	toggleMenyHandler = () => {
		this.setState({
			menu: !this.state.menu,
		})
	}

	menuCloseHandler = () => {
		this.setState({
			menu: false,
		})
	}

	render() {
		return (
			<div>
				<Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />
				<MenuToggle
					onToggle={this.toggleMenyHandler}
					isOpen={this.state.menu}
				/>

				<main className={classes.Layout}>{this.props.children}</main>
			</div>
		)
	}
}
